import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const checkIRLExistence = async (token: number): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<boolean>(
    q.Exists(q.Match(q.Index("irl-claims-by-token"), token))
  )
  await serverClient.close()

  return response
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const jsonBody = JSON.parse(event.body)
  const token = +jsonBody?.token

  if (token <= 0 || token > 9595) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: "Valid token id is required." }),
    }
  }

  try {
    const tokenExists = await checkIRLExistence(token)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ exists: tokenExists }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Something went wrong. Please try again",
      }),
    }
  }
}
