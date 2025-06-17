import axios, { AxiosError } from "axios"
import { useGlobalConnectContext } from "../context/GlobalConnectProvider"
import { useQuery } from "react-query"
import useToast from "../hooks/useToast"

type PsyPointsResult = {
  claimedPoints: number
  unclaimedPoints: number
}

export const useGetUserPsypoints = () => {
  const { wallet, globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()
  const { showToast } = useToast()

  return useQuery(
    ["psyPoints", wallet?.address.toLowerCase()],
    async () => {
      const response = await axios.get<PsyPointsResult>(
        "/.netlify/functions/get-psypoints-user-points-by-wallet-address",
        {
          params: {
            walletAddress: wallet?.address.toLowerCase(),
          },
        }
      )
      return response.data
    },
    {
      enabled: globalConnectStatus.connected,
      onError: (error: AxiosError) => {
        showToast({
          description:
            error?.response?.data.message ||
            "Something went wrong. Please try again.",
        })
        const statusCode = error?.response?.status
        if (statusCode === 401 || statusCode === 403) {
          globalConnectControls.disconnect()
        }
      },
    }
  )
}
