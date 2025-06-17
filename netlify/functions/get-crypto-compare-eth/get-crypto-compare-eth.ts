import { Handler } from "@netlify/functions"
import axios from "axios"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

export const handler: Handler = () => {
  return axios
    .get(
      `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`
    )
    .then(({ data }) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      }
    })
    .catch(() => {
      return {
        statusCode: 500,
      }
    })
}
