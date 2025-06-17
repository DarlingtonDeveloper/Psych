/* eslint-disable camelcase */
import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"

type OpenSeaResult = {
  oneDayVolume: number
  oneDayChange: number
  oneDaySales: number
  oneDayAveragePrice: number
  sevenDayVolume: number
  sevenDayChange: number
  sevenDaySales: number
  sevenDayAveragePrice: number
  thirtyDayVolume: number
  thirtyDayChange: number
  thirtyDaySales: number
  thirtyDayAveragePrice: number
  totalVolume: number
  totalSales: number
  totalSupply: number
  count: number
  numOwners: number
  averagePrice: number
  numReports: number
  marketCap: number
  floorPrice: number
}

interface FaunaData {
  genesisStats: OpenSeaResult | {}
  metaStats: OpenSeaResult | {}
  irlStats: OpenSeaResult | {}
  componentOneStats: OpenSeaResult | {}
  componentTwoStats: OpenSeaResult | {}
  pappStats: OpenSeaResult | {}
  componentThreeStats: OpenSeaResult | {}
}

type GetFaunaType = {
  data: Array<{
    data: FaunaData
  }>
}

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY,
  domain: "db.us.fauna.com",
})

const getFaunaData = async (): Promise<FaunaData> => {
  const result = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Match(q.Index("os-pa-statistics-by-reverse-ts")), {
        size: 1,
      }),
      q.Lambda("statRef", q.Get(q.Select([1], q.Var("statRef"))))
    )
  )

  return result.data[0].data
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

export const handler: Handler = () => {
  return getFaunaData()
    .then((data) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      }
    })
    .catch((error) => {
      console.log(error)
      return {
        statusCode: 500,
      }
    })
}
