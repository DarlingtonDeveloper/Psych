import React from "react"
import stitches from "../../stitches"
import Slideshow from "./Slideshow"

const Container = stitches.styled("div", {
  width: "100%",
  height: "35rem",
})

const BottomHero = () => (
  <Container>
    <Slideshow />
  </Container>
)

export default BottomHero
