import { Handler } from "@netlify/functions"
import {
  ClaimedPointsNotFound,
  UnclaimedPointsNotFound,
} from "../../utils/psypoints-error"

import Joi from "joi"
import { claimPsy, getPsypayUser } from "../../utils/psypay-service"
import {
  PsyPayUserNotFound,
  VendorNotAuthenticated,
} from "../../utils/psypay-service-error"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}
const verifySigEndpointSchema = Joi.object({
  walletAddress: Joi.string().alphanum().required(),
})

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const body = JSON.parse(event.body as string)
  const validationResults = verifySigEndpointSchema.validate(body)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResults.error,
      }),
    }
  }

  try {
    const existingUser = await getPsypayUser(body!.walletAddress!.toLowerCase())
    if (existingUser.claimedPoints === undefined) {
      throw new ClaimedPointsNotFound()
    }
    if (existingUser.unclaimedPoints === undefined) {
      throw new UnclaimedPointsNotFound()
    }

    await claimPsy(body!.walletAddress!.toLowerCase())
    return {
      statusCode: 200,
      headers,
    }
  } catch (error) {
    if (
      error instanceof PsyPayUserNotFound ||
      error instanceof ClaimedPointsNotFound ||
      error instanceof UnclaimedPointsNotFound ||
      error instanceof VendorNotAuthenticated
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
}
