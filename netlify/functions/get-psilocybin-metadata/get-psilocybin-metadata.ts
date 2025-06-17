import { Handler } from "@netlify/functions"
import { ethers } from "ethers"
import traits from "../../lib/psilocybinfinaltraits.json"
import PsylocybinNFT from "../../../src/lib/contracts/Psilocybin.json"

const PSILOCYBIN_CONTRACT_ADDRESS = "0x11ca9693156929ee2e7e1470c5e1a55b413e9007"
const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)
const contract = new ethers.Contract(
  PSILOCYBIN_CONTRACT_ADDRESS,
  PsylocybinNFT.abi,
  provider
)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const checkOwnerExists = async (id: number): Promise<boolean> => {
  try {
    await contract.ownerOf(id)
    return true
  } catch (error) {
    return false
  }
}

export const handler: Handler = async (event) => {
  const id = parseInt(event.path.split("/")[4])

  try {
    if (await checkOwnerExists(id)) {
      const trait = traits[id - 1]
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(trait),
      }
    } else {
      return {
        statusCode: 404,
        headers,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
    }
  }
}
