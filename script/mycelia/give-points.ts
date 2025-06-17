import axios from "axios"
import {
  getAllUsersWalletAddress,
  getAllUserUnclaimedPoints,
  bulkGivePoints,
  UserPointsSource,
  getPsyPointsDailyProgress,
  updatePsyPointsDailyProgress,
  User,
  PointsDistribution,
  UpdatedUnclaimedPoints,
  AuditLog,
  PsyPointsDailyProgress,
} from "../../netlify/utils/get-user"
import { UserPsypointsBulkUpdateFailed } from "../../netlify/utils/users-error"

import { POINTS } from "./points-allocation"
import psilocybinTraits from "../../netlify/lib/psilocybinfinaltraits.json"
import dotenv from "dotenv"
dotenv.config()

const DEBUG_MODE = false
const PsilocybinTraits: any[] = psilocybinTraits as any[]

type TARGET_NFT_TYPES = "genesis" | "psilocybin" | "c1"

interface OwnersForCollection {
  ownerAddresses: [
    {
      ownerAddress: string
      tokenBalances: [{ tokenId: string; balance: number }]
    }
  ]
}
interface Tally {
  [type: string]: {
    [ownerAddress: string]: {
      tokens: number[]
      count: number
    }
  }
}

const API_RETRIES = 10
const MAIN_RETRIES = 3

const burntTokenAddressPatterns = [/^0x0+000$/, /^0x00+dead$/]

const GenesisAddress = process.env.NEXT_PUBLIC_GENESIS_ADDRESS as string
const PsilocybinAddress = process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
const C1Address = process.env.NEXT_PUBLIC_C1_ADDRESS as string

const ADDRESS_MAPPING = {
  genesis: GenesisAddress,
  psilocybin: PsilocybinAddress,
  c1: C1Address,
}

let allPAUsers: string[] = []

function getPsilocybinType(tid: number): string {
  return `${PsilocybinTraits[tid - 1].attributes[1].value.toLowerCase()}`
}

function tallyPsilocybin(originalObject: OwnersForCollection) {
  const tally: Tally = {}

  for (const item of originalObject.ownerAddresses) {
    const { ownerAddress, tokenBalances } = item
    if (
      burntTokenAddressPatterns.some((pattern) => pattern.test(ownerAddress))
    ) {
      DEBUG_MODE &&
        console.log(
          `Excluding ownerAddress: ${ownerAddress} burnt token wallet`
        )
      continue
    }
    if (!allPAUsers.includes(ownerAddress)) {
      DEBUG_MODE &&
        console.log(
          `Excluding ownerAddress: ${ownerAddress} does not exist in PA system yet`
        )
      continue
    }

    tokenBalances.forEach((balance) => {
      const tokenId = +balance.tokenId
      const tokens = [tokenId]
      const psiType = `psilocybin_${getPsilocybinType(tokenId)}`

      if (!tally[psiType]) {
        tally[psiType] = {}
      }

      if (!tally[psiType][ownerAddress]) {
        tally[psiType][ownerAddress] = {
          tokens: [],
          count: 0,
        }
      }

      tally[psiType][ownerAddress].tokens.push(...tokens)
      tally[psiType][ownerAddress].count += 1
    })
  }

  return tally
}

function tally(originalObject: OwnersForCollection, type: "genesis" | "c1") {
  const tally: Tally = {}

  originalObject.ownerAddresses.forEach((item) => {
    const { ownerAddress, tokenBalances } = item
    if (
      burntTokenAddressPatterns.some((pattern) => pattern.test(ownerAddress))
    ) {
      DEBUG_MODE &&
        console.log(
          "Excluding ownerAddress: ",
          ownerAddress,
          ` burnt token wallet`
        )
      return
    }

    if (!allPAUsers.includes(ownerAddress)) {
      DEBUG_MODE &&
        console.log(
          `Excluding ownerAddress: ${ownerAddress} does not exist in PA system yet`
        )
      return
    }

    const tokens = tokenBalances.map((balance) => +balance.tokenId)
    const count = tokens.length

    if (!tally[type]) {
      tally[type] = {}
    }
    if (!tally[type][ownerAddress]) {
      tally[type][ownerAddress] = { tokens, count }
    }
  })

  return tally
}

async function getOwnersForCollection(type: TARGET_NFT_TYPES) {
  const reqStr = `${process.env.NEXT_PUBLIC_ENDPOINT}/getOwnersForCollection/?contractAddress=${ADDRESS_MAPPING[type]}&withTokenBalances=true`
  let retries = 0
  while (retries < API_RETRIES) {
    if (retries > 0) {
      console.log(
        `\nRetrying getOwnersForCollection type:${type} ${
          retries + 1
        }/${API_RETRIES}`
      )
    }
    try {
      const res = await axios.get(reqStr)
      let resTally: Tally | undefined = {}
      if (type === "genesis" || type === "c1") {
        resTally = tally(res.data, type)
      } else {
        resTally = tallyPsilocybin(res.data)
      }
      return resTally
    } catch (error) {
      console.log(error)
      retries += 1
    }
  }
}

async function getTallyByType(): Promise<Tally> {
  const tallyByType: Tally = {}
  const targetNFTs = ["genesis", "psilocybin", "c1"]
  for (const type of targetNFTs) {
    console.log(`\nStart time: ${new Date()} getOwnersForCollection ${type}`)

    const tally = await getOwnersForCollection(type as TARGET_NFT_TYPES)
    if (!tally) {
      console.log(`${type} tally is empty.`)
    } else {
      for (const subTally in tally) {
        tallyByType[subTally] = tally[subTally]
      }
    }
    console.log(`End time: ${new Date()} getOwnersForCollection ${type}`)
  }
  return tallyByType
}

