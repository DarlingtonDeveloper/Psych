import React, { useEffect, useState } from "react"
import Fold from "../components/common/Fold"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import CircleCard from "../components/Market/CircleCard"
import CirclePreview from "../components/Market/CirclePreview"
import CirclePreviewIcon from "../components/Market/CirclePreviewIcon"
import VerseCard from "../components/Market/VerseCard"
import MarketHero from "../components/Market/MarketHero"
import { useQuery } from "react-query"
import axios from "axios"

type OpenSeaResult = {
  oneDayVolume: number
  oneDayChange: number
  oneDaySales: number
  oneDayAveragePrice: number
  sevenDayVolume: number
  sevenDayChange: number
  sevenDaySales: number
  sevenDayAveragePrice: number
  thirtyDayVolume: number
  thirtyDayChange: number
  thirtyDaySales: number
  thirtyDayAveragePrice: number
  totalVolume: number
  totalSales: number
  totalSupply: number
  count: number
  numOwners: number
  averagePrice: number
  numReports: number
  marketCap: number
  floorPrice: number
}

interface OpenSeaStatistics {
  genesisStats: OpenSeaResult
  metaStats: OpenSeaResult
  irlStats: OpenSeaResult
  componentOneStats: OpenSeaResult
  componentTwoStats: OpenSeaResult
  pappStats: OpenSeaResult
  componentThreeStats: OpenSeaResult
  psilocybinStats: OpenSeaResult
}

interface ETHUSDExchange {
  USD: number
}

