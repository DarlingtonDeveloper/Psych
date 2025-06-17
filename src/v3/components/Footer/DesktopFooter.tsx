import React from "react"
import stitches from "../../../stitches"
import { FooterLinks } from "../FooterLinks"

const Background = stitches.styled("div", {
  width: "100%",
})

const Container = stitches.styled("div", {
  display: "none",
  visibility: "hidden",
  "@bp3": {
    padding: "0 42px",
    maxWidth: 1337,
    margin: "0 auto",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 48px 1fr",
    alignItems: "center",
    visibility: "visible",
    ":nth-child(3)": {
      justifySelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
})

const DesktopLogoImage = stitches.styled("img", {
  justifySelf: "center",
})

const FooterSpan = stitches.styled("span", {
  fontFamily: "$inter",
  color: "$paMoonLight",
  fontSize: 11,
})

export const DesktopFooter = () => {
  return (
    <Background>
      <Container>
        <FooterSpan>WE ARE INEVITABLE</FooterSpan>
        <DesktopLogoImage
          src={require("../assets/p-logo.svg")}
          alt="Psychedelics logo"
        />
        <FooterLinks />
      </Container>
    </Background>
  )
}
