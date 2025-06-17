import { Handler } from "@netlify/functions"
import { UserNotFound } from "../../utils/users-error"
import { getUser } from "../../utils/get-user"

import Joi from "joi"

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
    const ret = await getUser(params!.walletAddress!.toLowerCase())
    if (!ret.length) {
      throw new UserNotFound()
    } else {
      if ("ezuQuestionnaire" in ret[0]) {
        return {
          statusCode: 200,
          headers,
        }
      } else {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            message: "User hasn't answered AUS GST (EZU) yet.",
          }),
        }
      }
    }
  } catch (error) {
    console.log(error)
    if (error instanceof UserNotFound) {
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
