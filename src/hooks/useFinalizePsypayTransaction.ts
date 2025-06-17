import axios, { AxiosError } from "axios"
import {
  CapturePsypayCampaignOrderParams,
  CapturePsypayCampaignOrderBody,
  CreateFinalizeCampaignPsypayTransactionResponse,
} from "../utils/psypay"

async function createFinalizeCampaignPsypayTransaction(
  params: CapturePsypayCampaignOrderParams,
  body: CapturePsypayCampaignOrderBody
): Promise<CreateFinalizeCampaignPsypayTransactionResponse> {
  const { data } = await axios.post(
    "/.netlify/functions/finalize-psypay-transaction",
    body,
    { params }
  )
  return data
}

const useFinalizePsypayTransaction = (
  options: { onError?: (error: AxiosError) => void } = {}
) => {
  const { onError } = options

  const handleFinalizePsypayTransaction = async (
    params: CapturePsypayCampaignOrderParams,
    body: CapturePsypayCampaignOrderBody
  ) => {
    try {
      const data = await createFinalizeCampaignPsypayTransaction(params, body)
      return data
    } catch (error: any) {
      if (onError) {
        onError(error)
      }
      throw error
    }
  }

  return { handleFinalizePsypayTransaction }
}

export default useFinalizePsypayTransaction
