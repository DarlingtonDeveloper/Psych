import { Handler } from "@netlify/functions"
import {
  ClaimedPointsNotFound,
  UnclaimedPointsNotFound,
} from "../../utils/psypoints-error"

import Joi from "joi"
import { createPsyPayUser, getPsypayUser } from "../../utils/psypay-service"
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
  const params = event.queryStringParameters
  const validationResults = verifySigEndpointSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResults.error,
      }),
    }
  }

  try {
    const existingUser = await getPsypayUser(params!.walletAddress!)
    if (existingUser.claimedPoints === undefined) {
      throw new ClaimedPointsNotFound()
    }
    if (existingUser.unclaimedPoints === undefined) {
      throw new UnclaimedPointsNotFound()
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        claimedPoints: existingUser.claimedPoints,
        unclaimedPoints: existingUser.unclaimedPoints,
      }),
    }
  } catch (error) {
    if (error instanceof PsyPayUserNotFound) {
      await createPsyPayUser(params!.walletAddress!)
      const newPsyPayUser = await getPsypayUser(params!.walletAddress!)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          claimedPoints: newPsyPayUser.claimedPoints,
          unclaimedPoints: newPsyPayUser.unclaimedPoints,
        }),
      }
    } else if (
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
