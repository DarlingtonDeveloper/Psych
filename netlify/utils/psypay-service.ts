import { User } from "./get-user"
import axios, { AxiosRequestConfig } from "axios"
import {
  InsufficientClaimedPsy,
  PsyPayUserNotFound,
  PsyPayUserWalletAddressAlreadyExists,
  VendorNotAuthenticated,
} from "./psypay-service-error"
import { CreditPsyData, CreditPsyRes } from "./psypay"

const vendorSecretKey = process.env.NEXT_PSYPAY_VENDOR_KEY
const vendorName = process.env.NEXT_PSYPAY_VENDOR_NAME

export async function createPsyPayUser(walletAddress: User["walletAddress"]) {
  const reqStr = `${process.env.NEXT_PUBLIC_PSYPAY_SERVICE_API_BASE_URL}/users/${walletAddress}?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}`

  const config: AxiosRequestConfig = {
    method: "post",
    url: reqStr,
    data: {},
  }
  await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      if (error.response.status === 403) {
        throw new VendorNotAuthenticated()
      } else if (error.response.status === 411) {
        throw new PsyPayUserWalletAddressAlreadyExists()
      } else {
        throw error
      }
    })
}

export async function getPsypayUser(walletAddress: User["walletAddress"]) {
  const reqStr = `${process.env.NEXT_PUBLIC_PSYPAY_SERVICE_API_BASE_URL}/users/${walletAddress}?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}`
  try {
    const response = await axios.get(reqStr)
    return response.data
  } catch (error) {
    if (error.response.status === 404) {
      throw new PsyPayUserNotFound()
    } else if (error.response.status === 403) {
      throw new VendorNotAuthenticated()
    }
    throw error
  }
}

export async function claimPsy(walletAddress: User["walletAddress"]) {
  const reqStr = `${process.env.NEXT_PUBLIC_PSYPAY_SERVICE_API_BASE_URL}/users/psy/claim/${walletAddress}?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}`

  const config: AxiosRequestConfig = {
    method: "post",
    url: reqStr,
    data: {},
  }

  await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      if (error.response.status === 403) {
        throw new VendorNotAuthenticated()
      } else {
        throw error
      }
    })
}

export async function creditPsy(data: CreditPsyData): Promise<CreditPsyRes> {
  const reqStr = `${process.env.NEXT_PUBLIC_PSYPAY_SERVICE_API_BASE_URL}/users/psy/credit?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}&walletAddress=${data.walletAddress}&amount=${data.amount}&metadata=${data.metadata}`

  const config: AxiosRequestConfig = {
    method: "post",
    url: reqStr,
    data: {},
  }

  const res = await axios(config)
    .then(function (response) {
      const res: CreditPsyRes = response.data
      return res
    })
    .catch(function (error) {
      if (error.response.status === 403) {
        throw new VendorNotAuthenticated()
      }
      if (error.response.status === 406) {
        throw new InsufficientClaimedPsy()
      } else {
        throw error
      }
    })
  return res
}

interface UpdatePsyBalanceData {
  walletAddress: string
  amount: number
  metadata: string
}

interface UpdatePsyBalanceResponse {
  success: boolean
  message: string
  data: any
}

export async function updatePsyBalance(data: UpdatePsyBalanceData): Promise<UpdatePsyBalanceResponse> {
  console.log("Calling updatePsyBalance with data:", JSON.stringify(data))

  if (!vendorName || !vendorSecretKey || !apiBaseUrl) {
    throw new Error("Missing required environment variables for updatePsyBalance")
  }

  const reqStr = `${apiBaseUrl}/users/psy/credit?vendorName=${vendorName}&vendorSecretKey=${vendorSecretKey}&walletAddress=${data.walletAddress}&amount=${data.amount}&metadata=${encodeURIComponent(data.metadata)}`

  console.log("API request URL (with sensitive info redacted):", reqStr.replace(vendorSecretKey, "REDACTED"))

  const config: AxiosRequestConfig = {
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
      data: response.data
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
      data: null
    }
  }
}
