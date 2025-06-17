import { Handler } from "@netlify/functions"
import axios from "axios"
import { ethers } from "ethers"
import Joi from "joi"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
})

const GENESIS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GENESIS_NFT_ADDRESS
const BASE_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/`

const GENESIS_ENUM = 0

const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const stakingContract = new ethers.Contract(
  process.env.NEXT_PUBLIC_STAKING_ADDRESS as string,
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
    {
      inputs: [
        {
          internalType: "enum PAStaker.TokenType",
          name: "_tokenType",
          type: "uint8",
        },
        {
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
      ],
      name: "batchTimeSinceStaked",
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

const getOwnedGenesis = async (ownerAddress: string): Promise<number[]> => {
  const response = await axios.get(
    `${BASE_URL}?owner=${ownerAddress}&contractAddresses[]=${GENESIS_CONTRACT_ADDRESS}`
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ eligibility: genesisIds.length > 0 }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
    }
  }
}
