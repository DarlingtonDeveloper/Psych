const { ethers } = require("ethers")

const pLimit = require("p-limit")
const { writeJSON } = require("fs-extra")
const { exit } = require("process")

const limit = pLimit(50)

const provider = new ethers.providers.WebSocketProvider(
  "https://eth-mainnet.alchemyapi.io/v2/s1n8aACXsJo4TQ1Qb8HLi6fh3wqbzhiM"
)

const FILE_NAME = "metapass-holders"
const CONTRACT_ADDRESS = "0x22674fd4ce74765c211eec01698fda36f57a650a"
const TOTAL_SUPPLY = 9595

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  provider
)

async function getTokenOwners() {
  const range = [...Array(TOTAL_SUPPLY).keys()]

  return await Promise.all(
    range.map((i) =>
      limit(async () => {
        let retries = 0
        while (retries <= 3) {
          try {
            const walletAddress = await contract.ownerOf(i + 1)
            console.log(`${i + 1} - ${walletAddress}`)
            return { tokenId: i + 1, walletAddress }
          } catch (e) {
            retries += 1
          }
        }
        console.log(`${i + 1} - 0x0`)
        return {
          tokenId: i + 1,
          walletAddress: "0x000000000000000000000000000000000000000",
        }
      })
    )
  )
}

async function run() {
  await writeJSON(`${FILE_NAME}.json`, await getTokenOwners())
  exit()
}

run()
