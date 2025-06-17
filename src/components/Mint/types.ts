import { JsonRpcSigner } from "@ethersproject/providers"
import React from "react"

export interface Wallet {
  signer: JsonRpcSigner
  address: string
  chainId?: number
}
export interface WalletV2 {
  address: string
  chainId: number
  signer: JsonRpcSigner
}

export type ModalFC = (props: { close: () => void }) => React.ReactElement
