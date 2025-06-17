import React from "react"
import stitches from "../../stitches"
import MinusCircle from "./MinusCircle"
import PlusCircle from "./PlusCircle"

interface AmountProps {
  amount: number
  setAmount: (num: number) => void
  minAmount?: number
  maxAmount?: number
}

const Container = stitches.styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  userSelect: "none",
  maxWidth: "10rem",
  fontSize: "$rg",
  fontWeight: 600,
  "@bp3": {
    marginTop: 0,
  },
})

const Clickable = stitches.styled("div", {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    cursor: "pointer",
  },
})

const DEFAULT_MIN = 1
const DEFAULT_MAX = 2

const Amount = ({
  amount,
  setAmount,
  minAmount = DEFAULT_MIN,
  maxAmount = DEFAULT_MAX,
}: AmountProps) => {
  return (
    <Container>
      <Clickable
        onClick={() => {
          if (amount - 1 >= minAmount) {
            setAmount(amount - 1)
          }
        }}
      >
        <MinusCircle />
      </Clickable>
      {amount}
      <Clickable
        onClick={() => {
          if (amount + 1 <= maxAmount) {
            setAmount(amount + 1)
          }
        }}
      >
        <PlusCircle />
      </Clickable>
    </Container>
  )
}

export default Amount
