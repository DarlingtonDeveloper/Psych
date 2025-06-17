export interface UnstakedToken {
  tokenId: number
  preview: string
}

export interface StakedToken extends UnstakedToken {
  daysStaked: number
}

export type StakedTokenType = "genesis" | "psilocybin" | "c1"
