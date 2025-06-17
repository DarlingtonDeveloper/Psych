import React from "react"
import stitches from "../../stitches"
import Box from "../common/Box"

interface PointDetailProps {
  icon: React.ReactNode
  title: string
  description: string
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$rg",
  fontFamily: "$inter",
})

const PointDetail = ({ icon, title, description }: PointDetailProps) => (
  <Container>
    <Box css={{ display: "flex", alignItems: "center" }}>
      {icon}&nbsp;&nbsp;{title}
    </Box>
    <Box css={{ lineHeight: 1.75, fontSize: "$sm" }}>{description}</Box>
  </Container>
)

export default PointDetail
