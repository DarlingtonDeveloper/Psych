export type Pack = {
  available: number
  maxQuantity: number
  minQuantity: number
  price: number
  name: string
  preview: string
  htmlInclusions: string
  color: string
  soldout: boolean
  textLogo: boolean
}
export type Campaign = {
  id: number
  name: string
  description: string
  currency: string
  packs: Pack[]
}

export type createPsypayPendingTrxData = {
  campaignId: number
  packs: { type: string; value: number }[]
  idempotentKey: string
  forWalletAddress: string
  byWalletAddress: string
}

// ND
export type PsypayTransaction = {
  id: number
  captureMetadata: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface CreatePackPsypayPendingTransactionResponse {
  psypayTransactionId: PsypayTransaction["id"]
  pendingTransactionId: number
}

export type CartType = Record<string, number>

export interface PsypayTransactionPAData {
  refId: string
  psypayTransactionId: number
  timestamp: number
  walletAddress: string
  item: number // stringified cart
  success: boolean
  price: number
}

export type CapturePsypayCampaignOrderParams = {
  campaignId: Campaign["id"]
  psypayTransactionId: number
}

export type CapturePsypayCampaignOrderBody = {
  metadata: PsypayTransactionPAData
}

export type CreateFinalizeCampaignPsypayTransactionResponse =
  PsypayTransactionPAData
