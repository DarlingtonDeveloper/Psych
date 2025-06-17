const { ethers } = require("ethers")
const Staking = require("../src/lib/contracts/Staking.json")
const UtilityPassNFT = require("../src/lib/contracts/UtilityPassNFT.json")
const { writeJson } = require("fs-extra")
const path = require("path")

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/s1n8aACXsJo4TQ1Qb8HLi6fh3wqbzhiM"
)

const pLimit = require("p-limit")
const limit = pLimit(50)

const componentOneContract = new ethers.Contract(
  "0x5501024ddb740266fa0d69d19809ec86db5e3f8b",
  UtilityPassNFT.abi,
  provider
)
const stakingContract = new ethers.Contract(
  "0x73555A153d301d95A3f90919e645D301F1f9E219",
  Staking.abi,
  provider
)

async function getOwner(contract, tokenId) {
  try {
    return await contract.ownerOf(tokenId)
  } catch {
    return "0x0"
  }
}

async function getStakedOwner(tokenId) {
  const tokenInfo = await stakingContract.tokenInfo(0, tokenId)
  return tokenInfo[0]
}

async function getStakedDays(tokenId) {
  const timeSinceInSeconds = await stakingContract.batchTimeSinceStaked(0, [
    tokenId,
  ])
  return Math.floor(timeSinceInSeconds[0] / 86400)
}

async function run() {
  let result = []

  const c1MaxSupply = parseInt(await componentOneContract.tokenCount())
  const c1Range = [...Array(c1MaxSupply).keys()]
  try {
    await Promise.all(
      c1Range.map((i) =>
        limit(async () => {
          const owner = await getOwner(componentOneContract, i + 1)
          if (owner === "0x73555A153d301d95A3f90919e645D301F1f9E219") {
            const stakedOwner = await getStakedOwner(i + 1)
            const daysStaked = await getStakedDays(i + 1)

            result = [
              ...result,
              {
                c1Id: i + 1,
                owner: stakedOwner,
                daysStaked,
              },
            ]
          }
        })
      )
    )
  } catch (error) {
    console.table(error)
  }

  await writeJson(
    path.join(process.cwd(), "script_out/staking-c1-snapshot.json"),
    result
  )
}

run()
