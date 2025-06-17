import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import Button from "../../components/common/ButtonV2"
import Grid from "../../components/common/Grid"
import { useRouter } from "next/router"
import { useCampaignContext } from "../../context/CampaignProvider"

const Container = stitches.styled("section", {
  backgroundImage: `url(${require("../../images/psypay/base.jpg?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
  padding: "8rem $lg",
  width: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, rgba(22, 63, 37, 1) 0%, rgba(22, 63, 37, 1) 30%, rgba(67, 114, 77, 1) 60%, rgba(152, 178, 135, 0.5) 90%)",
    mixBlendMode: "multiply",
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
})
const ContentContainer = stitches.styled(MaxContainer, {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  color: "$paIce",
  gap: "$rg",
})
const GridContainer = stitches.styled(Grid, {
  gridTemplateRows: "min-content max-content min-content 1fr",
  gap: "8px",
  color: "$paMoonLight",
  justifyContent: "center",
})

const GridItem = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const PsyPayHeader = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontSize: "$xxl",
  textTransform: "uppercase",
  textAlign: "center",
})

const Number = stitches.styled("span", {
  color: "$paGreenV2",
})

const PASubHeader = stitches.styled("h2", {
  fontFamily: "$inter",
  fontSize: "$rg",
  fontWeight: 400,
  letterSpacing: "5px",
  textTransform: "uppercase",
  textAlign: "center",
  marginTop: "$lg",
})

const PackWrapper = stitches.styled("div", {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "7rem",
  height: "14rem",
  backgroundSize: "contain",

  backgroundImage:
    "url(https://new-dawn-assets.b-cdn.net/campaigns/psychedelics-anonymous/previews/PA-Pack-Legendary.png)",
})

const PackWrapperContainer = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

export const Success = () => {
  const { query } = useRouter()
  const { pack } = useCampaignContext()
  const [packImg, setPackImg] = useState(
    "https://psychedelicsanonymous-assets.b-cdn.net/campaigns/PA-Pack-Psy.png"
  )
  useEffect(() => {
    if (pack) {
      setPackImg(pack.preview)
    }
  }, [pack])

  return (
    <>
      <Container>
        <MetaHead
          title="Psychedelics Anonymous | Psy Packs"
          description="Enter to buy Psy Packs using your Psy Points."
          link="/psy-packs"
        />
        <ContentContainer>
          <GridContainer>
            <GridItem>
              <PASubHeader>YOU HAVE</PASubHeader>
            </GridItem>
            <GridItem>
              <PsyPayHeader>
                <Number>{query.packs} </Number>
                PSY PACKS
              </PsyPayHeader>
            </GridItem>
            <GridItem>
              <Button
                css={{ height: "$sm", margin: "$lg", fontSize: "$xs" }}
                onClick={() => {
                  window.open("https://newdawn.xyz", "_blank")
                }}
              >
                VISIT NEW DAWN TO OPEN YOUR PACKS
              </Button>
            </GridItem>
            <GridItem>
              <PackWrapperContainer>
                <PackWrapper
                  css={{
                    backgroundImage: `url(${packImg})`,
                    transform:
                      "rotate(-20deg) translateY(40px) translateX(10px)",
                  }}
                />
                <PackWrapper
                  css={{
                    backgroundImage: `url(${packImg})`,
                    zIndex: 1,
                  }}
                />
                <PackWrapper
                  css={{
                    backgroundImage: `url(${packImg})`,
                    transform:
                      "rotate(20deg) translateY(40px) translateX(-10px)",
                  }}
                />
              </PackWrapperContainer>
            </GridItem>
          </GridContainer>
        </ContentContainer>
      </Container>
    </>
  )
}

export default Success
