import axios from "axios"
import { Handler } from "@netlify/functions"
import {
  createPsypayPendingTrxData,
  CreatePackPsypayPendingTransactionResponse,
} from "../../utils/psypay"
import {
  UserInvalidSignature,
  UserNotFound,
  UserSessionUnmatchedParams,
} from "../../utils/users-error"
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

async function reqCreatePendingTrx(body: createPsypayPendingTrxData) {
  const campaignId = body.campaignId

  const secretKey = process.env.NEXT_PUBLIC_ND_PSYPAY_SECRET_KEY
  const reqStr = `${process.env.NEXT_PUBLIC_ND_API_BASE_URL}/campaigns/${campaignId}/psypayPendingTransaction?secretKey=${secretKey}`
  try {
    const { data } = await axios.post(reqStr, body)

    return data
  } catch (error) {
    console.log("error: ", error)
    throw error
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }
  const auth = event.headers.authorization
  if (auth) {
    const token = auth.replace("Bearer ", "")
    let walletAddressSession = ""

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      walletAddressSession = decoded.walletAddress
    } catch (authErr) {
      if (authErr instanceof TokenExpiredError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            message: "Token expired",
          }),
        }
      }
      if (authErr instanceof JsonWebTokenError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            message: "Not authorized access.",
          }),
        }
      }
    }

    try {
      const params = JSON.parse(event.body as string)
      if (
        params!.byWalletAddress.toLowerCase() !==
        walletAddressSession.toLowerCase()
      ) {
        throw new UserSessionUnmatchedParams()
      }
      try {
        const result = (await reqCreatePendingTrx(
          params as createPsypayPendingTrxData
        )) as CreatePackPsypayPendingTransactionResponse
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(result),
        }
      } catch (error: any) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            message:
              error?.response?.data.message ||
              "Something went wrong creating psypay pending transaction. Please try again.",
          }),
        }
      }
    } catch (error) {
      console.log("error: ", error)
      if (
        error instanceof UserInvalidSignature ||
        error instanceof UserNotFound ||
        error instanceof UserSessionUnmatchedParams
      ) {
        return {
          statusCode: error.statusCode,
          headers,
          body: JSON.stringify({
            message: error.message,
          }),
        }
      } else {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            message: "Something went wrong. Please try again.",
          }),
        }
      }
    }
  } else {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        message: "Authorization header required.",
      }),
    }
  }
}
