import React from "react"
import stitches from "../../stitches"
import Button from "./Button"

interface LinkBoxProps {
  openSeaLink: string
  looksRareLink: string
}

const ButtonContainer = stitches.styled("div", {
  display: "flex",
  fontSize: "inherit",
  width: "100%",
  "> a": {
    "+ a": {
      marginLeft: "$rg",
    },
  },
})

const LinkBox = ({ openSeaLink, looksRareLink }: LinkBoxProps) => (
  <ButtonContainer>
    <Button href={openSeaLink}>opensea</Button>
    {looksRareLink && <Button href={looksRareLink}>looksrare</Button>}
  </ButtonContainer>
)

export default LinkBox
