import { ethers } from "ethers"
import { useCallback, useEffect, useRef, useState } from "react"
import { Wallet } from "../components/Mint/types"
import {
  GenesisCart,
  GenesisConstants,
  MintFailure,
  NFTItemType,
} from "../lib/nft/types"
import {
  createMerkleTree,
  getConstants,
  getGenesisContract,
  getMerchContract,
  getMetaContract,
  getUtilityContract,
  mint,
  mintGenesisSoldOut,
} from "../lib/nft/utils"
import whitelist from "../lib/whitelist.json"

interface MintFnParams {
  presale: boolean
}

interface MintState {
  loading: boolean
  error: string
  success: boolean
}

type useGenesisFn = [
  MintState,
  GenesisConstants | undefined,
  MintFailure[],
  (params: MintFnParams) => void,
  (pass: NFTItemType, amount: number) => void,
  {
    resetMintStatus: () => void
    fetchConstants: () => void
  }
]

const useGenesis = (
  wallet: Wallet | undefined,
  cart: GenesisCart,
  onMintSuccess: () => void,
  onMintError: () => void
): useGenesisFn => {
  const [mintStatus, setMintStatus] = useState<MintState>({
    loading: false,
    error: "",
    success: false,
  })
  const providerRef = useRef(
    new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ENDPOINT)
  )
  const [genesisContract] = useState<ethers.Contract>(
    getGenesisContract(providerRef.current)
  )
  const [merchContract] = useState<ethers.Contract>(
    getMerchContract(providerRef.current)
  )
  const [metaContract] = useState<ethers.Contract>(
    getMetaContract(providerRef.current)
  )
  const [utilityContract] = useState<ethers.Contract>(
    getUtilityContract(providerRef.current)
  )

  const [constants, setConstants] = useState<GenesisConstants>()
  const [failures, setFailures] = useState<MintFailure[]>([])

  const contractMap = {
    [NFTItemType.GENESIS]: genesisContract,
    [NFTItemType.MERCH_PASS]: merchContract,
    [NFTItemType.META_PASS]: metaContract,
    [NFTItemType.UTILITY_PASS]: utilityContract,
  }

  const resetMintStatus = () => {
    setMintStatus({
      loading: false,
      success: false,
      error: "",
    })
    setFailures([])
  }

  const fetchConstants = useCallback(async () => {
    const constants = await getConstants(
      genesisContract,
      merchContract,
      metaContract,
      utilityContract
    )
    setConstants(constants)
  }, [genesisContract, merchContract, metaContract, utilityContract])

  const mintNft = async ({ presale = false }: MintFnParams) => {
    if (genesisContract && wallet && constants) {
      const merkleTree = presale ? createMerkleTree(whitelist) : null

      try {
        setMintStatus({
          loading: true,
          success: false,
          error: "",
        })
        const transaction = await mint(
          genesisContract,
          merkleTree,
          wallet.signer,
          constants,
          cart
        )
        await transaction.wait()
        setMintStatus({
          loading: false,
          success: true,
          error: "",
        })
        onMintSuccess()
      } catch (e: any) {
        setMintStatus({
          loading: false,
          success: false,
          error:
            e?.error?.message ||
            "Something went wrong. Unable to mint. You might have rejected the transaction.",
        })
        onMintError()
      }
    }
  }

  const mintPass = async (pass: NFTItemType, amount: number) => {
    if (wallet && constants) {
      try {
        setMintStatus({
          loading: true,
          success: false,
          error: "",
        })
        const transaction = await mintGenesisSoldOut(
          contractMap[pass],
          amount,
          wallet.signer,
          constants.prices[pass].mul(amount)
        )
        await transaction.wait()
        setMintStatus({
          loading: false,
          success: true,
          error: "",
        })
        onMintSuccess()
      } catch (e: any) {
        setMintStatus({
          loading: false,
          success: false,
          error:
            e?.error?.message ||
            "Something went wrong. Unable to mint. You might have rejected the transaction.",
        })
        onMintError()
      }
    }
  }

  useEffect(() => {
    fetchConstants()
  }, [fetchConstants])

  useEffect(() => {
    genesisContract.on("MintFailure", (address, failure) => {
      if (address === wallet?.address) {
        setFailures((fs) => {
          if (fs.includes(failure)) {
            return fs
          }
          return [...fs, failure]
        })
      }
    })
  }, [genesisContract, wallet?.address])

  const statusControls = {
    resetMintStatus,
    fetchConstants,
  }

  return [mintStatus, constants, failures, mintNft, mintPass, statusControls]
}

export default useGenesis
