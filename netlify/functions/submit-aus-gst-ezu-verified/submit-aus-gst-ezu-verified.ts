import { Handler } from "@netlify/functions"
import { UserNotFound } from "../../utils/users-error"
import { getUser, updateUserGSTEZU } from "../../utils/get-user"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const formBodySchema = Joi.object({
  userIsOGEZUMinter: Joi.string().valid("yes", "no").required(),
  userIsAUSTaxResEZUMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  userLocAUSEZUMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  userRegAUSGSTEZUMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  userIsAUSTaxResident: Joi.string().valid("yes", "no").required(),
  userInAUS: Joi.string().valid("yes", "no").required(),
  userRegisteredAUSGST: Joi.string().valid("yes", "no").required(),
  walletAddresses: Joi.string()
    .regex(/^(0x[a-fA-F0-9]{40}\s*,\s*)*(0x[a-fA-F0-9]{40})$/)
    .replace(/\s/g, "")
    .allow("")
    .optional(),
  declareTruth: Joi.boolean().valid(true).required(),
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
  const gstValidationResults = formBodySchema.validate(body)

  if (gstValidationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: gstValidationResults.error,
      }),
    }
  }

  try {
    const ret = await getUser(body!.walletAddress!.toLowerCase())
    if (!ret.length) {
      throw new UserNotFound()
    } else {
      await updateUserGSTEZU(body!.walletAddress!.toLowerCase(), body)
      return {
        statusCode: 200,
        headers,
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
