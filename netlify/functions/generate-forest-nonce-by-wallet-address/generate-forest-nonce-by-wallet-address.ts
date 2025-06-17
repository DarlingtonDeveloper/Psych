import { Handler } from "@netlify/functions"
import { v4 as uuidv4 } from "uuid"
import { getUser, updateUser, addUser } from "../../utils/get-user"
import Joi from "joi"
import { createPsyPayUser } from "../../utils/psypay-service"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const genNonceEndpointSchema = Joi.object({
  walletAddress: Joi.string().alphanum().required(),
})

export const handler: Handler = async (event) => {
  const params = event.queryStringParameters
  const validationResults = genNonceEndpointSchema.validate(params)

  if (validationResults.error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationResults.error,
      }),
    }
  }

  const walletAddress = event.queryStringParameters!.walletAddress

  try {
    const ret = await getUser(walletAddress!)
    const nonce = uuidv4()

    if (!ret.length) {
      await addUser(walletAddress!, nonce)
      await createPsyPayUser(walletAddress!)
    } else {
      await updateUser(walletAddress!, nonce)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ nonce: nonce }),
      }
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Something went wrong. Please try again.",
      }),
    }
  }
}
