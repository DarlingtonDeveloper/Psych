import { ethers } from "ethers"
import { getAllUsersWalletAddress, User } from "../../netlify/utils/get-user"
import * as fs from "fs"
import path from "path"
import pLimit from "p-limit"

import dotenv from "dotenv"
dotenv.config()

interface GetOwnedTokensAtDateRes {
  [ownerAddress: string]: {
    tokens: number[]
    count: number
  }
}
interface TallyByType {
  [type: string]: GetOwnedTokensAtDateRes
}
type TARGET_NFT_TYPES = "genesis" | "psilocybin" | "c1"
const GenesisAddress = process.env.NEXT_PUBLIC_GENESIS_ADDRESS as string
const PsilocybinAddress = process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
const C1Address = process.env.NEXT_PUBLIC_C1_ADDRESS as string
const CONTRACT_ADDRESS_MAPPING = {
  genesis: GenesisAddress,
  psilocybin: PsilocybinAddress,
  c1: C1Address,
}
const P_LIMIT = 20

function getContractByType(
  type: TARGET_NFT_TYPES,
  provider: ethers.providers.Provider
): ethers.Contract {
  const contractAddress = CONTRACT_ADDRESS_MAPPING[type]
  const contract = new ethers.Contract(
    contractAddress,
    [
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    ],
    provider
  )
  return contract
}

async function getBlockNumberByTimestamp(
  timestamp: number,
  provider: ethers.providers.Provider
): Promise<number> {
  const upperBlock = await provider.getBlock("latest")
  let lowerBlockNumber = 0
  let upperBlockNumber = upperBlock.number

  while (lowerBlockNumber <= upperBlockNumber) {
    const middleBlockNumber = Math.floor(
      (lowerBlockNumber + upperBlockNumber) / 2
    )
    const middleBlock = await provider.getBlock(middleBlockNumber)

    if (middleBlock.timestamp < timestamp) {
      lowerBlockNumber = middleBlockNumber + 1
    } else if (middleBlock.timestamp > timestamp) {
      upperBlockNumber = middleBlockNumber - 1
    } else {
      // Found the block with exact timestamp
      return middleBlockNumber
    }
  }

  // When the loop finishes, upperBlockNumber is the block just before the timestamp
  return upperBlockNumber
}

async function fetchFromAlchemyWithRetry(
  retries: number = 10,
  backoff: number = 5000, // 5 seconds
  filter: ethers.EventFilter,
  targetBlockNumber: number,
  contract: ethers.Contract
): Promise<ethers.Event[]> {
  try {
    const events = await contract.queryFilter(filter, 0, targetBlockNumber)
    return events
  } catch (error) {
    if (retries === 0) throw error
    await new Promise((resolve) => setTimeout(resolve, backoff))
    return await fetchFromAlchemyWithRetry(
      retries - 1,
      backoff * 2,
      filter,
      targetBlockNumber,
      contract
    )
  }
}

async function getOwnedTokensByTransfersAtDate(
  walletAddress: string,
  contract: ethers.Contract,
  targetBlockNumber: number
): Promise<GetOwnedTokensAtDateRes> {
  // Fetch all Transfer events from the contract
  const filterFrom = contract.filters.Transfer(walletAddress, null)
  const filterTo = contract.filters.Transfer(null, walletAddress)
  const transferEventsFrom = await fetchFromAlchemyWithRetry(
    10,
    3000,
    filterFrom,
    targetBlockNumber,
    contract
  )
  const transferEventsTo = await fetchFromAlchemyWithRetry(
    10,
    3000,
    filterTo,
    targetBlockNumber,
    contract
  )

  const allTransferEvents = [...transferEventsFrom, ...transferEventsTo].sort(
    (a, b) => {
      // First, sort by block number
      if (a.blockNumber !== b.blockNumber) {
        return a.blockNumber - b.blockNumber
      }

      // If the block number is the same, sort by transaction index
      return a.transactionIndex - b.transactionIndex
    }
  )

  // Process the events to determine the current balance
  const ownedTokens = new Set<number>()
  for (const event of allTransferEvents) {
    const tokenId = event.args?.tokenId.toString()

    if (event.args?.to.toLowerCase() === walletAddress) {
      ownedTokens.add(tokenId)
    } else if (event.args?.from.toLowerCase() === walletAddress) {
      ownedTokens.delete(tokenId)
    }
  }

  const res: GetOwnedTokensAtDateRes = {}
  res[walletAddress] = {
    tokens: Array.from(ownedTokens),
    count: ownedTokens.size,
  }
  return res
}

