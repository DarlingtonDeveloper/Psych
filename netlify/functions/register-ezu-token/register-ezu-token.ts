import { Handler } from "@netlify/functions"
import camelcaseKeys from "camelcase-keys"
import faunadb, { query as q } from "faunadb"
import Joi from "joi"
import { ethers } from "ethers"
import { SimpleRegex } from "simple-regex"
import sendEmail from "../../lib/send-email"
import emailTempaltes from "../../lib/emailTemplates.json"
import getUuid from "uuid-by-string"

const REGISTRATION_LIMIT = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface FormRegistrationData {
  firstName: string
  lastName: string
  emailAddress: string
  twitterHandle: string
  signature: string
  address: string
  token: number
}

interface FormRegistrationWithCode extends FormRegistrationData {
  code: string
}

const formRegistrationData = Joi.object({
  firstName: Joi.string().max(1000).required(),
  lastName: Joi.string().max(1000).required(),
  emailAddress: Joi.string().regex(SimpleRegex.EmailAddress).required(),
  twitterHandle: Joi.string()
    .regex(/^@(?=.*\w)[\w]{1,15}$/)
    .required(),
  signature: Joi.string().max(500).required(),
  address: Joi.string().max(100).required(),
  token: Joi.number().min(1).max(9595).required(),
})

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY as string,
  domain: "db.us.fauna.com",
})

const isRegistrationLimitReached = async (): Promise<boolean> => {
  const count = (await serverClient.query(
    q.Count(q.Documents(q.Collection("ezu-registrations")))
  )) as number

  return count >= REGISTRATION_LIMIT
}

const postFaunaData = async (data: FormRegistrationWithCode) => {
  await serverClient.query(
    q.Create(q.Collection("ezu-registrations"), {
      data: camelcaseKeys(data, { deep: true }),
    })
  )

  await sendEmail({
    from: "rsvp@psychedelicsanonymous.com",
    to: data.emailAddress,
    templateId: emailTempaltes.PA_EZU_REGISTRATION_COMPLETE,
    subject: "PAxEZU Registration Complete",
    data: {
      code: data.code,
    },
  })
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const jsonBody = JSON.parse(event.body as string) as FormRegistrationData
  const validationResults = formRegistrationData.validate(jsonBody)

  if (validationResults.error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(validationResults.error),
    }
  }

  const verifiedAddress = ethers.utils.verifyMessage(
    `Submit your EZU registration with genesis token ${jsonBody.token}.`,
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

  try {
    if (await isRegistrationLimitReached()) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          message: "Registration limit reached.",
        }),
      }
    }

    await postFaunaData({
      ...validationResults.value,
      code: getUuid(
        `${validationResults.value.emailAddress}_${validationResults.value.token}`
      )
        .split("-")[0]
        .toUpperCase(),
    })
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Successfully signed up." }),
    }
  } catch (err) {
    console.log(err)
    if (err.description === "document is not unique.") {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          message: "Genesis token already has a survey registration.",
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
  }
}
