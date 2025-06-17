import { Handler } from "@netlify/functions"
import Joi from "joi"
import axios from "axios"
import {
  PsyPayUserNotFound,
  VendorNotAuthenticated,
  InsufficientClaimedPsy,
} from "../../utils/psypay-service-error"
import { getPsypayUser } from "../../utils/psypay-service"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const transferPsySchema = Joi.object({
  walletAddress: Joi.string().required(),
  recipientAddress: Joi.string().required(),
  amount: Joi.number().integer().positive().required(),
})

const vendorName = process.env.NEXT_PSYPAY_VENDOR_NAME
const vendorSecretKey = process.env.NEXT_PSYPAY_VENDOR_KEY
const apiBaseUrl = process.env.NEXT_PUBLIC_PSYPAY_SERVICE_API_BASE_URL

if (!vendorName || !vendorSecretKey || !apiBaseUrl) {
  console.error("Missing required environment variables:", {
    vendorName: !!vendorName,
    vendorSecretKey: !!vendorSecretKey,
    apiBaseUrl: !!apiBaseUrl,
  })
}

async function updatePsyBalance(data: {
  walletAddress: string
  amount: number
  metadata: string
}): Promise<{ success: boolean; message: string; data: any }> {
  console.log("Calling updatePsyBalance with data:", JSON.stringify(data))

  if (!vendorName || !vendorSecretKey || !apiBaseUrl) {
    throw new Error(
      "Missing required environment variables for updatePsyBalance"
    )
  }

  const reqStr = `${apiBaseUrl}/users/psy/credit?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}&walletAddress=${
    data.walletAddress
  }&amount=${data.amount}&metadata=${encodeURIComponent(data.metadata)}`

  console.log(
    "API request URL (with sensitive info redacted):",
    reqStr.replace(vendorSecretKey, "REDACTED")
  )

  const config = {
    method: "post",
    url: reqStr,
    data: {},
  }

  try {
    const response = await axios(config)
    console.log("updatePsyBalance response:", JSON.stringify(response.data))
    return {
      success: true,
      message: "Operation successful",
      data: response.data,
    }
  } catch (error) {
    console.error("updatePsyBalance error:", error)
    if (axios.isAxiosError(error)) {
      console.error("Error response:", JSON.stringify(error.response?.data))
      console.error("Error status:", error.response?.status)
      console.error("Error headers:", JSON.stringify(error.response?.headers))
    }
    if (error.response?.status === 403) {
      throw new VendorNotAuthenticated()
    }
    if (error.response?.status === 406) {
      throw new InsufficientClaimedPsy()
    }
    return {
      success: false,
      message: error.message || "Operation failed",
      data: null,
    }
  }
}

export const handler: Handler = async (event) => {
  console.log("Received event:", JSON.stringify(event))

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    }
  }

  try {
    const body = JSON.parse(event.body as string)
    console.log("Parsed body:", JSON.stringify(body))

    const validationResults = transferPsySchema.validate(body)

    if (validationResults.error) {
      console.error("Validation error:", validationResults.error)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: validationResults.error.details[0].message,
        }),
      }
    }

    console.log("Fetching existing user")
    const existingUser = await getPsypayUser(body.walletAddress.toLowerCase())
    if (!existingUser) {
      console.error("User not found")
      throw new PsyPayUserNotFound()
    }

    console.log("Crediting to recipient")
    const creditRes = await updatePsyBalance({
      walletAddress: body.recipientAddress.toLowerCase(),
      amount: -body.amount,
      metadata: JSON.stringify({
        action: "transfer",
        sender: body.walletAddress.toLowerCase(),
      }),
    })

    if (!creditRes.success) {
      console.error("Credit failed:", creditRes.message)
      console.log("Reverting debit")
      await updatePsyBalance({
        walletAddress: body.walletAddress.toLowerCase(),
        amount: -body.amount,
        metadata: JSON.stringify({
          action: "revert_transfer",
          recipient: body.recipientAddress.toLowerCase(),
        }),
      })
      throw new Error(creditRes.message)
    }

    console.log("Debiting from sender")
    const debitRes = await updatePsyBalance({
      walletAddress: body.walletAddress.toLowerCase(),
      amount: body.amount,
      metadata: JSON.stringify({
        action: "transfer",
        recipient: body.recipientAddress.toLowerCase(),
      }),
    })

    if (!debitRes.success) {
      console.error("Debit failed:", debitRes.message)
      throw new Error(debitRes.message)
    }

    console.log("Transfer successful")
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "PSY transfer successful, please refresh",
        details: {
          from: body.walletAddress.toLowerCase(),
          to: body.recipientAddress.toLowerCase(),
          amount: body.amount,
        },
        debitData: debitRes.data,
        creditData: creditRes.data,
      }),
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    if (
      error instanceof PsyPayUserNotFound ||
      error instanceof VendorNotAuthenticated ||
      error instanceof InsufficientClaimedPsy
    ) {
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify({
          message: error.message,
        }),
      }
    } else if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status || 500,
        headers,
        body: JSON.stringify({
          message: "API request failed",
          error: error.response?.data || error.message,
        }),
      }
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: "Something went wrong. Please try again.",
          error: error.message,
        }),
      }
    }
  }
}
