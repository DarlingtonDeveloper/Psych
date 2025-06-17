import React from "react"
import stitches from "../../stitches"
import WalletCard from "./WalletCard"

interface CurrentWalletProps {
  disconnectWallet: () => void
  address: string
  className?: string
  disabled?: boolean
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  top: 0,
  height: "fit-content",
  paddingBottom: "$lg",
  width: "100%",
  "@bp3": {
    paddingTop: "$lg",
    position: "sticky",
    top: 0,
    alignItems: "flex-start",
  },
})

const DisconnectButton = stitches.styled("button", {
  boxShadow: "none",
  minWidth: "10rem",
  fontFamily: "$proxima",
  color: "$paIce",
  fontSize: "$sm",
  padding: "$rg",
  width: "100%",
  height: "fit-content",
  textTransform: "uppercase",
  backgroundColor: "$paForest",
  border: "none",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
  transition: "opacity ease-in 0.3s",
})

const CurrentWallet = ({
  disconnectWallet,
  address,
  className,
  disabled = false,
}: CurrentWalletProps) => (
  <Container className={className}>
    <DisconnectButton
      css={{ backgroundColor: "$paForest" }}
      onClick={disconnectWallet}
      disabled={disabled}
    >
      Disconnect Wallet
    </DisconnectButton>
    <WalletCard address={address} />
  </Container>
)

export default CurrentWallet
