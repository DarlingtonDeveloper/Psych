import { Handler } from "@netlify/functions"
import { UserInvalidSignature, UserNotFound } from "../../utils/users-error"
import { getUser, updateUserGST, addUserGST } from "../../utils/get-user"
import { ethers } from "ethers"
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
  signature: Joi.string().alphanum().required(),
})

function getMessage(walletAddress: string): string {
  return (
    "By connecting to the Psychedelics Anonymous platform and signing this message you are agreeing to our:\n\n" +
    "Privacy Policy: https://psychedelicsanonymous.com/privacypolicy\n\n" +
    "Terms & Conditions: https://psychedelicsanonymous.com/terms\n\n" +
    "NFT License: https://psychedelicsanonymous.com/nftlicense\n\n" +
    "PSY Points Terms & Conditions: https://psychedelicsanonymous.com/psy-terms\n\n" +
    `wallet-address: ${walletAddress}\n\n`
  )
}

function verifySignature(walletAddress: string, signature: string): string {
  const expectedMessage = getMessage(walletAddress!)
  const verifiedAddress = ethers.utils.verifyMessage(expectedMessage, signature)
  return verifiedAddress
}

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
    if (
      verifySignature(body!.walletAddress!, body!.signature!).toLowerCase() !==
      body!.walletAddress
    ) {
      throw new UserInvalidSignature()
    }

    const ret = await getUser(body!.walletAddress!.toLowerCase())
    if (!ret.length) {
      // throw new UserNotFound()
      //add user with just the psypoints user details only
      await addUserGST(body!.walletAddress!.toLowerCase(), body, ip)
      return {
        statusCode: 200,
        headers,
      }
    } else {
      await updateUserGST(body!.walletAddress!.toLowerCase(), body, ip)
      return {
        statusCode: 200,
        headers,
      }
    }
  } catch (error) {
    if (error instanceof UserInvalidSignature) {
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify({
          message: error.message,
        }),
      }
    } else {
      console.log(error)
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
