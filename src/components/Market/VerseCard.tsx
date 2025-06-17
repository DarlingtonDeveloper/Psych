import React from "react"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import LinkBox from "./LinkBox"
import VerseHeader from "./VerseHeader"
import { ScaleLoader } from "react-spinners"

interface VerseCardProps {
  imgSrc: string
  alt: string
  header: string
  loading: boolean
  ethValue: number
  openSeaLink?: string
  looksRareLink?: string
}

const appear = stitches.keyframes({
  "0%": { opacity: 0, top: 10 },
  "100%": { opacity: 1, top: 0 },
})

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  "@bp2": {
    flexDirection: "row",
  },
  animation: `${appear} ease-in 0.3s`,
  opacity: 0,
  animationDelay: "0.2s",
  animationFillMode: "forwards",
})

const StatItem = stitches.styled("div", {
  display: "flex",
  alignItems: "baseline",
})

const Label = stitches.styled("div", {
  fontWeight: 200,
  color: "$paIce",
  fontSize: "$rg",
  marginLeft: "$xs",
})

const PreviewContainer = stitches.styled("div", {
  display: "flex",
  height: "fit-content",
  alignContent: "center",
  justifyContent: "center",
  zIndex: 1,
  "@bp2": {
    top: 0,
  },
})

const Preview = stitches.styled("img", {
  borderRadius: "50%",
  width: "6rem",
  height: "6rem",
  aspectRatio: "1 / 1",
  "@bp2": {
    width: "15rem",
    borderRadius: 0,
    height: "auto",
  },
})

const Details = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  top: "-3rem",
  backgroundColor: "$paMid",
  flex: "1 1 100%",
  padding: "$lg",
  paddingTop: "calc(3rem + $lg)",
  "@bp2": {
    top: 0,
    padding: "$lg",
  },
  "> *": {
    "+ *": {
      marginTop: "$lg",
    },
  },
})

const VerseCard = ({
  imgSrc,
  alt,
  header,
  ethValue,
  openSeaLink = "",
  looksRareLink = "",
  loading,
}: VerseCardProps) => (
  <Container>
    <PreviewContainer>
      <Preview src={imgSrc} alt={alt} />
    </PreviewContainer>
    <Details>
      <GenesisHeader css={{ fontSize: "$rg" }}>{header}</GenesisHeader>
      {loading ? (
        <ScaleLoader color={stitches.theme.colors.paIce.value} height={25} />
      ) : (
        <StatItem>
          <VerseHeader css={{ color: "$paIce" }}>
            {ethValue.toFixed(2)}
          </VerseHeader>
          <Label>ETH</Label>
        </StatItem>
      )}
      <LinkBox openSeaLink={openSeaLink} looksRareLink={looksRareLink} />
    </Details>
  </Container>
)

export default VerseCard
