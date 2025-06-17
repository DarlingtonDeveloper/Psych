import React from "react"
import stitches from "../../../stitches"
import Box from "../Box"
import WalletIcon from "./WalletIcon"
import { CSS } from "@stitches/react"

interface WalletProps {
  address: string
  className?: string
  css?: CSS
}

const WalletContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  color: "$paLupine",
  fontFamily: "$inter",
  fontWeight: "bold",
})

const truncateAddress = (address: string) =>
  address
    ? `${address.substring(0, 5)}...${address.substring(
        address.length - 4,
        address.length
      )}`
    : null

const WalletCard = ({ address, className = "", css }: WalletProps) => {
  return (
    <WalletContainer className={className} css={css}>
      <WalletIcon />
      <Box css={{ marginLeft: "$xs" }}>{truncateAddress(address)}</Box>
    </WalletContainer>
  )
}

export default WalletCard
