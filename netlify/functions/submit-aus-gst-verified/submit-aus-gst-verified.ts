import { Handler } from "@netlify/functions"
import { UserNotFound } from "../../utils/users-error"
import { getUser, updateUserGST } from "../../utils/get-user"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const formBodySchema = Joi.object({
  userIsOriginalMinter: Joi.string().valid("yes", "no").required(),
  userIsAUSTaxResOrigMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  userLocAUSOrigMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  userRegAUSGSTOrigMintingPeriod: Joi.when("userIsOriginalMinter", {
    is: true,
    then: Joi.string().valid("yes", "no").required(),
  }),
  referralWalletAddress: Joi.string()
    .regex(/^(0x[a-fA-F0-9]{40})$/)
    .replace(/\s/g, "")
    .allow("")
    .optional(),
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

  const ip =
    event.headers["x-forwarded-for"] || event.headers["x-real-ip"] || ""
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
      await updateUserGST(body!.walletAddress!.toLowerCase(), body, ip)
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
