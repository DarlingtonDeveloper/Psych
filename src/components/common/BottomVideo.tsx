import React from "react"
import Slideshow from "./Slideshow"
import stitches from "../../stitches"

interface BottomVideoProps {
  bg?: string
}

const Container = stitches.styled("div", {
  width: "100%",
  height: "200px",
  "@bp2": {
    display: "none",
  },
  ">:after": {
    content: "",
    backgroundImage: `linear-gradient(to top left, transparent 50%, $paIce 0%, $paIce 50%)`,
    position: "absolute",
    width: "100%",
    height: "75px",
    top: -1,
    left: 0,
    zIndex: 1,
  },
})

const BottomVideo = ({
  bg = stitches.theme.colors.paIce.value,
}: BottomVideoProps) => (
  <Container
    css={{
      ">:after": {
        backgroundImage: `linear-gradient(to top left, transparent 50%, ${bg} 0%, ${bg} 50%)`,
      },
    }}
  >
    <Slideshow />
  </Container>
)

export default BottomVideo
