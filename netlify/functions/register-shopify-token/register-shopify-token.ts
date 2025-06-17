import { Handler } from "@netlify/functions"
import camelcaseKeys from "camelcase-keys"
import faunadb, { query as q } from "faunadb"
import Joi from "joi"
import { ethers } from "ethers"
import axios from "axios"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface FormRegistrationData {
  signature: string
  address: string
  token: number
}

interface ShopifyRegistration {
  id: string
  code: string
}

interface FormRegistrationWithCode extends FormRegistrationData {
  code: string
}

type GetCodeFaunaType = {
  data: Array<{
    data: { code: string }
  }>
}

type GetFaunaType = {
  data: Array<{
    data: ShopifyRegistration
  }>
}

const formRegistrationData = Joi.object({
  signature: Joi.string().max(500).required(),
  address: Joi.string().max(100).required(),
})

const BASE_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/`
const GENESIS_ENUM = 0

const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const stakingContract = new ethers.Contract(
  "0x73555A153d301d95A3f90919e645D301F1f9E219",
  [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "enum PAStaker.TokenTypes",
          name: "_tokenType",
          type: "uint8",
        },
      ],
      name: "getStakedTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  rpcProvider
)

type GetRegisteredTokenFauna = {
  data: Array<{
    data: {
      token: string
    }
  }>
}

const getCode = async (tokenId: string): Promise<string> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetCodeFaunaType>(
    q.Map(
      q.Paginate(q.Match(q.Index("shopify-codes-by-tokenid"), tokenId), {
        size: 1,
      }),
      q.Lambda("shopify-codes", q.Get(q.Var("shopify-codes")))
    )
  )
  await serverClient.close()

  return response.data[0].data.code
}

const getRegisteredTokens = async (
  ownedTokens: string[]
): Promise<number[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  const matches = ownedTokens.map((ot) =>
    q.Match(q.Index("shopify-registrations-by-token"), ot)
  )

  const response = await serverClient.query<GetRegisteredTokenFauna>(
    q.Map(
      q.Paginate(q.Union(...matches)),
      q.Lambda("registrant", q.Get(q.Var("registrant")))
    )
  )
  await serverClient.close()
  return response.data.map((d) => +d.data.token)
}

const getOwnedGenesis = async (ownerAddress: string): Promise<number[]> => {
  const response = await axios.get(
    `${BASE_URL}?owner=${ownerAddress}&contractAddresses[]=0x75e95ba5997eb235f40ecf8347cdb11f18ff640b`
  )

  return response.data.ownedNfts.map(
    (nft: { id: { tokenId: string | number } }) => +nft.id.tokenId
  )
}

const getOwnedTokens = async (ownerAddress: string) => {
  const ownedGenesisIds = await getOwnedGenesis(ownerAddress)
  const stakedGenesisIds = await stakingContract.getStakedTokens(
    ownerAddress,
    GENESIS_ENUM
  )

  const genesisIds = Array.from(
    new Set([
      ...ownedGenesisIds,
      ...stakedGenesisIds.map((tid: string) => +tid),
    ])
  )

  const registeredTokens = new Set(await getRegisteredTokens(genesisIds))
  const unregisteredTokens = genesisIds.filter(
    (ot) => !registeredTokens.has(ot)
  )

  return unregisteredTokens
}

const getWalletCode = async (address: string): Promise<string> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(
        q.Match(q.Index("shopify-registrations-by-wallet-address"), address),
        { size: 1 }
      ),
      q.Lambda("state", q.Get(q.Var("state")))
    )
  )
  await serverClient.close()
  return response.data.length > 0 ? response.data[0].data.code : ""
}

const postFaunaData = async (data: FormRegistrationWithCode) => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  await serverClient.query(
    q.Create(q.Collection("shopify-registrations"), {
      data: camelcaseKeys(data, { deep: true }),
    })
  )
  await serverClient.close()
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
    "Get your code for shopify access.",
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
    const existingCode = await getWalletCode(verifiedAddress)
    if (existingCode) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ code: existingCode }),
      }
    }

    const ownedTokens = await getOwnedTokens(verifiedAddress)
    if (ownedTokens.length === 0) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          message: "You don't owned a valid genesis or staked genesis.",
        }),
      }
    }

    const code = await getCode(ownedTokens[0])

    await postFaunaData({
      ...validationResults.value,
      token: ownedTokens[0],
      code,
    })
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ code }),
    }
  } catch (err) {
    console.log(err)
    if (err.description === "document is not unique.") {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          message: "Wallet or genesis token already has a registration.",
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
