import React from "react"
import stitches from "../../stitches"
import LinkBox from "./LinkBox"

interface PassCardProps {
  image: string
  header: string
  description: string
  openSeaLink: string
  looksRareLink: string
}

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  fontSize: "$rg",
  marginBottom: "5rem",
  flex: "1 1",
  alignItems: "baseline",
  justifyContent: "space-between",
  ">div:last-child": {
    marginTop: "$lg",
  },
})

const Content = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  "> img": {
    width: "100%",
    objectFit: "contain",
    aspectRatio: "1 / 1",
  },
  "> h1": {
    fontSize: "$md",
    color: "$paLightGrey",
    fontWeight: 200,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginTop: "$lg",
  },
  "> h1:before": {
    content: "/",
    color: "$paYellow",
    fontSize: "$md",
    marginRight: "$sm",
  },
  "> p": {
    marginBottom: 0,
    marginTop: "$lg",
    lineHeight: 1.5,
  },
})

const P = stitches.styled("p", {
  fontWeight: 200,
  color: "$paLightGrey",
})

const PassCard = ({
  image,
  header,
  description,
  openSeaLink,
  looksRareLink,
}: PassCardProps) => (
  <Container>
    <Content>
      <img src={image} alt={description} />
      <h1>{header}</h1>
      <P>{description}</P>
    </Content>
    <LinkBox openSeaLink={openSeaLink} looksRareLink={looksRareLink} />
  </Container>
)

export default PassCard
