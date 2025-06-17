import axios, { AxiosError } from "axios"
import { useGlobalConnectContext } from "../context/GlobalConnectProvider"
import { useMutation, useQueryClient } from "react-query"
import useToast from "../hooks/useToast"

export const useClaimPsypoints = () => {
  const { wallet, globalConnectControls } = useGlobalConnectContext()
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation(
    async () => {
      await axios.post("/.netlify/functions/claim-psypoints", {
        walletAddress: wallet?.address.toLowerCase(),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "psyPoints",
          wallet?.address.toLowerCase(),
        ])
        showToast({ description: "Successfully claimed PSY." })
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
