import faunadb, { query as q } from "faunadb"
import { User } from "./get-user"

export interface PsypayTransactionPA {
  psypayTransactionId: number
  timestamp: number
  walletAddress: string
  item: number
  success: boolean
  price: number
}

type GetFaunaType = {
  ref: any
  data: PsypayTransactionPA
}

export type PsypayTransactionDocId = string
export type RecordPsypayTransactionReturn = {
  refId: PsypayTransactionDocId
} & PsypayTransactionPA

export type createPsypayPendingTrxData = {
  campaignId: number
  packs: { type: string; value: number }[]
  idempotentKey: string
  forWalletAddress: string
}

export type PsypayTransaction = {
  id: number
  captureMetadata: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export type CreatePackPsypayPendingTransactionResponse = {
  psypayTransactionId: PsypayTransaction["id"]
  pendingTransactionId: number
}

const PSYPAY_TRANSACTIONS_COLLECTION = "psypay_transactions"

export const recordPsypayTransaction = async (
  psypayTransactionId: number,
  timestamp: number,
  walletAddress: string,
  item: string,
  success: boolean,
  price: number
): Promise<RecordPsypayTransactionReturn> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const ret = await serverClient.query<GetFaunaType>(
    q.Create(q.Collection(PSYPAY_TRANSACTIONS_COLLECTION), {
      data: {
        psypayTransactionId,
        timestamp,
        walletAddress,
        item,
        price,
        success,
      },
    })
  )

  const consolidated = { refId: ret.ref.id, ...ret.data }

  await serverClient.close()
  return consolidated
}

export interface PsypayTransactionPAData {
  refId: string
  psypayTransactionId: number
  timestamp: number
  walletAddress: string
  item: number
  success: boolean
  price: number
}

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
export type CapturePsypayCampaignOrderParams = {
  campaignId: Campaign["id"]
  psypayTransactionId: number
}

export type CapturePsypayCampaignOrderBody = {
  metadata: PsypayTransactionPAData
}

export type CreateFinalizeCampaignPsypayTransactionResponse =
  PsypayTransactionPAData

export type CreditPsyData = {
  metadata: string
  amount: number
  walletAddress: User["walletAddress"]
}

export type CreditPsyRes = {
  walletAddres: CreditPsyData["walletAddress"]
  transactionId: string
  timestamp: string
  claimedPoints: User["claimedPoints"]
  unclaimedPoints: User["unclaimedPoints"]
  action: string
  source: CreditPsyData["metadata"]
}
