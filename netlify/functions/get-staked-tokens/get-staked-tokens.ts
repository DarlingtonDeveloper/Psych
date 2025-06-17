import { Handler } from "@netlify/functions"
import { ethers } from "ethers"
import Joi from "joi"
import psilocybinTraits from "../../lib/psilocybinfinaltraits.json"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
  tokenType: Joi.string().valid("genesis", "psilocybin", "c1").required(),
})

const GenesisCDNUrl = "https://pa-genesis-previews.b-cdn.net/"
const C1CDNUrl =
  "https://psychedelicsanonymous-assets.b-cdn.net/component-1.png"
const PsilocybinCDNUrl = "https://psychedelicsanonymous-assets.b-cdn.net/"

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

const CONTRACT_ENUM_TOKEN_TYPE_MAPPING = {
  genesis: 0,
  c1: 1,
  psilocybin: 2,
}

const generatePreview = (
  tokenType: "genesis" | "psilocybin" | "c1",
  tokenId: number
) => {
  if (tokenType === "genesis") {
    return `${GenesisCDNUrl}${tokenId}.jpg`
  } else if (tokenType === "psilocybin") {
    return `${PsilocybinCDNUrl}psilocybin-${psilocybinTraits[
      tokenId - 1
    ].attributes[1].value.toLowerCase()}.png`
  } else if (tokenType === "c1") {
    return C1CDNUrl
  }
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

  const { ownerAddress, tokenType } = validationResults.value

  try {
    const tokenIds = await stakingContract.getStakedTokens(
      ownerAddress,
      CONTRACT_ENUM_TOKEN_TYPE_MAPPING[tokenType]
    )

    const timeSinceInSeconds = await stakingContract.batchTimeSinceStaked(
      CONTRACT_ENUM_TOKEN_TYPE_MAPPING[tokenType],
      tokenIds
    )

    const projectedData = tokenIds.map((tid, index) => ({
      preview: generatePreview(tokenType, +tid),
      tokenId: +tid,
      daysStaked: Math.floor(timeSinceInSeconds[index] / 86400),
    }))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(projectedData),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      headers,
    }
  }
}
