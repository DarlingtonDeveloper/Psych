import axios from "axios"
import { ethers } from "ethers"
import { useState } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { Wallet } from "../components/Mint/types"
import {
  getC1Contract,
  getC2Contract,
  getC3Contract,
  getPsilocybinContract,
} from "../lib/nft/utils"

interface MintState {
  loading: boolean
  error: string
  success: boolean
}

interface CBalance {
  c1Balance: number
  c2Balance: number
  c3Balance: number
  pappBalance: number
}

interface PsilocybinTokens {
  pappIds: number[]
  c1Ids: number[]
  c2Ids: number[]
  c3Ids: number[]
}

interface PsilocybinMintTokens {
  pappId: number
  c1Id: number
  c2Id: number
  c3Id: number
}

type usePsilocybinFn = [
  MintState,
  UseQueryResult<CBalance | undefined, unknown>,
  UseQueryResult<PsilocybinMintTokens | undefined, unknown>,
  () => void,
  {
    resetMintStatus: () => void
  }
]

const etherProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const c1Contract = getC1Contract(etherProvider)
const c2Contract = getC2Contract(etherProvider)
const c3Contract = getC3Contract(etherProvider)
const psilocybinContract = getPsilocybinContract(etherProvider)

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

const usePsilocybin = (
  wallet: Wallet | undefined,
  onMintSuccess: () => void,
  onMintError: () => void,
  onBalanceError: () => void,
  onTokenError: () => void
): usePsilocybinFn => {
  const [mintStatus, setMintStatus] = useState<MintState>({
    loading: false,
    error: "",
    success: false,
  })
  const balanceQuery = useQuery(
    "psilocybin-balance",
    async () => {
      if (wallet?.address) {
        const balances = await psilocybinContract.checkBalances(wallet?.address)

        return {
          pappBalance: parseInt(balances[0]),
          c1Balance: parseInt(balances[1]),
          c2Balance: parseInt(balances[2]),
          c3Balance: parseInt(balances[3]),
        }
      }
    },
    {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: 0,
      onError: () => {
        onBalanceError()
      },
    }
  )

  const validBalance =
    balanceQuery.isSuccess &&
    balanceQuery.data?.pappBalance &&
    balanceQuery.data?.c1Balance &&
    balanceQuery.data?.c2Balance &&
    balanceQuery.data?.c3Balance

  const psilocybinOwnedTokensQuery = useQuery(
    "psilocybin-owned-tokens",
    async () => {
      if (wallet?.address) {
        const response = await axios.get<PsilocybinTokens>(
          `${process.env.NEXT_PUBLIC_GET_PSILOCYBIN_TOKENS}?ownerAddress=${wallet.address}`
        )

        let pappId = null
        const pappIds = response.data.pappIds
        for (let i = 0; i < pappIds.length; i++) {
          const checkPappUsed = await psilocybinContract.pappUsed(pappIds[i])
          if (!checkPappUsed) {
            pappId = pappIds[i]
            break
          }
        }
        if (!pappId && pappId !== 0) {
          throw new Error("You don't own an unclaimed PAPP.")
        }

        let c1Id = null
        let c2Id = null
        let c3Id = null

        Promise.all([
          (c1Id = await _getFirstOwned(
            response.data.c1Ids,
            wallet.address,
            c1Contract
          )),
          (c2Id = await _getFirstOwned(
            response.data.c2Ids,
            wallet.address,
            c2Contract
          )),
          (c3Id = await _getFirstOwned(
            response.data.c3Ids,
            wallet.address,
            c3Contract
          )),
        ])

        if (!c1Id || !c2Id || !c3Id) {
          throw new Error("Must at least own one valid set of C1, C2, and C3.")
        }

        return {
          pappId,
          c1Id,
          c2Id,
          c3Id,
        }
      }
    },
    {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: !!validBalance,
      cacheTime: 0,
      onError: () => {
        onTokenError()
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

  const claim = async () => {
    if (wallet) {
      try {
        setMintStatus({
          loading: true,
          success: false,
          error: "",
        })
        const { pappId, c1Id, c2Id, c3Id } =
          psilocybinOwnedTokensQuery.data as PsilocybinMintTokens

        const psilocybinAddress = process.env
          .NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string
        const c1IsApproved = await c1Contract.isApprovedForAll(
          wallet.address,
          psilocybinAddress
        )
        const c2IsApproved = await c2Contract.isApprovedForAll(
          wallet.address,
          psilocybinAddress
        )
        const c3IsApproved = await c3Contract.isApprovedForAll(
          wallet.address,
          psilocybinAddress
        )

        let approvalPromises = [] as Promise<any>[]
        if (!c1IsApproved) {
          const c1ApprovalTransaction = await c1Contract
            .connect(wallet.signer)
            .setApprovalForAll(psilocybinAddress, true)
          approvalPromises = [
            ...approvalPromises,
            await c1ApprovalTransaction.wait(),
          ]
        }
        if (!c2IsApproved) {
          const c2ApprovalTransaction = await c2Contract
            .connect(wallet.signer)
            .setApprovalForAll(psilocybinAddress, true)
          approvalPromises = [
            ...approvalPromises,
            await c2ApprovalTransaction.wait(),
          ]
        }

        if (!c3IsApproved) {
          const c3ApprovalTransaction = await c3Contract
            .connect(wallet.signer)
            .setApprovalForAll(psilocybinAddress, true)
          approvalPromises = [
            ...approvalPromises,
            await c3ApprovalTransaction.wait(),
          ]
        }

        Promise.all(approvalPromises)

        const transaction = await psilocybinContract
          .connect(wallet.signer)
          .claim(pappId, c1Id, c2Id, c3Id)
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
        onMintError()
      }
    }
  }

  const statusControls = {
    resetMintStatus,
  }

  return [
    mintStatus,
    balanceQuery,
    psilocybinOwnedTokensQuery,
    claim,
    statusControls,
  ]
}

export default usePsilocybin
