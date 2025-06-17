import { Handler } from "@netlify/functions"
import { getATOSummary } from "../../utils/ato"
import jwt, { JwtPayload } from "jsonwebtoken"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET",
}
const USERNAME = "admin"

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }
  try {
    const { authorization } = event.headers
    if (!authorization) {
      return {
        statusCode: 401,
        body: "Unauthorized",
      }
    }
    const token = authorization.replace("Bearer ", "")

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)

      if (typeof decoded === "object" && "username" in decoded) {
        const { username } = decoded as JwtPayload

        if (username !== USERNAME) {
          return {
            statusCode: 401,
            body: "Unauthorized",
          }
        }
      } else {
        // Decoded payload does not have the 'username' property
        return {
          statusCode: 401,
          body: "Unauthorized",
        }
      }
    } catch (err) {
      // Token verification failed

      return {
        statusCode: 401,
        body: "Unauthorized",
      }
    }

    const resp = await getATOSummary()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(resp),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    }
  }
}
