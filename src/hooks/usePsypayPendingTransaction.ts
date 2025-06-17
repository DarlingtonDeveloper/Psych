import axios, { AxiosError } from "axios"
import { createPsypayPendingTrxData } from "../utils/psypay"
import { GlobalConnectHookReturn } from "../context/GlobalConnectProvider"

async function createPsypayPendingTransaction(
  session: GlobalConnectHookReturn["globalConnectSession"],
  body: createPsypayPendingTrxData
): Promise<any> {
  const { data } = await axios.post(
    "/.netlify/functions/create-psypay-pending-transaction",
    body,
    {
      headers: {
        authorization: `Bearer ${session}`,
      },
    }
  )

  return data
}

const usePsypayPendingTransaction = (
  options: { onError?: (error: AxiosError) => void } = {}
) => {
  const { onError } = options

  const handleCreatePendingTrx = async (
    session: GlobalConnectHookReturn["globalConnectSession"],
    body: createPsypayPendingTrxData
  ) => {
    try {
      const data = await createPsypayPendingTransaction(session, body)
      return data
    } catch (error: any) {
      if (onError) {
        onError(error)
      }
      throw error
    }
  }

  return { handleCreatePendingTrx }
}

export default usePsypayPendingTransaction
