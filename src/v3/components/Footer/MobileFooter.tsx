import React from "react"
import stitches from "../../../stitches"
import { redesignAssets } from "../assets"

const MobileFooterContainer = stitches.styled("div", {
  display: "flex",
  visibility: "visible",
  flex: "1 0 100%",
  justifyContent: "space-between",
  width: "100%",
  padding: "3rem",
  paddingBottom: "2rem",
  "@bp3": {
    display: "none",
    visibility: "hidden",
  },
})

const FooterSpan = stitches.styled("span", {
  fontFamily: "$inter",
  color: "$paMoonLight",
  fontSize: 11,
})

export const MobileFooter = () => {
  return (
    <MobileFooterContainer>
      <img src={redesignAssets.logos.pa} alt="Psychedelics logo" />
      <FooterSpan>© 2024 PsyZen</FooterSpan>
    </MobileFooterContainer>
  )
}
