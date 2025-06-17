import { ethers } from "ethers"
import pLimit from "p-limit"
import { writeJSON } from "fs-extra"
import { exit } from "process"

const limit = pLimit(50)

const provider = new ethers.providers.WebSocketProvider(
  "https://eth-mainnet.alchemyapi.io/v2/s1n8aACXsJo4TQ1Qb8HLi6fh3wqbzhiM"
)

const FILE_NAME = "newdawn-holders"
const HOLDING_CONTRACT_ADDRESS = "0x3FeD135c3d8fFe36ce0CB835cef57C4566F25852"

const NEWDAWN_WALLET_ADDRESSES: string[] = []

const holdingContract = new ethers.Contract(
  HOLDING_CONTRACT_ADDRESS,
  [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "getHeldTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  provider
)

async function getNoOfHeldTokens() {
  return await Promise.all(
    NEWDAWN_WALLET_ADDRESSES.map((walletAddress) =>
      limit(async () => {
        let retries = 0
        while (retries <= 3) {
          try {
            const heldTokens = await holdingContract.getHeldTokens(
              walletAddress
            )
            console.log({ walletAddress, heldTokens: heldTokens.length })
            return { walletAddress, heldTokens: heldTokens.length }
          } catch (e) {
            retries += 1
          }
        }

        console.log({ walletAddress, heldTokens: 0 })
        return { walletAddress, heldTokens: 0 }
      })
    )
  )
}

async function run() {
  const result = await getNoOfHeldTokens()

  await writeJSON(
    `${FILE_NAME}.json`,
    result.filter((res) => res.heldTokens > 0)
  )
  exit()
}

run()
