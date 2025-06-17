import axios from "axios"
import { ethers } from "ethers"
import { useState } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { Wallet } from "../components/Mint/types"
import {
  getDEMPContract,
  getMetaContract,
  getMerchContract,
} from "../lib/nft/utils"

interface MintState {
  loading: boolean
  error: string
  success: boolean
}

interface DEMPTokens {
  psilocybin: number[]
  meta: number[]
  irl: number[]
}

interface DEMPBalances {
  psilocybinBalance: number
  irlBalance: number
  metaBalance: number
}

interface DEMPMintTokens {
  psilocybinId: number | null
  metaId: number | null
  irlId: number | null
  psilocybinBalance: number
}

type usePsilocybinFn = [
  MintState,
  UseQueryResult<DEMPBalances | undefined, unknown>,
  UseQueryResult<DEMPMintTokens | undefined, unknown>,
  () => void,
  () => void,
  {
    resetMintStatus: () => void
  }
]

const etherProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const dempContract = getDEMPContract(etherProvider)
const metaContract = getMetaContract(etherProvider)
const irlContract = getMerchContract(etherProvider)

const rpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const stakingContract = new ethers.Contract(
  process.env.NEXT_PUBLIC_STAKING_ADDRESS as string,
  [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "enum PAStaker.TokenTypes",
          name: "_tokenType",
          type: "uint8",
        },
      ],
      name: "getStakedTokens",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  rpcProvider
)

const getAllUnclaimed = async (tokens: number[]): Promise<number[]> => {
  let result = [] as number[]
  for (let i = 0; i < tokens.length; i++) {
    try {
      const used = await dempContract.psilocybinUsed(tokens[i])
      if (!used) {
        result = [...result, tokens[i]]
      }
    } catch {
      continue
    }
  }

  return result
}

const _getFirstOwned = async (
  tokens: number[],
  address: string,
  contract: ethers.Contract
) => {
  for (let i = 0; i < tokens.length; i++) {
    try {
      const owner = await contract.ownerOf(tokens[i])
      if (owner === address) {
        return tokens[i]
      }
    } catch {
      continue
    }
  }

  return null
}

const useDEMP = (
  wallet: Wallet | undefined,
  onMintSuccess: () => void,
  onMintError: (e: any) => void,
  onBalanceError: (e: unknown) => void,
  onTokenError: (e: unknown) => void
): usePsilocybinFn => {
  const [mintStatus, setMintStatus] = useState<MintState>({
    loading: false,
    error: "",
    success: false,
  })
  const balanceQuery = useQuery(
    "demp-balance",
    async () => {
      if (wallet?.address) {
        const balances = await dempContract.checkBalance(wallet?.address)
        const psilocybinBalance = parseInt(balances[0])
        const metaBalance = parseInt(balances[1])
        const irlBalance = parseInt(balances[2])
        return {
          psilocybinBalance,
          metaBalance,
          irlBalance,
        }
      }
    },
    {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: 0,
      onError: (e) => {
        onBalanceError(e)
      },
    }
  )

  const dempQuery = useQuery(
    "demp-owned-tokens",
    async () => {
      if (wallet?.address) {
        const response = await axios.get<DEMPTokens>(
          `${process.env.NEXT_PUBLIC_GET_DEMP_OWNED_TOKENS}?ownerAddress=${wallet.address}`
        )

        const stakedPsilocybin = await stakingContract.getStakedTokens(
          wallet?.address,
          2
        )
        const possiblePsilocybinIds = await getAllUnclaimed(
          Array.from(
            new Set([
              ...stakedPsilocybin.map((id: BigInt) => +id),
              ...response.data.psilocybin,
            ])
          )
        )

        const psilocybinId =
          possiblePsilocybinIds.length > 0 ? possiblePsilocybinIds[0] : null
        const irlId = await _getFirstOwned(
          response.data.irl,
          wallet?.address,
          irlContract
        )
        const metaId = await _getFirstOwned(
          response.data.meta,
          wallet?.address,
          metaContract
        )

        if (!psilocybinId || (!irlId && !metaId)) {
          throw new Error(
            "Must own at least one valid set of Psilocybin + (IRL or Meta) NFTs."
          )
        }

        return {
          psilocybinId,
          metaId,
          irlId,
          psilocybinBalance: possiblePsilocybinIds.length,
        }
      }
    },
    {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: balanceQuery.isSuccess,
      cacheTime: 0,
      onError: (e) => {
        onTokenError(e)
      },
    }
  )

  const resetMintStatus = async () => {
    setMintStatus({
      loading: false,
      success: false,
      error: "",
    })
  }

  const claimIRL = async () => {
    if (wallet) {
      try {
        setMintStatus({
          loading: true,
          success: false,
          error: "",
        })
        const { psilocybinId, irlId } = dempQuery.data as DEMPMintTokens

        const irlApproved = await irlContract.isApprovedForAll(
          wallet.address,
          dempContract.address
        )

        let approvalPromises = [] as Promise<any>[]
        if (!irlApproved) {
          const irlApprovalTransaction = await irlContract
            .connect(wallet.signer)
            .setApprovalForAll(dempContract.address, true)
          approvalPromises = [
            ...approvalPromises,
            await irlApprovalTransaction.wait(),
          ]
        }

        Promise.all(approvalPromises)

        const transaction = await dempContract
          .connect(wallet.signer)
          .claim(psilocybinId, 0, irlId, false)
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
            "Something went wrong. Unable to claim. Transaction was rejected.",
        })
        onMintError(e)
      }
    }
  }

  const claimMeta = async () => {
    if (wallet) {
      try {
        setMintStatus({
          loading: true,
          success: false,
          error: "",
        })
        const { psilocybinId, metaId } = dempQuery.data as DEMPMintTokens

        const metaApproved = await metaContract.isApprovedForAll(
          wallet.address,
          dempContract.address
        )

        let approvalPromises = [] as Promise<any>[]
        if (!metaApproved) {
          const metaApprovalTransaction = await metaContract
            .connect(wallet.signer)
            .setApprovalForAll(dempContract.address, true)
          approvalPromises = [
            ...approvalPromises,
            await metaApprovalTransaction.wait(),
          ]
        }

        Promise.all(approvalPromises)

        const transaction = await dempContract
          .connect(wallet.signer)
          .claim(psilocybinId, metaId, 0, true)
        await transaction.wait()

        setMintStatus({
          loading: false,
          success: true,
          error: "",
        })
        onMintSuccess()
      } catch (e: any) {
        console.log(e)
        setMintStatus({
          loading: false,
          success: false,
          error:
            e?.error?.message ||
            "Something went wrong. Unable to claim. Transaction was rejected.",
        })
        onMintError(e)
      }
    }
  }

  const statusControls = {
    resetMintStatus,
  }

  return [
    mintStatus,
    balanceQuery,
    dempQuery,
    claimIRL,
    claimMeta,
    statusControls,
  ]
}

export default useDEMP
