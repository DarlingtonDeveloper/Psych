import React from "react"
import stitches from "../../../stitches"
import { DesktopFooter } from "./DesktopFooter"
import { MobileFooter } from "./MobileFooter"

const Container = stitches.styled("footer", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: 32,
})

export function FooterV3() {
  return (
    <Container>
      <MobileFooter />
      <DesktopFooter />
    </Container>
  )
}
