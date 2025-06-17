import React, { createContext, useContext, useState } from "react"
import { Wallet } from "../components/Mint/types"
import useGlobalConnect from "../hooks/useGlobalConnect"
import AUSTaxModal from "../components/PsyPoints/AUSTaxModal"
import AUSEzuTaxModal from "../components/AUSGSTEZUQuestionnaire/AUSEzuTaxModal"

import { useQuery } from "react-query"
import axios from "axios"
import { WalletStatus } from "../context/WalletProvider"
import jwt from "jsonwebtoken"
import { fromUnixTime, isAfter } from "date-fns"
export interface GlobalConnectStatus {
  connected: boolean
  isConnecting: boolean
}
type Session = string | null

export interface GlobalConnectControls {
  connectV2: () => Promise<void>
  connect: () => Promise<void>
  disconnect: () => void
}

export interface GlobalConnectHookReturn {
  wallet: Wallet | undefined
  walletStatus: WalletStatus
  globalConnectStatus: GlobalConnectStatus
  globalConnectSession: Session
  globalConnectControls: GlobalConnectControls
  userHasGST?: boolean
  userHasGSTEZU?: boolean
}

const defaultValues: GlobalConnectHookReturn = {
  wallet: undefined,
  walletStatus: { connected: false, error: null },
  globalConnectStatus: { connected: false, isConnecting: false },
  globalConnectSession: null,
  globalConnectControls: {
    connectV2: async () => {},
    connect: async () => {},
    disconnect: () => {},
  },
}

export const accessTokenIsValid = (
  accessToken: string,
  wallet: Wallet | undefined,
  connected: boolean
): boolean => {
  const { walletAddress, exp } = jwt.decode(accessToken) as {
    walletAddress: string
    exp: number
  }
  const hasExpired = isAfter(new Date(), fromUnixTime(exp))
  if (
    hasExpired ||
    (walletAddress !== wallet?.address.toLowerCase() && connected)
  ) {
    return false
  }
  return true
}

export const GlobalConnectContext =
  createContext<GlobalConnectHookReturn>(defaultValues)

const GlobalConnectProvider: React.FC = ({ children }) => {
  const globalConnectHook = useGlobalConnect()
  const { wallet, globalConnectStatus } = globalConnectHook
  const [showPATax, setShowPATax] = useState(false)
  const [showEZUTax, setShowEZUTax] = useState(false)

  const [additionalProps, setAdditionalProps] = useState({})

  useQuery(
    ["gstAnswered", wallet?.address.toLowerCase()],
    async () => {
      const response = await axios.get(
        "/.netlify/functions/get-psypoints-user-by-wallet-address",
        {
          params: {
            walletAddress: wallet?.address.toLowerCase(),
          },
        }
      )
      return response.data
    },
    {
      onSuccess: () => {
        setShowPATax(false)
        setAdditionalProps({ ...additionalProps, userHasGST: true })
      },
      onError: () => {
        setShowPATax(true)
      },
      enabled: globalConnectStatus.connected,
      retry: 0,
    }
  )

  useQuery(
    ["ezuGstAnswered", wallet?.address.toLowerCase()],
    async () => {
      const response = await axios.get(
        "/.netlify/functions/get-pa-user-ezu-questionnaire-by-wallet-address",
        {
          params: {
            walletAddress: wallet?.address.toLowerCase(),
          },
        }
      )
      return response.data
    },
    {
      onSuccess: () => {
        setShowEZUTax(false)
        setAdditionalProps({ ...additionalProps, userHasGSTEZU: true })
      },
      onError: () => {
        setShowEZUTax(true)
      },
      enabled: globalConnectStatus.connected,
      retry: 0,
    }
  )

  return (
    <GlobalConnectContext.Provider
      value={{ ...globalConnectHook, ...additionalProps }}
    >
      {children}
      <AUSTaxModal
        isOpen={showPATax}
        onToggle={() => {
          setShowPATax(false)
        }}
      />

      <AUSEzuTaxModal
        isOpen={showEZUTax && !showPATax}
        onToggle={() => {
          setShowEZUTax(false)
        }}
      />
    </GlobalConnectContext.Provider>
  )
}

export const useGlobalConnectContext = () => useContext(GlobalConnectContext)

export default GlobalConnectProvider
