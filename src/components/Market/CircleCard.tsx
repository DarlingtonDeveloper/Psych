import React from "react"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import LinkBox from "./LinkBox"
import VerseHeader from "./VerseHeader"

interface CircleCardProps {
  circleImage: React.ReactElement
  header: string
  ethValue: number
  openSeaLink: string
  looksRareLink?: string
  loading: boolean
}

const appear = stitches.keyframes({
  "0%": { opacity: 0, top: 10 },
  "100%": { opacity: 1, top: 0 },
})

const Container = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
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

const CirclePreviewContainer = stitches.styled("div", {
  display: "flex",
  height: "fit-content",
  alignContent: "center",
  justifyContent: "center",
  zIndex: 1,
})

const ShortDetails = stitches.styled("div", {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$paMid",
  flex: "1 1 100%",
  padding: "$lg",
  paddingTop: "calc(3rem + $lg)",
  top: "-3rem",
  "> *": {
    "+ *": {
      marginTop: "$lg",
    },
  },
})

const CircleCard = ({
  circleImage,
  header,
  ethValue,
  openSeaLink,
  loading,
  looksRareLink = "",
}: CircleCardProps) => (
  <Container>
    <CirclePreviewContainer>{circleImage}</CirclePreviewContainer>
    <ShortDetails>
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
    </ShortDetails>
  </Container>
)

export default CircleCard
