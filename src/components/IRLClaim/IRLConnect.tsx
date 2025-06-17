import React from "react"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import Button from "./Button"

interface AcceleratorConnectProps {
  connectWallet: () => void
  loading: boolean
  closed?: boolean
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  color: "$paLightGrey",
  marginTop: "$lg",
  "> *": {
    "+ *": {
      marginTop: "$lg",
      "@bp3": {
        marginTop: 0,
      },
    },
  },
  "@bp3": {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
})

const Section = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: "1 1 100%",
  "> *": {
    "+ *": {
      marginTop: "$rg",
    },
  },
})

const Header = stitches.styled("h1", {
  fontWeight: 800,
  fontSize: "4rem",
  textTransform: "uppercase",
  lineHeight: 0.8,
  color: "$paIce",
  "@bp2": {
    fontSize: "6rem",
  },
})

const CustomGenesisHeader = stitches.styled(GenesisHeader, {
  fontSize: "$rg",
  color: "$paIce",
  "&:before": {
    color: "$paIce",
  },
})

const P = stitches.styled("p", {
  textAlign: "left",
  lineHeight: "2",
  width: "100%",
  margin: 0,
  "@bp3": {
    textAlign: "center",
  },
})

const IRLConnect = ({
  connectWallet,
  loading,
  closed,
}: AcceleratorConnectProps) => (
  <Container>
    <Section>
      <Header css={{ fontSize: "7rem" }}>Drop Two</Header>
      <CustomGenesisHeader>IRL Merch Registration</CustomGenesisHeader>
    </Section>
    <Section css={{ alignItems: "center" }}>
      {closed ? (
        <P>Claiming is closed.</P>
      ) : (
        <P>Verify your IRL pass to continue</P>
      )}
      {!closed && (
        <Button
          onClick={connectWallet}
          disabled={loading}
          css={{
            backgroundColor: "$paForest",
            "@bp3": {
              maxWidth: "30rem",
            },
          }}
        >
          {loading ? (
            <ScaleLoader
              color={stitches.theme.colors.paIce.value}
              height={15}
            />
          ) : (
            "Connect Wallet"
          )}
        </Button>
      )}
    </Section>
  </Container>
)

export default IRLConnect
