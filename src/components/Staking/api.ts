import { ContractTransaction, ethers } from "ethers"
import {
  getC1Contract,
  getGenesisContract,
  getPsilocybinContract,
  getStakingContract,
} from "../../lib/nft/utils"
import { Wallet } from "../Mint/types"
import { StakedTokenType } from "./types"

const etherProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ENDPOINT
)

const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS as string

const stakingContract = getStakingContract(etherProvider)
const genesisContract = getGenesisContract(etherProvider)
const c1Contract = getC1Contract(etherProvider)
const psilocybinContract = getPsilocybinContract(etherProvider)

const CONTRACT_ENUM_TOKEN_TYPE_MAPPING = {
  genesis: 0,
  c1: 1,
  psilocybin: 2,
}

const _checkApproval = async (
  wallet: Wallet,
  contract: ethers.Contract
): Promise<boolean> => {
  return await contract.isApprovedForAll(wallet.address, stakingContractAddress)
}

const _requestApproval = async (
  wallet: Wallet,
  contract: ethers.Contract
): Promise<ContractTransaction> => {
  return contract
    .connect(wallet.signer)
    .setApprovalForAll(stakingContractAddress, true)
}

const checkAndRequestApproval = async (
  wallet: Wallet,
  tokenType: StakedTokenType
): Promise<ContractTransaction | void> => {
  if (tokenType === "genesis") {
    const genesisApproval = await _checkApproval(wallet, genesisContract)
    if (!genesisApproval) {
      return _requestApproval(wallet, genesisContract)
    }
  }
  if (tokenType === "psilocybin") {
    const psylocbinApproval = await _checkApproval(wallet, psilocybinContract)
    if (!psylocbinApproval) {
      return _requestApproval(wallet, psilocybinContract)
    }
  }
  if (tokenType === "c1") {
    const c1Approval = await _checkApproval(wallet, c1Contract)
    if (!c1Approval) {
      return _requestApproval(wallet, c1Contract)
    }
  }
}

export const batchStake = async (
  wallet: Wallet,
  tokenIds: number[],
  tokenType: StakedTokenType
) => {
  const approvalTransaction = (await checkAndRequestApproval(
    wallet,
    tokenType
  )) as ContractTransaction
  if (approvalTransaction) {
    await approvalTransaction.wait()
  }
  const transaction = await stakingContract
    .connect(wallet.signer)
    .batchStake(tokenIds, CONTRACT_ENUM_TOKEN_TYPE_MAPPING[tokenType])
  await transaction.wait()
}

export const batchUnstake = async (
  wallet: Wallet,
  tokenIds: number[],
  tokenType: StakedTokenType
) => {
  const transaction = await stakingContract
    .connect(wallet.signer)
    .batchUnstake(tokenIds, CONTRACT_ENUM_TOKEN_TYPE_MAPPING[tokenType])
  await transaction.wait()
}
