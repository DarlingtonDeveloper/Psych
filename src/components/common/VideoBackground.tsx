import React from "react"
import stitches from "../../stitches"

interface VideoBackgroundProps {
  src: string
}

const fadeIn = stitches.keyframes({
  "0%": { opacity: 0.4 },
  "100%": { opacity: 1 },
})

const Container = stitches.styled("video", {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: -1,
  minWidth: "100%",
  minHeight: "100%",
  objectPosition: "center",
  objectFit: "cover",
  animation: `${fadeIn} ease-in 1s`,
  filter: "brightness(80%)",
})

const VideoBackground = ({ src }: VideoBackgroundProps) => (
  <Container
    src={src}
    width="100%"
    autoPlay
    muted
    loop
    playsInline
    controls={false}
  />
)

export default VideoBackground
