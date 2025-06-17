import { Handler } from "@netlify/functions"
import { getRiddle } from "../../utils/get-riddle"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const getRiddleEndpointSchema = Joi.object({
  riddleID: Joi.number().integer().min(0).required(),
})

export const handler: Handler = async (event) => {
  const params = event.queryStringParameters
  const validationResults = getRiddleEndpointSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResults.error,
      }),
    }
  }

  try {
    const riddleID = parseInt(event.queryStringParameters!.riddleID)

    const ret = await getRiddle(riddleID)
    if (!ret.length) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: "Riddle ID was not found." }),
      }
    } else {
      const retRiddle = ret[0]
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          riddleID: riddleID,
          riddle: retRiddle.riddle,
          icon: retRiddle.icon,
          answerLength: retRiddle.answer.length,
        }),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Something went wrong. Please try again.",
      }),
    }
  }
}
