import React from "react"
import { useWalletContext } from "../../context/WalletProvider"
import Button from "../common/ButtonV2"
import VerticalGrid from "../common/VerticalGrid"
import WalletCard from "../common/WalletCard"

const BurnMobileWalletCard = () => {
  const [wallet, _status, walletControls] = useWalletContext()

  return (
    <VerticalGrid css={{ width: "fit-content", "@bp3": { display: "none" } }}>
      <Button onClick={walletControls.disconnectWallet} color="lupineInverse">
        Disconnect
      </Button>
      {wallet && <WalletCard address={wallet.address} />}
    </VerticalGrid>
  )
}

export default BurnMobileWalletCard
