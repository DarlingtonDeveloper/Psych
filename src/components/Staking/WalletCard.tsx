import React from "react"
import stitches from "../../stitches"
import WalletIcon from "./WalletIcon"

interface WalletProps {
  address: string | undefined
}

const WalletContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  "&>span": {
    color: "$paIce",
    fontSize: "$sm",
    fontWeight: 600,
  },
  "&>span:before": {
    content: "/",
    paddingLeft: "$sm",
    color: "$paIce",
    paddingRight: "$sm",
  },
  "@bp3": {
    width: "auto",
  },
})

const truncateAddress = (address: string) =>
  `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
    address.length
  )}`

const WalletCard = ({ address }: WalletProps) => {
  return (
    <WalletContainer>
      <WalletIcon />
      <span>{truncateAddress(address || "")}</span>
    </WalletContainer>
  )
}

export default WalletCard
