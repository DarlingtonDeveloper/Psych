import { Handler } from "@netlify/functions"
import axios from "axios"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
})
const BASE_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/`

const getOwnedContract = async (
  ownerAddress: string,
  contractAddress: string
): Promise<string[]> => {
  const response = await axios.get(
    `${BASE_URL}?owner=${ownerAddress}&contractAddresses[]=${contractAddress}`
  )

  return response.data.ownedNfts.reduce(
    (acc, cum) => [...acc, parseInt(cum.id.tokenId)],
    []
  )
}

export const handler: Handler = async (event) => {
  const params = event.queryStringParameters
  const validationResults = walletEndpointSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify(validationResults.error),
    }
  }

  const ownerAddress = params?.ownerAddress

  try {
    let ownedPapp = []
    let ownedC1 = []
    let ownedC2 = []
    let ownedC3 = []

    Promise.all([
      (ownedPapp = await getOwnedContract(
        ownerAddress,
        process.env.NEXT_PUBLIC_PAPP_ADDRESS
      )),
      (ownedC1 = await getOwnedContract(
        ownerAddress,
        process.env.NEXT_PUBLIC_C1_ADDRESS
      )),
      (ownedC2 = await getOwnedContract(
        ownerAddress,
        process.env.NEXT_PUBLIC_C2_ADDRESS
      )),
      (ownedC3 = await getOwnedContract(
        ownerAddress,
        process.env.NEXT_PUBLIC_C3_ADDRESS
      )),
    ])

    if (ownedC1.length === 0 || ownedC2.length === 0 || ownedC3.length === 0) {
      return {
        headers,
        statusCode: 403,
        body: JSON.stringify({
          message: "Must at least own one valid set of C1,C2, and C3.",
        }),
      }
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        pappIds: ownedPapp,
        c1Ids: ownedC1,
        c2Ids: ownedC2,
        c3Ids: ownedC3,
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong in fetching owned tokens.",
      }),
    }
  }
}
