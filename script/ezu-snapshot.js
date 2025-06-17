const { ethers } = require("ethers")
const Staking = require("../src/lib/contracts/Staking.json")
const PsilocybinNFT = require("../src/lib/contracts/Psilocybin.json")
const PappNFT = require("../src/lib/contracts/PAPP.json")
const { writeJson } = require("fs-extra")
const path = require("path")

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/s1n8aACXsJo4TQ1Qb8HLi6fh3wqbzhiM"
)

const pLimit = require("p-limit")
const limit = pLimit(50)

const psiloContract = new ethers.Contract(
  "0x11ca9693156929EE2e7E1470C5E1A55b413e9007",
  PsilocybinNFT.abi,
  provider
)
const stakingContract = new ethers.Contract(
  "0x73555A153d301d95A3f90919e645D301F1f9E219",
  Staking.abi,
  provider
)
const pappContract = new ethers.Contract(
  "0xc8e1de8dc39a758c7a50f659b53f787e0f1398bd",
  PappNFT.abi,
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
  let retries = 0
  while (retries < 3) {
    try {
      const tokenInfo = await stakingContract.tokenInfo(2, tokenId)
      return tokenInfo[0]
    } catch {
      retries += 1
    }
  }
  return "0x0"
}

function countSetOwners(ownerMap) {
  return Object.keys(ownerMap).reduce((acc, cur) => {
    if (cur === "0x0") {
      return acc
    }
    return acc + Math.min(ownerMap[cur].psilocybin, ownerMap[cur].papp)
  }, 0)
}

async function run() {
  const ownerMap = {}

  const psilocybinMaxSupply = parseInt(await psiloContract.totalSupply())
  console.log("STARTING PSILO")
  const psiloRange = [...Array(psilocybinMaxSupply).keys()]
  await Promise.all(
    psiloRange.map((i) =>
      limit(async () => {
        const owner = await getOwner(psiloContract, i + 1)
        if (ownerMap[owner]) {
          ownerMap[owner].psilocybin += 1
        } else if (owner === "0x73555A153d301d95A3f90919e645D301F1f9E219") {
          const stakedOwner = await getStakedOwner(i + 1)
          if (ownerMap[stakedOwner]) {
            ownerMap[stakedOwner].psilocybin += 1
          } else {
            ownerMap[stakedOwner] = {
              psilocybin: 1,
              papp: 0,
            }
          }
        } else {
          ownerMap[owner] = {
            psilocybin: 1,
            papp: 0,
          }
        }
      })
    )
  )

  const pappTotalSupply = parseInt(await pappContract.tokenCount())
  console.log("STARTING PAPP")
  const pappRange = [...Array(pappTotalSupply).keys()]
  await Promise.all(
    pappRange.map((i) =>
      limit(async () => {
        const owner = await getOwner(pappContract, i + 1)
        if (ownerMap[owner]) {
          ownerMap[owner].papp += 1
        } else {
          ownerMap[owner] = {
            psilocybin: 0,
            papp: 1,
          }
        }
      })
    )
  )

  await writeJson(
    path.join(process.cwd(), "script_out/ezu-snapshot.json"),
    ownerMap
  )

  console.log("PAIR OWNERS")
  console.log(countSetOwners(ownerMap))
}

run()