async function getOwnedTokensByBatch(
  batchOfWalletAddresses: User["walletAddress"][][],
  contract: ethers.Contract,
  targetBlockNumber: number
): Promise<GetOwnedTokensAtDateRes> {
  let holders: GetOwnedTokensAtDateRes = {}
  const limit = pLimit(P_LIMIT)

  for (let i = 0; i < batchOfWalletAddresses.length; i++) {
    console.log("batchOfWalletAddresses[%d]", i)
    const walletAddresses = batchOfWalletAddresses[i]

    const holdersSubBatchArr = await Promise.all(
      walletAddresses.map((address) =>
        limit(() =>
          getOwnedTokensByTransfersAtDate(address, contract, targetBlockNumber)
        )
      )
    )

    const holdersSubBatch = holdersSubBatchArr.reduce(
      (accumulator, current) => {
        return { ...accumulator, ...current }
      },
      {}
    )
    holders = { ...holders, ...holdersSubBatch }
  }
  return holders
}

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ENDPOINT
  )

  const paUsers = await getAllUsersWalletAddress()
  console.log("paUsers.length: ", paUsers.length)

  const burntTokenAddressPatterns = [/^0x0+000$/, /^0x00+dead$/]

  const walletAddresses = paUsers.filter(
    (string) =>
      !burntTokenAddressPatterns.some((pattern) => pattern.test(string))
  )
  console.log("walletAddresses.length: ", walletAddresses.length)

  const batchSize = P_LIMIT
  const batchOfWalletAddresses = []
  for (let i = 0; i < walletAddresses.length; i += batchSize) {
    batchOfWalletAddresses.push(walletAddresses.slice(i, i + batchSize))
  }
  console.log("batchOfWalletAddresses.length: ", batchOfWalletAddresses.length)
  // EDIT THIS: targetDate from Nov1 to Nov 4
  const targetDate = new Date("2023-11-04T13:59:39Z")
  console.log("targetDate: ", targetDate)
  const formattedDate = `${(targetDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}${targetDate
    .getUTCDate()
    .toString()
    .padStart(2, "0")}${targetDate.getUTCFullYear()}`
  console.log("formattedDate: ", formattedDate)

  const targetBlockNumber = await getBlockNumberByTimestamp(
    Math.floor(targetDate.getTime() / 1000),
    provider
  )
  console.log("targetBlockNumber: ", targetBlockNumber)

  // EDIT THIS:
  const types: TARGET_NFT_TYPES[] = ["c1"]

  const tallyByType: TallyByType = {}
  for (let i = 0; i < types.length; i++) {
    const contract = getContractByType(types[i], provider)
    console.log("types[i]: ", types[i])

    const res = await getOwnedTokensByBatch(
      batchOfWalletAddresses,
      contract,
      targetBlockNumber
    )
    tallyByType[types[i]] = res
    const tallyByTypeStringify = JSON.stringify(tallyByType, null, 2)

    await fs.writeFile(
      path.join(
        __dirname,
        `./historical_token_ownership/${formattedDate}/${types[i]}.json`
      ),
      tallyByTypeStringify,
      "utf8",
      (err) => {
        if (err) {
          console.log("An error occurred while writing JSON Object to File.")
          return console.log(err)
        }
      }
    )
    console.log("JSON file has been saved.")
  }
}

main()
