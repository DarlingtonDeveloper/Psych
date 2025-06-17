import { Handler } from "@netlify/functions"
import axios from "axios"
import Joi from "joi"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
})
const BASE_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/`
const IRL_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MERCH_NFT_ADDRESS

const getOwnedIRL = async (ownerAddress: string): Promise<number[]> => {
  const response = await axios.get(
    `${BASE_URL}?owner=${ownerAddress}&contractAddresses[]=${IRL_CONTRACT_ADDRESS}`
  )

  return response.data.ownedNfts.reduce(
    (acc, cum) => [...acc, parseInt(cum.id.tokenId)],
    []
  )
}

type GetFaunaType = {
  data: Array<{
    data: {
      token: string
    }
  }>
}

const getRegisteredTokens = async (
  ownedTokens: number[]
): Promise<number[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })
  const matches = ownedTokens.map((ot) =>
    q.Match(q.Index("irl-claims-by-token"), ot)
  )

  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Union(...matches)),
      q.Lambda("claim", q.Get(q.Var("claim")))
    )
  )
  await serverClient.close()

  return response.data.map((d) => d.data.token)
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
    const irlTokens = await getOwnedIRL(ownerAddress)
    if (irlTokens.length === 0) {
      return {
        headers,
        statusCode: 403,
        body: JSON.stringify({
          message: "You don't own an IRL Pass.",
        }),
      }
    }

    /*const registeredTokens = new Set(await getRegisteredTokens(irlTokens))
    const unregisteredTokens = irlTokens.filter(
      (ot) => !registeredTokens.has(ot)
    )
    if (unregisteredTokens.length === 0) {
      return {
        headers,
        statusCode: 403,
        body: JSON.stringify({
          message:
            "You have no eligible Psychedelics Anonymous IRL Passes available",
        }),
      }
    }*/

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(irlTokens),
    }
  } catch (error) {
    console.error(error)
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong in fetching owned irl tokens.",
      }),
    }
  }
}
