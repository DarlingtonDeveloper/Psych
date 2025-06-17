import React from "react"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import DollarIcon from "./DollarIcon"
import EthereumIcon from "./EthereumIcon"

const appear = stitches.keyframes({
  "0%": { opacity: 0, top: 10 },
  "100%": { opacity: 1, top: 0 },
})

const FullContainer = stitches.styled("div", {
  position: "relative",
  display: "flex",
  backgroundImage: `url(${require("../../images/slideshow/4.png")})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "$paLightGrey",
  backgroundBlendMode: "multiply",
  padding: "$xl",
  flexDirection: "column",
  "> div": {
    "+ div": {
      marginTop: "$lg",
      "@bp2": {
        marginTop: 0,
        marginLeft: "$lg",
      },
    },
  },
  "@bp2": {
    flexDirection: "row",
  },
  animation: `${appear} ease-in 0.3s`,
})

const VerseContainer = stitches.styled("div", {
  display: "flex",
  flex: "1 1 100%",
  height: "100%",
  flexDirection: "column",
})

const VerseHeader = stitches.styled("h1", {
  fontWeight: 800,
  fontSize: "2rem",
  lineHeight: 0.75,
  color: "$paLightGrey",
  "> span": {
    color: "$paIce",
  },
  "> span:first-child": {
    color: "$paYellow",
  },
  "@bp3": {
    fontSize: "3rem",
  },
})

const Icon = stitches.styled("div", {
  width: "100%",
})

const Stat = stitches.styled("div", {
  height: "fit-content",
  "@bp2": {
    margin: "auto",
  },
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

interface MarketHeroProps {
  totalVolumeEthValue: number
  totalVolumeUsdValue: number
  loading: boolean
}

const MarketHero = ({
  totalVolumeEthValue,
  totalVolumeUsdValue,
  loading,
}: MarketHeroProps) => (
  <FullContainer>
    <VerseContainer>
      <VerseHeader css={{ maxWidth: "10rem " }}>
        <span>PA</span>
        <span>VERSE</span> MARKET VALUE
      </VerseHeader>
    </VerseContainer>
    <VerseContainer>
      <Stat>
        {loading ? (
          <ScaleLoader color={stitches.theme.colors.paIce.value} height={25} />
        ) : (
          <>
            <Icon>
              <EthereumIcon />
            </Icon>
            <StatItem>
              <VerseHeader css={{ color: "$paIce" }}>{`${(
                totalVolumeEthValue / 1000
              ).toFixed(2)}K`}</VerseHeader>
              <Label>ETH</Label>
            </StatItem>
          </>
        )}
      </Stat>
    </VerseContainer>
    <VerseContainer>
      <Stat>
        {loading ? (
          <ScaleLoader color={stitches.theme.colors.paIce.value} height={25} />
        ) : (
          <>
            <Icon>
              <DollarIcon />
            </Icon>
            <StatItem>
              <VerseHeader css={{ color: "$paIce" }}>{`${(
                totalVolumeUsdValue / 1000000
              ).toFixed(2)}M`}</VerseHeader>
              <Label>USD</Label>
            </StatItem>
          </>
        )}
      </Stat>
    </VerseContainer>
  </FullContainer>
)

export default MarketHero
