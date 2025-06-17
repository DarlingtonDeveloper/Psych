import { Handler } from "@netlify/functions"
import axios from "axios"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const PsypackCampaignsAddress = `${process.env.NEXT_PUBLIC_ND_API_BASE_URL}/campaigns`

interface Pack {
  available: number
  maxQuantity: number
  minQuantity: number
  price: number
  name: string
  preview: string
  htmlInclusions: string
  color: string
  soldout: boolean
  textLogo: boolean
}
interface Campaign {
  id: number
  name: string
  description: string
  currency: string
  packs: Pack[]
}

const psypackCampaignSchema = Joi.object({
  campaignId: Joi.number().integer().min(0),
})

async function getPsypackCampaigns(campaignId: string) {
  const queryStr = `${PsypackCampaignsAddress}/${campaignId}`

  const result = await axios.get(queryStr)

  if (result.data) {
    try {
      return result.data
    } catch (error) {
      console.log("error: ", error)
      return ""
    }
  }
  return ""
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  const params = event.queryStringParameters
  const validationResults = psypackCampaignSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify(validationResults.error),
    }
  }
  try {
    const campaign = (await getPsypackCampaigns(
      params!.campaignId!
    )) as Campaign
    const respBody = {
      campaign,
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
