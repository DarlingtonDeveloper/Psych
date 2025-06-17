import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

interface State {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
  states: State[]
}

type GetFaunaType = {
  data: Array<{
    data: Country
  }>
}

const getCountryStates = async (countryId: number): Promise<State[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Match(q.Index("countries-by-id"), countryId), { size: 1 }),
      q.Lambda("country", q.Get(q.Var("country")))
    )
  )
  await serverClient.close()

  return response.data.length > 0 ? response.data[0].data.states : []
}

export const handler: Handler = async (event) => {
  const countryId = event.queryStringParameters?.countryId

  if (!countryId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "Country id is required." }),
    }
  }

  try {
    const states = await getCountryStates(+countryId)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(states),
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
