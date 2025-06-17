import React, { FC } from "react"
import stitches from "../../../../stitches"

const Icon = stitches.styled("i", {
  height: 14,
  width: 14,
  borderRadius: "100%",
  transition: "border, background-color ease-out 0.2s",
  variants: {
    selected: {
      true: {
        border: "1px solid $paMoonLight",
        boxShadow: "inset 0 0 0 2px #D64949",
        backgroundColor: "$paMoonLight",
      },
      false: {
        backgroundColor: "transparent",
        border: "1px solid $paLupine",
      },
    },
  },
  defaultVariants: {
    selected: "false",
  },
})

const Button = stitches.styled("button", {
  height: 32,
  width: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%",
  border: 0,

  variants: {
    selected: {
      true: {
        background: "$paRedV2",
      },
      false: { background: "$paDustv2" },
    },
  },

  defaultVariants: {
    selected: "false",
  },
})

interface Props {
  selected: boolean
}

export const SelectIcon: FC<Props> = ({ selected }) => {
  return (
    <Button selected={selected}>
      <Icon selected={selected} />
    </Button>
  )
}
