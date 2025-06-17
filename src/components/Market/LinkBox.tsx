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
  "> a": {
    "+ a": {
      marginLeft: "$rg",
    },
  },
  minHeight: "1rem",
})

const LinkBox = ({ openSeaLink, looksRareLink }: LinkBoxProps) => (
  <ButtonContainer>
    {openSeaLink && <Button href={openSeaLink}>opensea</Button>}
    {looksRareLink && <Button href={looksRareLink}>looksrare</Button>}
  </ButtonContainer>
)

export default LinkBox
