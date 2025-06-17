import axios from "axios"
import { Handler } from "@netlify/functions"
import {
  CapturePsypayCampaignOrderParams,
  CapturePsypayCampaignOrderBody,
  CreateFinalizeCampaignPsypayTransactionResponse,
} from "../../utils/psypay"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}
const finalizePsypayParamsSchema = Joi.object({
  campaignId: Joi.number().required(),
  psypayTransactionId: Joi.number().required(),
})

async function reqFinalizePsypayTrx(
  params: CapturePsypayCampaignOrderParams,
  body: CapturePsypayCampaignOrderBody
) {
  const campaignId = params.campaignId
  const psypayTransactionId = params.psypayTransactionId

  const secretKey = process.env.NEXT_PUBLIC_ND_PSYPAY_SECRET_KEY
  const reqStr = `${process.env.NEXT_PUBLIC_ND_API_BASE_URL}/campaigns/${campaignId}/psypayTransaction/${psypayTransactionId}/capture?secretKey=${secretKey}`

  const { data } = await axios.post(reqStr, { metadata: body })
  return data
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }
  try {
    const params = event.queryStringParameters
    const body = JSON.parse(event.body as string)

    const validationResults = finalizePsypayParamsSchema.validate(params)

    if (validationResults.error) {
      return {
        statusCode: 400,
        body: JSON.stringify(validationResults.error),
      }
    }
    const campaignId = Number(params!.campaignId)
    const psypayTransactionId = Number(params!.psypayTransactionId)

    const result = (await reqFinalizePsypayTrx(
      { campaignId, psypayTransactionId },
      body
    )) as CreateFinalizeCampaignPsypayTransactionResponse

    const respBody = {
      result,
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(respBody),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
    }
  }
}
