import * as fs from "fs"
import path from "path"
import { POINTS } from "./points-allocation"
import psilocybinTraits from "../../netlify/lib/psilocybinfinaltraits.json"
import {
  AuditLog,
  AuditLogPsypointsSource,
  bulkGivePoints,
  getPsyOfHolders,
  PointsDistribution,
  UserFaunaRef,
  UpdatedUnclaimedPoints,
} from "../../netlify/utils/get-user"
import dotenv from "dotenv"
dotenv.config()

const DATE = "11022023"

enum TokenType {
  genesis = "genesis",
  psilocybin = "psilocybin",
  c1 = "c1",
}
interface TokenOwnerships {
  [address: string]: {
    tokens: number[]
    count: number
  }
}

interface HistoricalData {
  genesis: TokenOwnerships
  psilocybin: TokenOwnerships
  c1: TokenOwnerships
}

async function loadHistoricalData(
  tokenType: string,
  targetDate: string
): Promise<HistoricalData> {
  return JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `historical_token_ownership/${targetDate}/${tokenType}.json`
      ),
      "utf8"
    )
  )
}

function removeZeroOwned(hd: HistoricalData) {
  Object.keys(hd).forEach((tokenType) => {
    const tkt = tokenType as TokenType
    Object.keys(hd[tkt]).forEach((address) => {
      if (hd[tkt][address].count === 0) {
        delete hd[tkt][address]
      }
    })
  })
  return hd
}

function getPsilocybinType(tid: number): string {
  const PsilocybinTraits: any[] = psilocybinTraits as any[]
  return `${PsilocybinTraits[tid - 1].attributes[1].value.toLowerCase()}`
}

function combineHD(...hdSets: HistoricalData[]): PointsDistribution {
  const pointsDistribution: PointsDistribution = {}

  for (const hd of hdSets) {
    for (const tkt in hd) {
      const to: TokenOwnerships = hd[tkt as TokenType]!
      for (const address in to) {
        if (!pointsDistribution[address]) {
          const audit = {
            TOTAL_POINTS: 0,
          } as AuditLogPsypointsSource
          pointsDistribution[address] = audit
        }

        if (tkt === TokenType.psilocybin) {
          for (const tk of to[address].tokens) {
            const psiType = `psilocybin_${getPsilocybinType(tk)}`

            if (!pointsDistribution[address][psiType]) {
              pointsDistribution[address][psiType] = {
                tokens: [],
                count: 0,
                points: 0,
              }
            }
            pointsDistribution[address][psiType].tokens.push(tk)
            pointsDistribution[address][psiType].count += 1
            pointsDistribution[address][psiType].points! +=
              POINTS[psiType as keyof typeof POINTS]
            pointsDistribution[address].TOTAL_POINTS +=
              POINTS[psiType as keyof typeof POINTS]
          }
        } else {
          const points = to[address].count * POINTS[tkt as keyof typeof POINTS]
          pointsDistribution[address][tkt] = {
            tokens: to[address].tokens,
            count: to[address].count,
            points: points,
          }
          pointsDistribution[address].TOTAL_POINTS += points
        }
      }
    }
  }
  return pointsDistribution
}

function prepUpdatePsyOfHolders(
  records: UserFaunaRef[],
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
  psyOfHolders: UserFaunaRef[],
  pointsDistribution: PointsDistribution
): AuditLog[] {
  const auditLogs = []

  for (const holder of psyOfHolders) {
    const walletAddress = holder.walletAddress
    if (walletAddress in pointsDistribution) {
      const pointsToGive = pointsDistribution[walletAddress]?.TOTAL_POINTS
      const currUnclaimedPoints = holder.unclaimedPoints
        ? holder.unclaimedPoints
        : 0
      const updatedPoints = currUnclaimedPoints + pointsToGive

      auditLogs.push({
        walletAddress: walletAddress,
        prevClaimedPoints: holder.claimedPoints!,
        prevUnclaimedPoints: currUnclaimedPoints,
        claimedPoints: holder.claimedPoints!,
        unclaimedPoints: updatedPoints,
        source: pointsDistribution[walletAddress],
      })
    }
  }

  return auditLogs
}

async function main() {
  console.log("DATE: ", DATE)
  let genesisHD = await loadHistoricalData(TokenType.genesis, DATE)
  genesisHD = removeZeroOwned(genesisHD)
  console.log(Object.keys(genesisHD[TokenType.genesis]).length)
  let c1HD = await loadHistoricalData(TokenType.c1, DATE)
  c1HD = removeZeroOwned(c1HD)
  console.log(Object.keys(c1HD[TokenType.c1]).length)
  let psilocybinHD = await loadHistoricalData(TokenType.psilocybin, DATE)
  psilocybinHD = removeZeroOwned(psilocybinHD)
  console.log(Object.keys(psilocybinHD[TokenType.psilocybin]).length)

  const pointsDistribution = combineHD(genesisHD, c1HD, psilocybinHD)
  const outStr = JSON.stringify(pointsDistribution, null, 2)
  await fs.writeFile(
    path.join(__dirname, `./historical_token_ownership/${DATE}/combined.json`),
    outStr,
    "utf8",
    (err) => {
      if (err) {
        console.log("An error occurred while writing JSON Object to File.")
        return console.log(err)
      }

      console.log("JSON file has been saved.")
    }
  )
  const holders = Object.keys(pointsDistribution)
  const batchSize = 500
  const holdersInBatches = []
  for (let i = 0; i < holders.length; i += batchSize) {
    holdersInBatches.push(holders.slice(i, i + batchSize))
  }
  console.log("holders.length: ", holders.length)
  console.log("holdersInBatches.length: ", holdersInBatches.length)
  const psyOfHolders = []
  console.log(`\nStart time: ${new Date()} getPsyOfHolders`)

  for (let hB = 0; hB < holdersInBatches.length; hB++) {
    console.log(`holdersInBatches[${hB}]`)

    const res = await getPsyOfHolders(holdersInBatches[hB])
    psyOfHolders.push(...res)
  }
  console.log("psyOfHolders.length: ", psyOfHolders.length)

  const updatesOnPsyOfHolders = await prepUpdatePsyOfHolders(
    psyOfHolders,
    pointsDistribution
  )

  const auditLogs: AuditLog[] = prepAuditLogsPerWalletAddress(
    psyOfHolders,
    pointsDistribution
  )

  console.log(`\nStart time: ${new Date()} bulkGivePoints`)
  await bulkGivePoints(updatesOnPsyOfHolders, auditLogs)
}

main()
