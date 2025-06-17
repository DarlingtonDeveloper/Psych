import { Handler } from "@netlify/functions"
import Joi from "joi"

import camelcaseKeys from "camelcase-keys"
import faunadb, { query as q } from "faunadb"
import { ethers } from "ethers"

interface IRLFormData {
  tokens: string[]
  firstName: string
  lastName: string
  ethWalletAddress: string
  emailAddress: string
  country: string
  tshirtSize: string
  sockSize: string
  postalAddress: string
  state: string
  city: string
  zipCode: string
  address: string
  signature: string
}

const FIELD_IS_REQUIRED = "Please complete this required answer."

const irlClaimSchema = Joi.object({
  tokens: Joi.array().items(Joi.number()).min(1).unique().required(),
  firstName: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  lastName: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  ethWalletAddress: Joi.string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .required()
    .messages({
      "string.empty": FIELD_IS_REQUIRED,
      "string.pattern.base": "Please enter a valid wallet address.",
    }),
  emailAddress: Joi.string().required().messages({
    "string.empty": FIELD_IS_REQUIRED,
    "string.pattern.base": "Please enter a valid email.",
  }),
  country: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  tshirtSize: Joi.string().valid("XS", "S", "M", "L", "XL", "XXL").required(),
  postalAddress: Joi.string().max(5000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  state: Joi.string().allow("").required(),
  city: Joi.string().allow("").required(),
  zipCode: Joi.string().max(100).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  address: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
  signature: Joi.string().max(1000).required().messages({
    "string.empty": FIELD_IS_REQUIRED,
  }),
})

const claimIRL = async (data: IRLFormData) => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const { tokens, ...faunaData } = data

  const queries = tokens.map((token) =>
    q.Create(q.Collection("irl-claims"), {
      data: camelcaseKeys(
        {
          token,
          ...faunaData,
        },
        { deep: true }
      ),
    })
  )

  await serverClient.query(queries)
  await serverClient.close()
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const jsonBody = JSON.parse(event.body) as IRLFormData
  const validationResults = irlClaimSchema.validate(jsonBody)

  if (validationResults.error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(validationResults.error),
    }
  }

  const messageHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(JSON.stringify(jsonBody.tokens))
  )
  const verifiedAddress = ethers.utils.verifyMessage(
    messageHash,
    jsonBody.signature
  )

  if (verifiedAddress !== jsonBody.address) {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({
        message: "Signature rejected.",
      }),
    }
  }
  return claimIRL(validationResults.value)
    .then(() => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Successfully claimed" }),
      }
    })
    .catch((err) => {
      if (err.description === "document is not unique.") {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            message: "One or more IRL token already has an application.",
          }),
        }
      }
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: err.description || "Something went wrong. Please try again.",
        }),
      }
    })
}
