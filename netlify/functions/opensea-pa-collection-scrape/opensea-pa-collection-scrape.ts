/* eslint-disable camelcase */
import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"
import axios from "axios"
import camelcaseKeys from "camelcase-keys"

type OpenSeaResult = {
  one_day_volume: number
  one_day_change: number
  one_day_sales: number
  one_day_average_price: number
  seven_day_volume: number
  seven_day_change: number
  seven_day_sales: number
  seven_day_average_price: number
  thirty_day_volume: number
  thirty_day_change: number
  thirty_day_sales: number
  thirty_day_average_price: number
  total_volume: number
  total_sales: number
  total_supply: number
  count: number
  num_owners: number
  average_price: number
  num_reports: number
  market_cap: number
  floor_price: number
}

interface OpenSeaStatistics {
  stats: OpenSeaResult
}

interface FaunaData {
  genesisStats: OpenSeaResult | {}
  metaStats: OpenSeaResult | {}
  irlStats: OpenSeaResult | {}
  componentOneStats: OpenSeaResult | {}
  componentTwoStats: OpenSeaResult | {}
  pappStats: OpenSeaResult | {}
  componentThreeStats: OpenSeaResult | {}
  psilocybinStats: OpenSeaResult | {}
}

const scrapeStatistics = async (collection: string): Promise<OpenSeaResult> => {
  const result = await axios.get<OpenSeaStatistics>(
    `https://api.opensea.io/api/v1/collection/${collection}/stats`
  )
  return result.data.stats
}

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY,
  domain: "db.us.fauna.com",
})

const postFaunaData = async (data: FaunaData) => {
  await serverClient.query(
    q.Create(q.Collection("opensea-pa-statistics"), {
      data: camelcaseKeys(data, { deep: true }),
    })
  )
  console.log("Successfully commited to fauna")
}

const scrapeAllStatistics = async () => {
  let genesisStats = {}
  let metaStats = {}
  let irlStats = {}
  let componentOneStats = {}
  let componentTwoStats = {}
  let pappStats = {}
  let componentThreeStats = {}
  let psilocybinStats = {}

  let retries = 0

  while (retries !== 5) {
    try {
      Promise.all([
        (genesisStats = await scrapeStatistics(
          "psychedelics-anonymous-genesis"
        )),
        (metaStats = await scrapeStatistics(
          "metaverse-psychedelics-anonymous-pass"
        )),
        (irlStats = await scrapeStatistics("irl-psychedelics-anonymous-pass")),
        (componentOneStats = await scrapeStatistics(
          "psychedelics-anonymous-component-1"
        )),
        (componentTwoStats = await scrapeStatistics(
          "psychedelics-anonymous-component-two"
        )),
        (pappStats = await scrapeStatistics(
          "psychedelics-anonymous-printing-press"
        )),
        (componentThreeStats = await scrapeStatistics(
          "psychedelics-anonymous-component-three"
        )),
        (psilocybinStats = await scrapeStatistics(
          "psychedelics-anonymous-psilocybin"
        )),
      ])
      if (
        genesisStats &&
        metaStats &&
        irlStats &&
        componentOneStats &&
        componentTwoStats &&
        pappStats &&
        componentThreeStats &&
        psilocybinStats
      ) {
        console.log("Successfully fetched data from OpenSea")
        return await postFaunaData({
          genesisStats,
          metaStats,
          irlStats,
          componentOneStats,
          componentTwoStats,
          pappStats,
          componentThreeStats,
          psilocybinStats,
        })
      }
    } catch (err) {
      retries += 1
      continue
    }
  }

  throw new Error("Retry limit reached.")
}

export const handler: Handler = () => {
  return scrapeAllStatistics()
    .then(() => {
      console.log("Successfully synced opensea data.")
      return {
        statusCode: 200,
      }
    })
    .catch((e) => {
      console.error(e)
      return {
        statusCode: 500,
      }
    })
}
