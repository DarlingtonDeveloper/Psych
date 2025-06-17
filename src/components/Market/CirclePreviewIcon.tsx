import React from "react"
import stitches from "../../stitches"

const Container = stitches.styled("div", {
  alignItems: "center",
  backgroundColor: "$paLightGrey",
  borderRadius: "50%",
  display: "flex",
  height: "6rem",
  justifyContent: "center",
  width: "6rem",
})

interface CirclePreviewIconProps {
  img: string
  alt: string
  className?: string
}

const CirclePreviewIcon = ({ img, alt, className }: CirclePreviewIconProps) => (
  <Container className={className}>
    <img src={img} alt={alt} />
  </Container>
)

export default CirclePreviewIcon
