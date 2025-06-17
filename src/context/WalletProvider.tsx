import React, { createContext, useContext } from "react"
import { Wallet } from "../components/Mint/types"
import useWallet from "../hooks/useWallet"

export interface WalletStatus {
  connected: boolean
  error: string | null
}

export type WalletHookReturn = [
  Wallet | undefined,
  WalletStatus,
  {
    createWeb3Modal: () => Promise<Wallet | void>
    connectWallet: () => Promise<Wallet | void>
    connectWalletV2: () => Promise<Wallet | void | null>
    disconnectWallet: () => void
    disconnectWalletV2: () => void
    resetError: () => void
    signMessage: (
      message: string,
      overrideWallet?: Wallet
    ) => Promise<string | undefined>
  }
]

export const WalletContext = createContext<WalletHookReturn>([
  undefined,
  { connected: false, error: null },
  {
    createWeb3Modal: async () => {},
    connectWallet: async () => {},
    connectWalletV2: async () => {},
    disconnectWallet: () => {},
    disconnectWalletV2: () => {},
    resetError: () => {},
    signMessage: async (_message) => undefined,
  },
])

const WalletProvider: React.FC = ({ children }) => {
  const walletHook = useWallet()

  return (
    <WalletContext.Provider value={walletHook}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => useContext(WalletContext)

export default WalletProvider
