import { Handler } from "@netlify/functions"
import axios from "axios"
import Joi from "joi"
import psilocybinTraits from "../../lib/psilocybinfinaltraits.json"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const walletEndpointSchema = Joi.object({
  ownerAddress: Joi.string().alphanum().min(26).required(),
  tokenType: Joi.string().valid("genesis", "psilocybin", "c1"),
  pageSize: Joi.number().integer().min(0),
  pageKey: Joi.string(),
})

const GenesisAddress = process.env.NEXT_PUBLIC_GENESIS_ADDRESS as string
const PsilocybinAddress = process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
const C1Address = process.env.NEXT_PUBLIC_C1_ADDRESS as string

const ADDRESS_MAPPING = {
  genesis: GenesisAddress,
  psilocybin: PsilocybinAddress,
  c1: C1Address,
}
type OwnedTokensPreview = {
  preview: string
  tokenId: number
  tokenType: "genesis" | "psilocybin" | "c1"
}

const GenesisCollectionPreview = "https://new-dawn-assets.b-cdn.net/preview.jpg"
const C1CDNUrl =
  "https://psychedelicsanonymous-assets.b-cdn.net/component-1.png"
const PsilocybinCDNUrl = "https://psychedelicsanonymous-assets.b-cdn.net/"

async function generatePreview(
  tokenType: "genesis" | "psilocybin" | "c1",
  tokenId: number
) {
  if (tokenType === "genesis") {
    const gp = await getGenesisPreview(tokenType, tokenId)
    if (gp) {
      return gp
    } else {
      return GenesisCollectionPreview
    }
  } else if (tokenType === "psilocybin") {
    return `${PsilocybinCDNUrl}psilocybin-${psilocybinTraits[
      tokenId - 1
    ].attributes[1].value.toLowerCase()}.png`
  } else if (tokenType === "c1") {
    return C1CDNUrl
  }
}

async function getGenesisPreview(tokenType, tid) {
  const requestString = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTMetadata/?contractAddress=${ADDRESS_MAPPING[tokenType]}&tokenId=${tid}`
  const result = await axios.get(requestString)

  if (result.data) {
    try {
      if (result.data.metadata.image) {
        return result.data.metadata.image
      }
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
  const validationResults = walletEndpointSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify(validationResults.error),
    }
  }

  const { ownerAddress } = validationResults.value
  let requestString = ""
  try {
    if (!!params!.tokenType) {
      const tokenType = params!.tokenType
      requestString = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/?owner=${ownerAddress}&contractAddresses[]=${ADDRESS_MAPPING[tokenType]}`
    } else {
      requestString = `${process.env.NEXT_PUBLIC_ENDPOINT}/getNFTs/?owner=${ownerAddress}&contractAddresses[]=${ADDRESS_MAPPING["genesis"]}&contractAddresses[]=${ADDRESS_MAPPING["c1"]}&contractAddresses[]=${ADDRESS_MAPPING["psilocybin"]}`
    }
    if (!!params!.pageSize) {
      requestString = requestString + `&pageSize=${params!.pageSize}`
    }
    if (!!params!.pageKey) {
      requestString = requestString + `&pageKey=${params!.pageKey}`
    }

    const result = await axios.get(requestString)

    const ownedTokens = result.data.ownedNfts.map((nft) => {
      const addressMappingEntry = Object.entries(ADDRESS_MAPPING).find(
        ([key, value]) =>
          value.toLowerCase() === nft.contract.address.toLowerCase()
      )
      return {
        tid: +nft.id.tokenId,
        contractAddress: nft.contract.address,
        tokenType: addressMappingEntry![0],
      }
    })

    const projectedData: OwnedTokensPreview[] = await Promise.all(
      ownedTokens.map(async (token) => {
        const curPreview = await generatePreview(token.tokenType, token.tid)
        if (curPreview) {
          return {
            preview: curPreview,
            tokenId: token.tid,
            tokenType: token.tokenType,
          }
        }
      })
    ).then((data) => data.filter((obj) => obj !== undefined))

    let respBody: {
      projectedData: OwnedTokensPreview[]
      totalCount: number
      pageKey?: string
    } = {
      projectedData,
      totalCount: result.data.totalCount,
    }
    if (result.data.pageKey) {
      respBody.pageKey = result.data.pageKey
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
