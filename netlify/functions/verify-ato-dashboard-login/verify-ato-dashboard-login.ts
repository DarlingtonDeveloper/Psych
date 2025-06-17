import { Handler } from "@netlify/functions"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "POST",
}

const USERNAME = "admin"
const PASSWORD = "$2b$10$kGZVNb58HsQ/5VuY0USZju68nm0lWkS6BxcRlS1.LAqUnXL0P7TM2" //paseasonato2023

function checkPassword(password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, PASSWORD, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export function getJWT(username: string): string {
  const authToken = jwt.sign(
    { username: username },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "24h" }
  )
  return authToken
}

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

    const encodedCredentials = authorization.split(" ")[1]
    const [username, password] = Buffer.from(encodedCredentials, "base64")
      .toString("utf-8")
      .split(":")

    const passwordMatched = await checkPassword(password)

    if (username === USERNAME && passwordMatched) {
      const authToken = getJWT(username)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ accessToken: authToken }),
      }
    } else {
      return {
        statusCode: 401,
        body: "Unauthorized",
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    }
  }
}
