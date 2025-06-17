import { Handler } from "@netlify/functions"
import axios from "axios"
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

const GenesisAddress = process.env.NEXT_PUBLIC_GENESIS_ADDRESS as string
const PsilocybinAddress = process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
const C1Address = process.env.NEXT_PUBLIC_C1_ADDRESS as string

const ADDRESS_MAPPING = {
  genesis: GenesisAddress,
  psilocybin: PsilocybinAddress,
  c1: C1Address,
}

const GenesisCDNUrl = "https://pa-genesis-previews.b-cdn.net/"
const C1CDNUrl =
  "https://psychedelicsanonymous-assets.b-cdn.net/component-1.png"
const PsilocybinCDNUrl = "https://psychedelicsanonymous-assets.b-cdn.net/"

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
  ],
  rpcProvider
)

const CONTRACT_ENUM_TOKEN_TYPE_MAPPING = {
  genesis: 0,
  c1: 1,
  psilocybin: 2,
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
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/?owner=${ownerAddress}&contractAddresses[]=${ADDRESS_MAPPING[tokenType]}`
    )

    const stakedTokenIds = await stakingContract.getStakedTokens(
      ownerAddress,
      CONTRACT_ENUM_TOKEN_TYPE_MAPPING[tokenType]
    )

    const stakedTokenIdsSet = new Set(stakedTokenIds.map((tid) => +tid))
    const ownedTokenIds = result.data.ownedNfts
      .map((nft) => +nft.id.tokenId)
      .filter((tid) => !stakedTokenIdsSet.has(tid))

    const projectedData = ownedTokenIds.map((tid) => ({
      preview: generatePreview(tokenType, tid),
      tokenId: tid,
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