function createPointsDistribution(tallyByType: Tally): PointsDistribution {
  const pointsDistribution: PointsDistribution = {}

  for (const type in tallyByType) {
    for (const walletAddress in tallyByType[type]) {
      const tokens = tallyByType[type][walletAddress].tokens
      const count = tallyByType[type][walletAddress].count
      const points = count * POINTS[type as keyof typeof POINTS]

      if (!pointsDistribution[walletAddress]) {
        pointsDistribution[walletAddress] = {
          TOTAL_POINTS: 0,
        } as {
          [type: string]: UserPointsSource
        } & {
          TOTAL_POINTS: number
        }
      }

      pointsDistribution[walletAddress][type] = {
        tokens,
        count,
        points,
      }

      pointsDistribution[walletAddress].TOTAL_POINTS += points
    }
  }
  return pointsDistribution
}

function calculateUpdatedPoints(
  records: User[],
  pointsDistribution: PointsDistribution
): UpdatedUnclaimedPoints {
  const updatedRecords: UpdatedUnclaimedPoints = []

  for (const record of records) {
    const walletAddress = record.walletAddress
    if (walletAddress in pointsDistribution) {
      const pointsToGive = pointsDistribution[walletAddress]?.TOTAL_POINTS
      const currUnclaimedPoints = record.unclaimedPoints!
      const updatedPoints = currUnclaimedPoints + pointsToGive

      updatedRecords.push({
        walletAddress: walletAddress,
        unclaimedPoints: updatedPoints,
        ref: record.ref,
      })
    } else {
      DEBUG_MODE &&
        console.log(
          `Found ${walletAddress} in records but not in pointsDistribution`
        )
    }
  }

  return updatedRecords
}

function prepAuditLogsPerWalletAddress(
  records: User[],
  pointsDistribution: PointsDistribution
): AuditLog[] {
  const auditLogs = []

  for (const record of records) {
    const walletAddress = record.walletAddress
    if (walletAddress in pointsDistribution) {
      const pointsToGive = pointsDistribution[walletAddress]?.TOTAL_POINTS
      const currUnclaimedPoints = record.unclaimedPoints!
      const updatedPoints = currUnclaimedPoints + pointsToGive

      auditLogs.push({
        walletAddress: walletAddress,
        prevClaimedPoints: record.claimedPoints!,
        prevUnclaimedPoints: currUnclaimedPoints,
        claimedPoints: record.claimedPoints!,
        unclaimedPoints: updatedPoints,
        source: pointsDistribution[walletAddress],
      })
    } else {
      DEBUG_MODE &&
        console.log(
          `Found ${walletAddress} in records but not in pointsDistribution`
        )
    }
  }

  return auditLogs
}

async function run() {
  let progressDate = ""
  const currentDate = new Date()

  const lastProgress: PsyPointsDailyProgress = await getPsyPointsDailyProgress()
  if (lastProgress.success === false) {
    progressDate = lastProgress.date
  } else {
    progressDate = currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  // Reinit or initialize
  await updatePsyPointsDailyProgress(
    progressDate,
    currentDate.getTime(),
    false,
    0
  )

  let retries = 0
  while (retries < MAIN_RETRIES) {
    if (retries > 0) {
      console.log(`\nRetrying ${retries + 1}/${MAIN_RETRIES}`)
    }
    try {
      console.log(`STEP#1: Start time: ${new Date()} getAllUsersWalletAddress`)
      allPAUsers = await getAllUsersWalletAddress()

      console.log(`\nSTEP#2: Start time: ${new Date()} getTallyByType`)
      const tallyByType: Tally = await getTallyByType()

      console.log(
        `\nSTEP#3: Start time: ${new Date()} createPointsDistribution`
      )
      const pointsDistribution: PointsDistribution =
        createPointsDistribution(tallyByType)

      console.log(
        `\nSTEP#4: Start time: ${new Date()} getAllUserUnclaimedPoints`
      )
      const allUnclaimedPoints = await getAllUserUnclaimedPoints()

      console.log(`\nSTEP#5: Start time: ${new Date()} calculateUpdatedPoints`)
      const updatedRecords: UpdatedUnclaimedPoints =
        await calculateUpdatedPoints(allUnclaimedPoints, pointsDistribution)

      console.log(
        `\nSTEP#6: Start time: ${new Date()} prepAuditLogsPerWalletAddress`
      )
      const auditLogs: AuditLog[] = prepAuditLogsPerWalletAddress(
        allUnclaimedPoints,
        pointsDistribution
      )

      console.log(`\nSTEP#7: Start time: ${new Date()} bulkGivePoints`)
      const res = await bulkGivePoints(updatedRecords, auditLogs)
      if (!res) {
        throw new UserPsypointsBulkUpdateFailed()
      }

      console.log(`Done.`)
      break
    } catch (error) {
      console.log(error)
      retries += 1
    }
  }

  if (retries < MAIN_RETRIES) {
    await updatePsyPointsDailyProgress(
      progressDate,
      currentDate.getTime(),
      true,
      Date.now()
    )
  } else {
    await updatePsyPointsDailyProgress(
      progressDate,
      currentDate.getTime(),
      false,
      Date.now()
    )
  }
}

run()
