import { BigNumber, ethers } from "ethers"
import keccak256 from "keccak256"
import MerkleTree from "merkletreejs"
import { GenesisCart, GenesisConstants, NFTItemType } from "./types"
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers"
import GenesisNFT from "../contracts/GenesisNFT.json"
import MerchPassNFT from "../contracts/MerchPassNFT.json"
import MetaPassNFT from "../contracts/MetaPassNFT.json"
import UtilityPassNFT from "../contracts/UtilityPassNFT.json"
import Component2NFT from "../contracts/Component2.json"
import Component3NFT from "../contracts/C3.json"

import PAPPNFT from "../contracts/PAPP.json"
import PsilocybinNFT from "../contracts/Psilocybin.json"
import DempNFT from "../contracts/DEMP.json"

export const getGenesisContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_GENESIS_ADDRESS as string,
    GenesisNFT.abi,
    provider
  )
}

export const getMerchContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_MERCH_NFT_ADDRESS as string,
    MerchPassNFT.abi,
    provider
  )
}

export const getMetaContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_META_NFT_ADDRESS as string,
    MetaPassNFT.abi,
    provider
  )
}

export const getUtilityContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_UTILITY_NFT_ADDRESS as string,
    UtilityPassNFT.abi,
    provider
  )
}

export const getC1Contract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_C1_ADDRESS as string,
    UtilityPassNFT.abi,
    provider
  )
}

export const getC2Contract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_C2_ADDRESS as string,
    Component2NFT.abi,
    provider
  )
}

export const getC3Contract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_C3_ADDRESS as string,
    Component3NFT.abi,
    provider
  )
}

export const getPAPPContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_PAPP_ADDRESS as string,
    PAPPNFT.abi,
    provider
  )
}

export const getPsilocybinContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_PSILOCYBIN_ADDRESS as string,
    PsilocybinNFT.abi,
    provider
  )
}

export const getDEMPContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_DEMP_ADDRESS as string,
    DempNFT.abi,
    provider
  )
}

export const getStakingContract = (
  provider: Web3Provider | JsonRpcProvider
): ethers.Contract => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_STAKING_ADDRESS as string,
    [
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "_ids",
            type: "uint256[]",
          },
          {
            internalType: "enum PAStaker.TokenType",
            name: "_tokenType",
            type: "uint8",
          },
        ],
        name: "batchUnstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "_ids",
            type: "uint256[]",
          },
          {
            internalType: "enum PAStaker.TokenType",
            name: "_tokenType",
            type: "uint8",
          },
        ],
        name: "batchStake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    provider
  )
}

export const createMerkleTree = (addresses: string[]) => {
  const merkleTree = new MerkleTree(addresses, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  })

  return merkleTree
}

export const getPrice = (
  constants: GenesisConstants,
  cart: GenesisCart
): BigNumber =>
  Object.keys(cart).reduce(
    (acc, cum) =>
      acc.add(
        constants.prices[cum as NFTItemType].mul(cart[cum as NFTItemType])
      ),
    BigNumber.from(0)
  )

export const mint = async (
  genesisContract: ethers.Contract,
  merkleTree: MerkleTree | null,
  signer: ethers.Signer,
  constants: GenesisConstants,
  cart: GenesisCart
): Promise<any> => {
  const proof = merkleTree
    ? merkleTree.getHexProof(keccak256(await signer.getAddress()))
    : []

  const totalPrice = +ethers.utils.formatEther(getPrice(constants, cart))

  const tx = await genesisContract
    .connect(signer)
    .mint(
      proof,
      cart[NFTItemType.GENESIS],
      cart[NFTItemType.MERCH_PASS],
      cart[NFTItemType.META_PASS],
      cart[NFTItemType.UTILITY_PASS],
      {
        value: ethers.utils.parseUnits(`${totalPrice}`, "ether"),
      }
    )
  return tx
}

export const mintGenesisSoldOut = async (
  contract: ethers.Contract,
  amount: number,
  signer: ethers.Signer,
  totalPrice: BigNumber
): Promise<any> => {
  const tx = await contract.connect(signer).mintGenesisSoldOut(amount, {
    value: ethers.utils.parseUnits(
      `${+ethers.utils.formatEther(totalPrice)}`,
      "ether"
    ),
  })
  return tx
}

export const getConstants = async (
  genesisContract: ethers.Contract,
  merchContract: ethers.Contract,
  metaContract: ethers.Contract,
  utilityContract: ethers.Contract
): Promise<GenesisConstants> => {
  let genesisPrice = null
  let merchPrice = null
  let metaPrice = null
  let utilityPrice = null
  let mintStatus = null
  let genesisTokenCount = null
  let genesisMintableSupply = null
  let merchTokenCount = null
  let merchMintableSupply = null
  let metaTokenCount = null
  let metaMintableSupply = null
  let utilityTokenCount = null
  let utilityMintableSupply = null

  Promise.all([
    (genesisPrice = await genesisContract.PRICE()),
    (merchPrice = await genesisContract.MERCH_PASS_PRICE()),
    (metaPrice = await genesisContract.META_PASS_PRICE()),
    (utilityPrice = await genesisContract.UTILITY_PASS_PRICE()),
    (mintStatus = await genesisContract.mintStatus()),
    (genesisTokenCount = await genesisContract.tokenCount()),
    (genesisMintableSupply = await genesisContract.mintableSupply()),
    (merchTokenCount = await merchContract.tokenCount()),
    (merchMintableSupply = await merchContract.mintableSupply()),
    (metaTokenCount = await metaContract.tokenCount()),
    (metaMintableSupply = await metaContract.mintableSupply()),
    (utilityTokenCount = await utilityContract.tokenCount()),
    (utilityMintableSupply = await utilityContract.mintableSupply()),
  ])

  return {
    mintStatus,
    prices: {
      [NFTItemType.GENESIS]: genesisPrice,
      [NFTItemType.MERCH_PASS]: merchPrice,
      [NFTItemType.META_PASS]: metaPrice,
      [NFTItemType.UTILITY_PASS]: utilityPrice,
    },
    soldOutStatus: {
      [NFTItemType.GENESIS]: genesisMintableSupply.lte(genesisTokenCount),
      [NFTItemType.MERCH_PASS]: merchMintableSupply.lte(merchTokenCount),
      [NFTItemType.META_PASS]: metaMintableSupply.lte(metaTokenCount),
      [NFTItemType.UTILITY_PASS]: utilityMintableSupply.lte(utilityTokenCount),
    },
  }
}

export const getUserClaims = async (
  contract: ethers.Contract,
  address: string
): Promise<number> => {
  const claimed = await contract.userClaims(address)
  return claimed
}

export const getBalanceOf = async (
  contract: ethers.Contract,
  walletAddress: string
): Promise<number> => {
  const balance = await contract.balanceOf(walletAddress)
  return parseInt(balance)
}
