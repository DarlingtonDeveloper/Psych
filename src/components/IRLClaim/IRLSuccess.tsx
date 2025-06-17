import React from "react"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import PIcon from "../common/PIcon"
import CurrentWallet from "./CurrentWallet"

interface IRLSuccessProps {
  disconnectWallet: () => void
  address: string
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "auto 0",
  width: "100%",
  maxWidth: "20rem",
  alignItems: "center",
  justifyContent: "center",
  color: "$paIce",
  padding: "9rem $lg",
  "> *": {
    "+ *": {
      marginTop: "$lg !important",
    },
  },
  span: {
    color: "$paIce",
  },
})

const CustomCurrentWallet = stitches.styled(CurrentWallet, {
  padding: 0,
})

const CustomGenesisHeader = stitches.styled(GenesisHeader, {
  fontSize: "$sm",
  fontWeight: 600,
  color: "$paIce",
  "&:before": {
    color: "$paIce",
  },
})

const P = stitches.styled("p", {
  textAlign: "center",
  lineHeight: "2",
  margin: 0,
})

const IRLSuccess = ({ disconnectWallet, address }: IRLSuccessProps) => (
  <Container>
    <PIcon color={stitches.theme.colors.paIce.value} />
    <CustomGenesisHeader>IRL Merch Registration</CustomGenesisHeader>
    <P>
      Thank you.
      <br /> Your claim has been submitted
    </P>
    <CustomCurrentWallet
      address={address}
      disconnectWallet={disconnectWallet}
    />
  </Container>
)

export default IRLSuccess
