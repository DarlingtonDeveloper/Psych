import { Handler } from "@netlify/functions"
import {
  UserInvalidSignature,
  UserNotFound,
  UserSessionUnmatchedParams,
} from "../../utils/users-error"
import {
  ClaimedPointsNotFound,
  UnclaimedPointsNotFound,
} from "../../utils/psypoints-error"
import { getUser } from "../../utils/get-user"
import { recordPsypayTransaction } from "../../utils/psypay"

import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"

import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const verifySigEndpointSchema = Joi.object({
  walletAddress: Joi.string().alphanum().required(),
  price: Joi.number().integer().min(0).required(),
  item: Joi.string().required(),
  timestamp: Joi.number().integer().min(0).required(),
  success: Joi.boolean().required(),
  psypayTransactionId: Joi.number().required(),
})

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
    const body = JSON.parse(event.body as string)
    const validationResults = verifySigEndpointSchema.validate(body)

    if (validationResults.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Schema validation error.",
        }),
      }
    }

    try {
      if (
        body!.walletAddress.toLowerCase() !== walletAddressSession.toLowerCase()
      ) {
        throw new UserSessionUnmatchedParams()
      }
      const ret = await getUser(body!.walletAddress!.toLowerCase())
      if (!ret.length) {
        throw new UserNotFound()
      } else {
        const psypayTransactionPARecord = await recordPsypayTransaction(
          body!.psypayTransactionId,
          body!.timestamp,
          body!.walletAddress,
          body!.item,
          body!.success,
          body!.price
        )

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(psypayTransactionPARecord),
        }
      }
    } catch (error) {
      console.log("error: ", error)
      if (
        error instanceof UserInvalidSignature ||
        error instanceof UserNotFound ||
        error instanceof ClaimedPointsNotFound ||
        error instanceof UnclaimedPointsNotFound ||
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
