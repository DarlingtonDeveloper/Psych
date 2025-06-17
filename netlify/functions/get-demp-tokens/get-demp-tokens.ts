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

const PSILOCYBIN_ADDRESS = process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
const META_ADDRESS = process.env.NEXT_PUBLIC_META_NFT_ADDRESS as string
const IRL_ADDRESS = process.env.NEXT_PUBLIC_MERCH_NFT_ADDRESS as string

const getOwnedContract = async (
  ownerAddress: string,
  contractAddress: string
): Promise<number[]> => {
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

  const ownerAddress = params?.ownerAddress as string

  try {
    let ownedPsilocybin = [] as number[]
    let ownedMeta = [] as number[]
    let ownedIRL = [] as number[]

    Promise.all([
      (ownedPsilocybin = await getOwnedContract(
        ownerAddress,
        PSILOCYBIN_ADDRESS
      )),
      (ownedMeta = await getOwnedContract(ownerAddress, META_ADDRESS)),
      (ownedIRL = await getOwnedContract(ownerAddress, IRL_ADDRESS)),
    ])

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        psilocybin: ownedPsilocybin,
        meta: ownedMeta,
        irl: ownedIRL,
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
