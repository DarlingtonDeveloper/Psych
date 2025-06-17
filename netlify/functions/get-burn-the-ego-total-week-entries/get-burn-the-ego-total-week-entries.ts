import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"
import { CONTRACTS_DATA } from "../../lib/burn-the-ego"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

export const createIndices = () => {}

export const handler: Handler = async (event) => {
  try {
    const params = event.queryStringParameters

    const serverClient = new faunadb.Client({
      secret: process.env.FAUNA_DB_SECRET_KEY as string,
      domain: "db.us.fauna.com",
    })

    const contractEntries = Object.entries(CONTRACTS_DATA).map(
      ([key, { numEntries }]) => ({ key, numEntries })
    )

    const response = await serverClient.query(
      q.Let(
        {
          docs: q.Map(
            q.Paginate(
              q.Documents(
                q.Collection(`burn-the-ego-snapshots-week-${params?.weekNo}`)
              ),
              {
                size: 10000,
              }
            ),
            q.Lambda("items", q.Get(q.Var("items")))
          ),
          numEntries: q.Map(
            q.Var("docs"),
            q.Lambda(
              "doc",
              q.Sum(
                q.Map(
                  contractEntries,
                  q.Lambda(
                    "contract",
                    q.Multiply(
                      q.Select(["numEntries"], q.Var("contract")),
                      q.Select(
                        ["data", q.Select(["key"], q.Var("contract"))],
                        q.Var("doc")
                      )
                    )
                  )
                )
              )
            )
          ),
        },
        q.Sum(q.Var("numEntries"))
      )
    )

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ total: (response as any)?.data?.[0] }),
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
