import React from "react"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import Amount from "./Amount"

const AddToClaimButton = stitches.styled("button", {
  boxShadow: "none",
  minWidth: "10rem",
  fontFamily: "$proxima",
  color: "$paDark",
  fontSize: "$sm",
  marginTop: "$rg",
  padding: "$sm",
  width: "100%",
  height: "fit-content",
  fontWeight: 600,
  textTransform: "uppercase",
  backgroundColor: "$paIce",
  border: "none",
  textAlign: "center",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.9,
  },
  transition: "opacity ease-in 0.3s",
})

interface NFTItemProps {
  allowance: number
  amount: number
  setAmount: (num: number) => void
}

const Container = stitches.styled("div", {
  position: "relative",
  display: "flex",
  width: "100%",
  backgroundColor: "$paMid",
  flexDirection: "column",
  color: "$paIce",
  padding: "$lg",
  "@bp3": {
    flexDirection: "row",
  },
  "> *": {
    "+ *": {
      marginTop: "$lg",
      "@bp3": {
        marginTop: 0,
        marginLeft: "$lg",
      },
    },
  },
})

const Content = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: "1 1 100%",
  "> *": {
    "+ *": {
      marginTop: "$sm",
    },
  },
})

const CustomGenesis = stitches.styled(GenesisHeader, {
  fontSize: "$sm",
  color: "$paIce",
  "&:before": {
    color: "$paIce",
  },
})

const IRLAmount = ({ allowance, amount, setAmount }: NFTItemProps) => {
  return (
    <Container>
      <Content>
        <Content css={{ marginLeft: "$lg", marginRight: "$lg" }}>
          <CustomGenesis>irl pack qty</CustomGenesis>
          <Content
            css={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Amount
              amount={amount}
              setAmount={setAmount}
              minAmount={1}
              maxAmount={allowance}
            />
          </Content>
        </Content>
        <AddToClaimButton
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Add to claim
        </AddToClaimButton>
      </Content>
    </Container>
  )
}

export default IRLAmount