const Container = stitches.styled(Fold, {
  background: `url(${require("../images/slideshow/1.png?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "$paDark",
  backgroundBlendMode: "soft-light",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  justifyContent: "flex-start",
  "> div": {
    "+ div": {
      marginTop: "$lg",
    },
  },
})

const GridContainer = stitches.styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(1fr, 20rem))",
  gridRowGap: "$lg",
  width: "100%",
  "@bp4": {
    gridColumnGap: "$lg",
    gridRowGap: "$lg",
    gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
  },
})

const VerseContainer = stitches.styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(1fr, 40rem))",
  gridRowGap: "$lg",
  width: "100%",
  "@bp4": {
    gridColumnGap: "$lg",
    gridRowGap: "$lg",
    gridTemplateColumns: "repeat(auto-fit, minmax(40rem, 1fr))",
  },
})

const PAPPCicleIcon = stitches.styled(CirclePreviewIcon, {
  "> img": {
    width: "5rem",
    height: "5rem",
  },
})

const preloadImages = [
  require("../images/market-preview.png?url"),
  require("../images/collection-slideshow/1.png?url"),
  require("../images/component-1-market.png?url"),
  require("../images/component-2-market.png?url"),
  require("../images/p-icon-yellow.svg?url"),
  require("../images/p-icon-blue.svg?url"),
]

const CollectionPage = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const osQuery = useQuery("os-statistics", async () => {
    const request = await axios.get<OpenSeaStatistics>(
      process.env.NEXT_PUBLIC_OS_STATISTICS_ENDPOINT as string
    )
    return request.data
  })
  const cryptoQuery = useQuery("eth-usd-exchange", async () => {
    const request = await axios.get<ETHUSDExchange>(
      process.env.NEXT_PUBLIC_ETH_USD_EXCHANGE_ENDPOINT as string
    )

    return request.data
  })

  useEffect(() => {
    preloadImages.forEach((pi) => {
      const image = new Image()
      image.src = pi
      image.onload = () => {
        setAssetsLoaded((a) => a + 1)
      }
    })
  }, [])

  const assetsDone = assetsLoaded === preloadImages.length
  const statsLoading = osQuery.isLoading || cryptoQuery.isLoading

  const genesisEthValue = osQuery.isSuccess
    ? osQuery.data.genesisStats.floorPrice
    : 0
  const metaEthValue = osQuery.isSuccess ? osQuery.data.metaStats.floorPrice : 0
  const irlEthValue = osQuery.isSuccess ? osQuery.data.irlStats.floorPrice : 0
  const componentOneEthValue = osQuery.isSuccess
    ? osQuery.data.componentOneStats.floorPrice
    : 0
  const componentTwoEthValue = osQuery.isSuccess
    ? osQuery.data.componentTwoStats.floorPrice
    : 0
  const pappEthValue = osQuery.isSuccess ? osQuery.data.pappStats.floorPrice : 0
  const componentThreeEthValue = osQuery.isSuccess
    ? osQuery.data.componentThreeStats.floorPrice
    : 0
  const psilocybinEthValue = osQuery.isSuccess
    ? osQuery.data.psilocybinStats.floorPrice
    : 0

  const fullSetEthValue =
    genesisEthValue +
    metaEthValue +
    irlEthValue +
    componentOneEthValue +
    componentTwoEthValue +
    pappEthValue +
    componentThreeEthValue
  const totalVolumeEthValue = osQuery.isSuccess
    ? osQuery.data.genesisStats.floorPrice *
        osQuery.data.genesisStats.totalSupply +
      osQuery.data.irlStats.floorPrice * osQuery.data.irlStats.totalSupply +
      osQuery.data.metaStats.floorPrice * osQuery.data.metaStats.totalSupply +
      osQuery.data.componentOneStats.floorPrice *
        osQuery.data.componentOneStats.totalSupply +
      osQuery.data.componentTwoStats.floorPrice *
        osQuery.data.componentTwoStats.totalSupply +
      osQuery.data.pappStats.floorPrice * osQuery.data.pappStats.totalSupply +
      osQuery.data.componentThreeStats.floorPrice *
        osQuery.data.componentThreeStats.totalSupply +
      osQuery.data.psilocybinStats.floorPrice *
        osQuery.data.psilocybinStats.totalSupply
    : 0

  const usdExchangeRate = cryptoQuery.data?.USD || 3000

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | PAverse"
        description="We are the night."
        link="/paverse"
      />
      {assetsDone ? (
        <>
          <GridContainer>
            <MarketHero
              totalVolumeEthValue={totalVolumeEthValue}
              totalVolumeUsdValue={totalVolumeEthValue * usdExchangeRate}
              loading={statsLoading}
            />
          </GridContainer>
          <VerseContainer>
            <VerseCard
              imgSrc={require("../images/market-preview.png?url")}
              alt="Full set image preview"
              header="full set floor price"
              ethValue={fullSetEthValue}
              loading={statsLoading}
            />
            <VerseCard
              imgSrc={require("../images/collection-slideshow/1.png?url")}
              alt="Genesis collection preview image"
              header="genesis collection"
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-genesis"
              looksRareLink="https://looksrare.org/collections/0x75E95ba5997Eb235F40eCF8347cDb11F18ff640B"
              ethValue={genesisEthValue}
              loading={statsLoading}
            />
          </VerseContainer>
          <GridContainer>
            <CircleCard
              circleImage={
                <CirclePreview
                  src={require("../images/component-1-market.png?url")}
                  alt="Component #1 market preview"
                />
              }
              header="Component #1"
              ethValue={componentOneEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-component-1"
              looksRareLink="https://looksrare.org/collections/0x5501024dDb740266Fa0d69d19809EC86dB5E3f8b"
            />
            <CircleCard
              circleImage={
                <CirclePreview
                  src={require("../images/component-2-market.png?url")}
                  alt="Component #2 market preview"
                />
              }
              header="Component #2"
              ethValue={componentTwoEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-component-two"
              looksRareLink="https://looksrare.org/collections/0xA7B6cb932EEcACd956454317d59c49AA317e3C57"
            />
            <CircleCard
              circleImage={
                <CirclePreview
                  src={require("../images/component-3-market.png?url")}
                  alt="Component #3 market preview"
                />
              }
              header="Component #3"
              ethValue={componentThreeEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-component-three"
              looksRareLink="https://looksrare.org/collections/0xc8Cc20febE260C62A9717534442D4E499F9DE741"
            />
            <CircleCard
              circleImage={
                <CirclePreviewIcon
                  img={require("../images/p-icon-yellow.svg?url")}
                  alt="Meta Pass Yellow P Icon market preview"
                />
              }
              header="Metaverse Pass"
              ethValue={metaEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/metaverse-psychedelics-anonymous-pass"
              looksRareLink="https://looksrare.org/collections/0x22674fd4CE74765C211EeC01698fda36f57A650A"
            />
            <CircleCard
              circleImage={
                <CirclePreviewIcon
                  img={require("../images/p-icon-blue.svg?url")}
                  alt="IRL Pass Blue P Icon market preview"
                />
              }
              header="IRL Pass"
              ethValue={irlEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/irl-psychedelics-anonymous-pass"
              looksRareLink="https://looksrare.org/collections/0x92AA4c9A4f54Fe95d0e799687D1Da12A7EBca538"
            />
            <CircleCard
              circleImage={
                <PAPPCicleIcon
                  img={require("../images/papp-icon.png?url")}
                  alt="PAPP Icon market preview"
                />
              }
              header="PAPP"
              ethValue={pappEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-printing-press"
              looksRareLink="https://looksrare.org/collections/0xC8E1de8Dc39a758C7a50F659b53F787e0F1398BD"
            />
            <CircleCard
              circleImage={
                <PAPPCicleIcon
                  img={require("../images/papp-icon.png?url")}
                  alt="Psilocybin Icon market preview"
                />
              }
              header="Psilocybin"
              ethValue={psilocybinEthValue}
              loading={statsLoading}
              openSeaLink="https://opensea.io/collection/psychedelics-anonymous-psilocybin"
            />
          </GridContainer>
        </>
      ) : null}
    </Container>
  )
}

export default CollectionPage
