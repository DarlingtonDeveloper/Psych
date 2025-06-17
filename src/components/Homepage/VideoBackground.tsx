import React from "react"
import Slideshow from "../common/Slideshow"
import stitches from "../../stitches"

const Container = stitches.styled("div", {
  height: "100vh",
  left: 0,
  position: "fixed",
  top: 0,
  width: "100vw",
  zIndex: "$hide",
})

const VideoBackground = () => {
  return (
    <Container>
      <Slideshow />
    </Container>
  )
}

export default VideoBackground
