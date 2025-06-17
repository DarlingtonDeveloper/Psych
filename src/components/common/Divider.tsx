import React from "react"
import stitches from "../../stitches"

interface DividerProps {
  full?: boolean
}

const Container = stitches.styled("div", {
  padding: "$lg 0",
  display: "flex",
})

const HR = stitches.styled("div", {
  width: "4rem",
  height: "2px",
  backgroundColor: "$paLightGrey",
  variants: {
    full: {
      true: {
        width: "90%",
      },
    },
  },
})

const Divider = ({ full }: DividerProps) => (
  <Container>
    <HR full={!!full} />
  </Container>
)

export default Divider
