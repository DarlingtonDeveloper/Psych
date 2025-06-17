import { Handler } from "@netlify/functions"
import axios from "axios"
import { ethers } from "ethers"
import Joi from "joi"
import faunadb, { query as q } from "faunadb"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
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

type GetFaunaType = {
  data: Array<{
    data: {
      token: string
    }
  }>
}

const getRegisteredTokens = async (
  ownedTokens: string[]
): Promise<string[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  const matches = ownedTokens.map((ot) =>
    q.Match(q.Index("ezu-registrations-by-token"), ot)
  )

  const response = await serverClient.query<GetFaunaType>(
    q.Map(
      q.Paginate(q.Union(...matches)),
      q.Lambda("registrant", q.Get(q.Var("registrant")))
    )
  )
  await serverClient.close()

  return response.data.map((d) => d.data.token)
}

const getOwnedGenesis = async (ownerAddress: string): Promise<number[]> => {
  const response = await axios.get(
    `${BASE_URL}?owner=${ownerAddress}&contractAddresses[]=0x75e95ba5997eb235f40ecf8347cdb11f18ff640b`
  )

  return response.data.ownedNfts.map(
    (nft: { id: { tokenId: string | number } }) => +nft.id.tokenId
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ eligibleTokens: unregisteredTokens }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
    }
  }
}
