import React from "react"
import stitches from "../../stitches"
import WalletIcon from "./WalletIcon"

interface WalletProps {
  address: string
}

const WalletContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  marginTop: "$rg",
  width: "100%",
  "&>span": {
    color: "$paLightGrey",
    fontSize: "$rg",
    fontWeight: 600,
  },
  "&>span:before": {
    content: "/",
    paddingLeft: "$rg",
    color: "$paIce",
    paddingRight: "$rg",
  },
  "@bp3": {
    width: "auto",
  },
})

const truncateAddress = (address: string) =>
  address
    ? `${address.substring(0, 5)}...${address.substring(
        address.length - 4,
        address.length
      )}`
    : null

const WalletCard = ({ address }: WalletProps) => {
  return (
    <WalletContainer>
      <WalletIcon />
      <span>{truncateAddress(address)}</span>
    </WalletContainer>
  )
}

export default WalletCard
