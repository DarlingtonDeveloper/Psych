import React from "react"
import { useWalletContext } from "../../context/WalletProvider"
import Button from "../common/ButtonV2"
import VerticalGrid from "../common/VerticalGrid"
import WalletCard from "../common/WalletCard"

const BurnWalletCard = () => {
  const [wallet, _status, walletControls] = useWalletContext()

  return (
    <VerticalGrid css={{ width: "fit-content" }}>
      <Button onClick={walletControls.disconnectWallet} color="lupine">
        Disconnect
      </Button>
      {wallet && <WalletCard address={wallet.address} />}
    </VerticalGrid>
  )
}

export default BurnWalletCard
