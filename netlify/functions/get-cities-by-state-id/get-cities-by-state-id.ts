import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

interface City {
  id: string
  name: string
}

interface State {
  id: string
  cities: City[]
}

type GetFaunaType = {
  data: Array<{
    data: State
  }>
}

const getStateCities = async (stateId: string): Promise<City[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Match(q.Index("states-by-id"), stateId), { size: 1 }),
      q.Lambda("state", q.Get(q.Var("state")))
    )
  )
  await serverClient.close()

  return response.data.length > 0 ? response.data[0].data.cities : []
}

export const handler: Handler = async (event) => {
  const stateId = event.queryStringParameters?.stateId

  if (!stateId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "State id is required." }),
    }
  }

  try {
    const cities = await getStateCities(stateId)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(cities),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Something went wrong. Please try again.",
      }),
    }
  }
}
