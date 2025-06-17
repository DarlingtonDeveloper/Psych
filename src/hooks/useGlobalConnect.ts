import { useCallback, useState, useEffect, useContext } from "react"
import { useQuery } from "react-query"
import {
  GlobalConnectHookReturn,
  GlobalConnectStatus,
  accessTokenIsValid,
} from "../context/GlobalConnectProvider"
import { ForestStateContext } from "../context/ForestProvider"
import { sessionHandler } from "../utils/sessionStorage"
import { useWalletContext } from "../context/WalletProvider"
import axios from "axios"
import useToast from "../hooks/useToast"
import { useRouter } from "next/router"

enum Error {
  CONNECT_FAILED = "Something went wrong in connecting to your wallet and starting a session. Please try again.",
  SIGNING_FAILED = "Something went wrong during attempt of your wallet to sign message. Please try again.",
  SIGNATURE_VERIFICATION_FAILED = "Something went wrong during verification of your signature. Please try again.",
  ACCESS_TOKEN_INVALID = "Your access token is no longer valid. Please connect your wallet again.",
}

const useGlobalConnect = (): GlobalConnectHookReturn => {
  const router = useRouter()
  const [wallet, walletStatus, walletControls] = useWalletContext()
  const [session, setSession] = useState("")
  const [signature, setSignature] = useState("")
  const [connected, setConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [skipSigning, setSkipSigning] = useState(false)
  const [_, setSessionData] = useContext(ForestStateContext)

  const { showToast } = useToast()

  const resetConnection = useCallback(() => {
    setSkipSigning(false)
    setIsConnecting(false)
    setSignature("")
    walletControls.resetError()
    if (sessionHandler.getSession()) {
      const accessTokenValid = accessTokenIsValid(
        sessionHandler.getSession()!,
        wallet,
        connected
      )
      if (!accessTokenValid) {
        showToast({ description: Error.ACCESS_TOKEN_INVALID })
        setSession("")
        sessionHandler.removeSession()
        setSessionData({
          progress: 0,
          isAuthenticated: false,
        })
      }
    }
  }, [connected, showToast, wallet, walletControls, setSessionData])

  useEffect(() => {
    if (skipSigning && walletStatus.connected) {
      setConnected(true)
      setIsConnecting(false)
    }
  }, [walletStatus.connected, skipSigning])

  const connectV2 = useCallback(async () => {
    if (typeof sessionStorage !== "undefined") {
      try {
        if (sessionHandler.getSession()) {
          const accessTokenValid = accessTokenIsValid(
            sessionHandler.getSession()!,
            wallet,
            connected
          )
          if (accessTokenValid) {
            setSkipSigning(true)
            setSession(sessionHandler.getSession()!)
          } else {
            resetConnection()
          }
        } else {
          resetConnection()
        }
        setIsConnecting(true)
        await walletControls.connectWalletV2()
      } catch (e) {
        showToast({ description: Error.CONNECT_FAILED })
      }
    }
  }, [walletControls, showToast, connected, resetConnection, wallet])

  const connect = useCallback(async () => {
    if (typeof sessionStorage !== "undefined") {
      try {
        if (sessionHandler.getSession()) {
          const accessTokenValid = accessTokenIsValid(
            sessionHandler.getSession()!,
            wallet,
            connected
          )
          if (accessTokenValid) {
            setSkipSigning(true)
            setSession(sessionHandler.getSession()!)
          } else {
            resetConnection()
          }
        } else {
          resetConnection()
        }
        setIsConnecting(true)
        await walletControls.createWeb3Modal()
        await walletControls.connectWallet()
      } catch (e) {
        showToast({ description: Error.CONNECT_FAILED })
      }
    }
  }, [walletControls, showToast, connected, resetConnection, wallet])

  const disconnect = useCallback(() => {
    if (walletStatus.connected) {
      // walletControls.disconnectWallet()
      walletControls.disconnectWalletV2()
    }
    resetConnection()
    setConnected(false)
  }, [walletControls, walletStatus.connected, resetConnection])

  useEffect(() => {
    if (walletStatus.error) {
      showToast({ description: walletStatus.error })
    }
  }, [walletStatus.error, showToast])

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      if (connected && sessionHandler.getSession()) {
        const tokenValid = accessTokenIsValid(
          sessionHandler.getSession()!,
          wallet,
          connected
        )
        if (!tokenValid) {
          disconnect()
        }
      }
    }
  }, [connected, router, disconnect, wallet])

  useQuery(
    ["get-nonce-by-wallet", wallet?.address],
    async () => {
      const response = await axios.get<{ nonce: string }>(
        "/.netlify/functions/generate-forest-nonce-by-wallet-address",
        {
          params: { walletAddress: wallet?.address.toLowerCase() },
        }
      )
      return response.data
    },
    {
      onSuccess: async (data) => {
        if (!data?.nonce) {
          showToast({ description: Error.SIGNING_FAILED })
          disconnect()
        } else {
          try {
            const message = await walletControls.signMessage(
              "By connecting to the Psychedelics Anonymous platform and signing this message you are agreeing to our:\n\n" +
                "Privacy Policy: https://psychedelicsanonymous.com/privacypolicy\n\n" +
                "Terms & Conditions: https://psychedelicsanonymous.com/terms\n\n" +
                "PA NFT License: https://psychedelicsanonymous.com/nftlicense\n\n" +
                "EZU NFT License: https://ezu.xyz/nft-license\n\n" +
                "PSY Points Terms & Conditions: https://psychedelicsanonymous.com/psy-terms\n\n" +
                `wallet-address: ${wallet?.address.toLowerCase()}\n\n` +
                `nonce: ${data.nonce}`
            )
            if (message) {
              setSignature(message)
            }
          } catch (e: any) {
            showToast({ description: Error.SIGNING_FAILED })
            disconnect()
          }
        }
      },
      onError: () => {
        showToast({ description: Error.SIGNING_FAILED })
        disconnect()
      },
      enabled: walletStatus.connected && !skipSigning,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  )

  useQuery(
    ["verify-pa-signature", wallet?.address.toLowerCase(), signature],
    async () => {
      const response = await axios.get<{ accessToken: string }>(
        "/.netlify/functions/verify-pa-signature",
        {
          params: { walletAddress: wallet?.address.toLowerCase(), signature },
        }
      )

      return response.data
    },
    {
      onSuccess: (data) => {
        if (!data?.accessToken) {
          showToast({ description: Error.SIGNATURE_VERIFICATION_FAILED })
          disconnect()
        } else {
          sessionHandler.setSession(data.accessToken)
          setSession(data.accessToken)
          setConnected(true)
          setIsConnecting(false)
        }
      },
      onError: () => {
        showToast({ description: Error.SIGNATURE_VERIFICATION_FAILED })
        disconnect()
      },
      enabled: !!signature && !!wallet?.address && !skipSigning,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: 0,
    }
  )

  const status = { connected, isConnecting } as GlobalConnectStatus
  const globalConnectControls = {
    connectV2,
    connect,
    disconnect,
  }

  return {
    wallet: wallet,
    walletStatus: walletStatus,
    globalConnectStatus: status,
    globalConnectSession: session,
    globalConnectControls: globalConnectControls,
  }
}

export default useGlobalConnect
