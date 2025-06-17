import axios, { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { useGlobalConnectContext } from "../../../context/GlobalConnectProvider"
import useToast from "../../../hooks/useToast"

interface TransferPsyParams {
  recipientAddress: string
  amount: number
}

export const usePsyTransfer = () => {
  const { wallet, globalConnectControls } = useGlobalConnectContext()
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation(
    async ({ recipientAddress, amount }: TransferPsyParams) => {
      await axios.post("/.netlify/functions/transfer-psypoints", {
        walletAddress: wallet?.address.toLowerCase(),
        recipientAddress: recipientAddress.toLowerCase(),
        amount,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "psyPoints",
          wallet?.address.toLowerCase(),
        ])
        showToast({ description: "Successfully transferred PSY." })
      },
      onError: (error: AxiosError) => {
        const statusCode = error?.response?.status
        showToast({
          description:
            error?.response?.data.message ||
            "Something went wrong. Please try again.",
        })
        if (statusCode === 401 || statusCode === 403) {
          globalConnectControls.disconnect()
        }
      },
    }
  )
}
