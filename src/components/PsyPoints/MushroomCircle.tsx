import React from "react"
import MushroomIcon from "./MushroomIcon"
import stitches from "../../stitches"

interface MushroomCircleProps {
  variant: "dark" | "light"
}

const Container = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  borderRadius: "100%",
  backgroundColor: "$paMoonLight",
  variants: {
    variant: {
      light: {
        backgroundColor: "$paMoonLight",
        color: "$paLupine",
      },
      dark: {
        backgroundColor: "$paLupine",
        color: "$paMoonLight",
      },
    },
  },
})

const MushroomCircle = ({ variant }: MushroomCircleProps) => (
  <Container variant={variant}>
    <MushroomIcon />
  </Container>
)

export default MushroomCircle
