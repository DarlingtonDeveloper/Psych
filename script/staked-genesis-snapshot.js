const { ethers } = require("ethers")
const Staking = require("../src/lib/contracts/Staking.json")
const GenesisNFT = require("../src/lib/contracts/GenesisNFT.json")
const { writeJson } = require("fs-extra")
const path = require("path")

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/s1n8aACXsJo4TQ1Qb8HLi6fh3wqbzhiM"
)

const pLimit = require("p-limit")
const limit = pLimit(50)

const genesisContract = new ethers.Contract(
  "0x75e95ba5997eb235f40ecf8347cdb11f18ff640b",
  GenesisNFT.abi,
  provider
)
const stakingContract = new ethers.Contract(
  "0x73555A153d301d95A3f90919e645D301F1f9E219",
  Staking.abi,
  provider
)

async function getOwner(contract, tokenId) {
  let retries = 0
  while (retries < 3) {
    try {
      return await contract.ownerOf(tokenId)
    } catch {
      retries += 1
    }
  }

  return "0x0"
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

  const genesisMaxSupply = parseInt(await genesisContract.tokenCount())
  const genesisRange = [...Array(genesisMaxSupply).keys()]
  await Promise.all(
    genesisRange.map((i) =>
      limit(async () => {
        const owner = await getOwner(genesisContract, i + 1)
        if (owner === "0x73555A153d301d95A3f90919e645D301F1f9E219") {
          const stakedOwner = await getStakedOwner(i + 1)
          const daysStaked = await getStakedDays(i + 1)

          result = [
            ...result,
            {
              genesisId: i + 1,
              owner: stakedOwner,
              daysStaked,
            },
          ]
        }
      })
    )
  )

  await writeJson(
    path.join(process.cwd(), "script_out/staking-genesis-snapshot.json"),
    result
  )
}

run()
