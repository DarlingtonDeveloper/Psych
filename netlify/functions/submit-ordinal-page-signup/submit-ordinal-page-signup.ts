import { Handler } from "@netlify/functions"
import { submitSignup } from "../../utils/ordinals"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const formBodySchema = Joi.object({
  userIsAUSTaxResident: Joi.string().valid("yes", "no").required(),
  userInAUS: Joi.string().valid("yes", "no").required(),
  userRegAUSGST: Joi.string().valid("yes", "no").required(),
  userBTCWallet: Joi.string().optional(),
  userEmailAddress: Joi.string().email().optional(),
}).or("userBTCWallet", "userEmailAddress")

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const ip =
    event.headers["x-forwarded-for"] || event.headers["x-real-ip"] || ""

  const body = JSON.parse(event.body as string)
  const formValidation = formBodySchema.validate(body)

  if (formValidation.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: formValidation.error,
      }),
    }
  }

  try {
    await submitSignup(body, ip)
    return {
      statusCode: 200,
      headers,
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
