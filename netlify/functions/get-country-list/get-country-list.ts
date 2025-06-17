import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

interface Country {
  id: number
  name: string
}

type GetFaunaType = {
  data: Array<{
    data: Country
  }>
}

const getCountryList = async (): Promise<Country[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Match(q.Index("countries-sorted-by-name")), {
        size: 300,
      }),
      q.Lambda("country", q.Get(q.Select([1], q.Var("country"))))
    )
  )
  await serverClient.close()

  return response.data.map((d) => ({
    id: d.data.id,
    name: d.data.name,
  }))
}

export const handler: Handler = async () => {
  try {
    const countries = await getCountryList()
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(countries),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Something went wrong." }),
    }
  }
}
