import React, { useMemo } from "react"
import { WalletBalanceDesktop } from "./desktop"
import { WalletBalanceMobile } from "./mobile"
import { useGetUserPsypoints } from "../../../../queries/psypoints"
import { useClaimPsypoints } from "../../../../mutations/psypoints"

export const Balance = () => {
  const { isLoading, data } = useGetUserPsypoints()
  const { mutate, isLoading: isClaiming } = useClaimPsypoints()

  const balance = data?.claimedPoints || 0
  const unclaimed = data?.unclaimedPoints || 0

  const commonProps = useMemo(
    () => ({
      isLoading,
      balance,
      unclaimed,
      handleClaim: mutate,
      isClaiming,
    }),
    [balance, unclaimed, isLoading, mutate, isClaiming]
  )

  return (
    <>
      <WalletBalanceDesktop {...commonProps} />
      <WalletBalanceMobile {...commonProps} />
    </>
  )
}
