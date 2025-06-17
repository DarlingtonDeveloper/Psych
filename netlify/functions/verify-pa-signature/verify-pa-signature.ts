import { Handler } from "@netlify/functions"
import { getUser } from "../../utils/get-user"
import { UserInvalidSignature, UserNotFound } from "../../utils/users-error"
import { ethers } from "ethers"
import jwt from "jsonwebtoken"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}
const verifySigEndpointSchema = Joi.object({
  walletAddress: Joi.string().alphanum().required(),
  signature: Joi.string().alphanum().required(),
})

export function getLoginMessage(walletAddress: string, nonce: string): string {
  return (
    "By connecting to the Psychedelics Anonymous platform and signing this message you are agreeing to our:\n\n" +
    "Privacy Policy: https://psychedelicsanonymous.com/privacypolicy\n\n" +
    "Terms & Conditions: https://psychedelicsanonymous.com/terms\n\n" +
    "PA NFT License: https://psychedelicsanonymous.com/nftlicense\n\n" +
    "EZU NFT License: https://ezu.xyz/nft-license\n\n" +
    "PSY Points Terms & Conditions: https://psychedelicsanonymous.com/psy-terms\n\n" +
    `wallet-address: ${walletAddress}\n\n` +
    `nonce: ${nonce}`
  )
}

export function getJWT(walletAddress: string, progress: number): string {
  const authToken = jwt.sign(
    { walletAddress: walletAddress, progress: progress },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "24h" }
  )
  return authToken
}

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

  const walletAddress = event.queryStringParameters!.walletAddress
  const signature = event.queryStringParameters!.signature

  try {
    const ret = await getUser(walletAddress)

    if (!ret.length) {
      throw new UserNotFound()
    } else {
      const existingUser = ret[0]
      const progress = existingUser.progress
      const message = getLoginMessage(
        existingUser.walletAddress,
        existingUser.nonce
      )
      const verifiedAddress = ethers.utils.verifyMessage(message, signature)

      if (verifiedAddress.toLowerCase() !== existingUser.walletAddress) {
        throw new UserInvalidSignature()
      }

      const authToken = getJWT(walletAddress, progress)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ accessToken: authToken }),
      }
    }
  } catch (error) {
    if (
      error instanceof UserInvalidSignature ||
      error instanceof UserNotFound
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
