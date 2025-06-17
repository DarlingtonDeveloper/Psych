import React, { FC, useCallback } from "react"
import {
  WalletIconWrapper,
  WalletTab,
  WalletText,
  WalletWrapper,
} from "./styles"
import { getATOWalletUIFromData } from "./utils"
import WalletIcon from "../../components/common/WalletCard/WalletIcon"

interface Props {
  wallets: Array<{ id: string; value: number }>
  webNavigator?: Navigator
}

export const ATOWallet: FC<Props> = ({ wallets, webNavigator }) => {
  const formatNumber = useCallback(
    (value) => {
      return new Intl.NumberFormat(webNavigator?.language || "en-AU").format(
        value
      )
    },
    [webNavigator]
  )

  return (
    <WalletWrapper>
      {wallets.map((val) => {
        const uiProps = getATOWalletUIFromData(val)
        return (
          <WalletTab key={val.id} cardColor={uiProps?.cardColor as any}>
            <WalletIconWrapper>
              <WalletIcon />
            </WalletIconWrapper>
            <div>
              <WalletText type="number">
                {formatNumber(uiProps?.value || 0)}
              </WalletText>
              <WalletText type="label">{uiProps?.label}</WalletText>
            </div>
          </WalletTab>
        )
      })}
    </WalletWrapper>
  )
}
