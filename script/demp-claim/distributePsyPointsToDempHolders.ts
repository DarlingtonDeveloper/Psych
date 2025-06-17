import dotenv from "dotenv"
import {
  AuditLog,
  AuditLogPsypointsSource,
  bulkGivePoints,
  getDEMPHoldersPsyPoints,
  PointsDistribution,
  User,
  UpdatedUnclaimedPoints,
} from "../../netlify/utils/get-user"
import { UserPsypointsBulkUpdateFailed } from "../../netlify/utils/users-error"

dotenv.config()
const csvtojson = require("csvtojson")
const path = require("path")

const HOLDERS_FILES = "./dempHoldersStaging.json"
const SCORES_FILES = "./script/demp-claim/dempScoresStaging.csv"
// CHANGE ME:
// const HOLDERS_FILES =   "./dempHoldersProduction.json"
// const SCORES_FILES = "./script/demp-claim/dempScoresProduction.csv"

type DempHoldersFile = { tokenId: number; walletAddress: string }[]
type TokenIdsArr = number[]
type DempHolders = {
  [walletAddress: string]: TokenIdsArr
}

type Scores = number[]
type DempScores = {
  [walletAddress: string]: Scores
}

type Reward = {
  points: number
  totalPoints: number
}
function reward(score: number, numOfTokens: number): Reward {
  if (score >= 101) {
    // 101 to infinity
    return {
      points: 2500,
      totalPoints: 2500 * numOfTokens,
    }
  } else if (score >= 81) {
    // 80 to 100
    return {
      points: 1500,
      totalPoints: 1500 * numOfTokens,
    }
  } else if (score >= 41) {
    // 41 to 80
    return {
      points: 1250,
      totalPoints: 1250 * numOfTokens,
    }
  } else {
    // 0 to 40
    return {
      points: 1000,
      totalPoints: 1000 * numOfTokens,
    }
  }
}

function tallyHoldings(dempHoldersFile: DempHoldersFile): DempHolders {
  const walletAddressToTokenIds: { [type: string]: number[] } = {}
  for (const holder of dempHoldersFile) {
    if (walletAddressToTokenIds[holder.walletAddress]) {
      walletAddressToTokenIds[holder.walletAddress].push(holder.tokenId)
    } else {
      walletAddressToTokenIds[holder.walletAddress] = [holder.tokenId]
    }
  }
  return walletAddressToTokenIds
}

function createPointsDistribution(
  dempHolders: DempHolders,
  dempScores: DempScores
): PointsDistribution {
  const pointsDistribution: PointsDistribution = {}

  for (const walletAddress in dempHolders) {
    if (dempScores[walletAddress]) {
      const highScore = Math.max(...dempScores[walletAddress])
      const rewardReceived = reward(
        highScore,
        dempHolders[walletAddress].length
      )
      const audit = {
        TOTAL_POINTS: rewardReceived.totalPoints,
      } as AuditLogPsypointsSource
      pointsDistribution[walletAddress] = audit
      pointsDistribution[walletAddress].demp = {
        tokens: dempHolders[walletAddress],
        count: dempHolders[walletAddress].length,
        points: rewardReceived.points,
      }
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
    }
  }

  return auditLogs
}

async function run() {
  const dempHoldersFile: DempHoldersFile = require(HOLDERS_FILES)
  const dempHolders: DempHolders = tallyHoldings(dempHoldersFile)

  const dempScoresFile = await csvtojson().fromFile(
    path.join(process.cwd(), SCORES_FILES)
  )
  const dempScores: DempScores = {}
  for (const player of dempScoresFile) {
    dempScores[player.walletAddress] = JSON.parse(player.scores)
  }

  const pointsDistribution = await createPointsDistribution(
    dempHolders,
    dempScores
  )
  console.log("pointsDistribution: ", pointsDistribution)
  const walletAddresses = Object.keys(pointsDistribution)
  const dempHoldersPsyPoints = await getDEMPHoldersPsyPoints(walletAddresses)
  console.log("dempHoldersPsyPoints: ", dempHoldersPsyPoints)

  const updatedRecords: UpdatedUnclaimedPoints = await calculateUpdatedPoints(
    dempHoldersPsyPoints,
    pointsDistribution
  )
  console.log("updatedRecords: ", updatedRecords)
  const auditLogs: AuditLog[] = prepAuditLogsPerWalletAddress(
    dempHoldersPsyPoints,
    pointsDistribution
  )
  console.log("auditLogs: ", auditLogs)

  const res = await bulkGivePoints(updatedRecords, auditLogs)
  if (!res) {
    throw new UserPsypointsBulkUpdateFailed()
  }
}

run()
