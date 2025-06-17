import { ethers, providers } from "ethers"
import { useCallback, useEffect, useState, useRef } from "react"
import { Wallet } from "../components/Mint/types"
import { EthereumProvider } from "@walletconnect/ethereum-provider"
import Fortmatic from "fortmatic"
import Web3Modal from "web3modal"
import Authereum from "authereum"
import { WalletHookReturn, WalletStatus } from "../context/WalletProvider"
import { useWeb3Modal } from "@web3modal/react"
import {
  type WalletClient,
  useWalletClient,
  useDisconnect,
  useAccount,
} from "wagmi"

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

enum Error {
  WRONG_NETWORK = "You are on the wrong network. Please connect to the Ethereum Mainnet.",
  WALLET_FAILED = "Something went wrong in connecting to your wallet. Please try again.",
  WAGMI_DISCONNECT_ERROR = "Something went wrong while disconnecting your wallet.",
}

const ETHEREUM_MAINNET_CHAIN_ID = 1

export default function useWallet(): WalletHookReturn {
  const [wallet, setWallet] = useState<Wallet>()
  const [walletAddress, setWalletAddress] = useState<string>()
  const [error, setError] = useState<Error | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const web3ModalRef = useRef<Web3Modal | null>(null)
  const { open } = useWeb3Modal()
  const { data: walletClient } = useWalletClient({
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID as string),
  })

  const { disconnect } = useDisconnect()

  const connectWalletV2 = useCallback(async () => {
    setError(null)
    try {
      await open()
    } catch (e) {
      console.error(e)
      setError(Error.WALLET_FAILED)
    }
  }, [open, setError])

  const disconnectWalletV2 = useCallback(async () => {
    try {
      await disconnect()
      setWalletAddress(undefined)
      setWallet(undefined)
      setConnected(false)
    } catch (error) {
      console.log(error)
      setError(Error.WAGMI_DISCONNECT_ERROR)
    }
  }, [setWallet, disconnect])

  useAccount({
    onConnect({ address }) {
      if (address && !wallet) {
        // set wallet and chain if onConnect was triggered with new account and wallet is still undefined (fresh)
        setWalletAddress(address.toString())
      } else if (address && wallet) {
        // watchAccount was triggered with changed account
        if (address !== wallet.address) {
          disconnectWalletV2()
        }
      }
    },
  })

  useEffect(() => {
    if (walletClient) {
      // chain changed
      if (walletClient.chain && wallet) {
        if (walletClient.chain.id !== wallet.chainId) {
          setError(Error.WRONG_NETWORK)
          disconnectWalletV2()
        }
      } else if (walletClient.chain && !wallet && walletAddress) {
        // initialize wallet
        const signer = walletClientToSigner(walletClient as WalletClient)

        if (
          walletClient.chain!.id ===
          (process.env.NEXT_PUBLIC_CHAIN_ID
            ? +process.env.NEXT_PUBLIC_CHAIN_ID
            : ETHEREUM_MAINNET_CHAIN_ID)
        ) {
          setWallet({
            address: walletAddress,
            chainId: walletClient.chain.id,
            signer,
          })
          setConnected(true)
        } else {
          setConnected(false)
          setError(Error.WRONG_NETWORK)
        }
      }
    }
  }, [walletAddress, wallet, walletClient, disconnectWalletV2])

  const createWeb3Modal = useCallback(async () => {
    const Torus = (await import("@toruslabs/torus-embed")).default
    // torus breaks SSR
    web3ModalRef.current = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: EthereumProvider as any,
          options: {
            projectId: "2a31adbf841b7810f284de155256adad",
            chains: [1],
            rpcMap: {
              1: "https://mainnet.infura.io/v3/7547f6f9661d41b690b85e496c487d15",
            },
            methods: [
              "eth_sendTransaction",
              "personal_sign",
              "eth_signTypedData",
            ],
            metadata: {
              name: "Psychedelics Anonymous",
              description: "Wallet connection for staking + claiming",
              url: "https://app.psychedelicsanonymous.com",
              icons: ["https://app.psychedelicsanonymous.com/icon.png"],
            },
          },
        },
        fortmatic: {
          package: Fortmatic,
          options: {
            key: process.env.NEXT_PUBLIC_FORTMATIC_KEY,
          },
        },
        torus: {
          package: Torus,
          options: {
            networkParams: {
              chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
              networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
            },
          },
        },
        authereum: {
          package: Authereum,
        },
      },
    })
  }, [])

  const connectWallet = useCallback(async () => {
    setError(null)
    try {
      const connection = await web3ModalRef.current!.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const { chainId } = await provider.getNetwork()

      provider.on("network", (_, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload()
        }
      })

      const wallet = {
        // provider,
        signer,
        address,
      }

      if (
        chainId ===
        (process.env.NEXT_PUBLIC_CHAIN_ID
          ? +process.env.NEXT_PUBLIC_CHAIN_ID
          : ETHEREUM_MAINNET_CHAIN_ID)
      ) {
        setWallet(wallet)
      } else {
        setError(Error.WRONG_NETWORK)
      }
      return wallet
    } catch (e) {
      console.error(e)
      setError(Error.WALLET_FAILED)
    }
  }, [setWallet, setError])

  const disconnectWallet = useCallback(() => {
    setWallet(undefined)
    if (web3ModalRef.current!.cachedProvider) {
      web3ModalRef.current!.clearCachedProvider()
    }
  }, [setWallet])

  const resetError = useCallback(() => {
    setError(null)
  }, [setError])

  const signMessage = useCallback(
    async (
      message: string,
      overrideWallet: Wallet | undefined = undefined
    ): Promise<string | undefined> => {
      const connectedWallet = overrideWallet || wallet
      const signature = await connectedWallet?.signer.signMessage(message)
      return signature
    },
    [wallet]
  )

  const status = { connected, error } as WalletStatus
  const walletControls = {
    createWeb3Modal,
    connectWallet,
    connectWalletV2,
    disconnectWalletV2,
    disconnectWallet,
    resetError,
    signMessage,
  }

  return [wallet, status, walletControls]
}
