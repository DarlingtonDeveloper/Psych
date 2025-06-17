import { BigNumber } from "ethers"

export enum MintStatus {
  CLOSED = 0,
  PRESALE = 1,
  PUBLIC = 2,
}

export enum NFTItemType {
  GENESIS = "genesis",
  MERCH_PASS = "merchPass",
  META_PASS = "metaPass",
  UTILITY_PASS = "utilityPass",
}

export enum MintFailure {
  MERCH_PASS = "Merch failure",
  META_PASS = "Meta failure",
  UTILITY_PASS = "Utility failure",
}

export type GenesisSoldOutStatus = Record<NFTItemType, boolean>

export interface GenesisConstants {
  mintStatus: MintStatus
  prices: Record<NFTItemType, BigNumber>
  soldOutStatus: GenesisSoldOutStatus
}

export type GenesisCart = Record<NFTItemType, number>
