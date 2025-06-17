import React, { useState, useEffect } from "react"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import stitches from "../../stitches"
import MushroomCircle from "../../components/PsyPoints/MushroomCircle"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { useCampaignContext } from "../../context/CampaignProvider"

const Container = stitches.styled("div", {
  display: "flex",
  flexGrow: "2",
  backgroundColor: "$paLupine",
  flexDirection: "column",
  padding: "$lg",
  gap: "$lg",
  maxWidth: "50rem",
  borderRadius: "12px",
  "@bp3": {
    flexDirection: "row",
    gridColumn: "1",
    gridRow: "1 / span 1",
  },
})

const Column = stitches.styled("div", {
  display: "flex",
  flex: "1 1 50%",
  flexDirection: "column",
  gap: "$lg",
  justifyContent: "space-between",
})

const Row = stitches.styled("div", {
  display: "flex",
  flex: "1 1 50%",
  flexDirection: "row",
  gap: "$lg",
  justifyContent: "flex-start",
  alignItems: "flex-end",
})

const PackWrapper = stitches.styled(Box, {
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  backgroundSize: "contain",
  top: 0,
  height: "50vh",
  "@bp3": {
    height: "100%",
  },
})

const Inclusions = stitches.styled("p", {
  color: "$dawnMoonLight",
  fontStyle: "italic",
  lineHeight: 1.75,
  fontFamily: "$inter",
  fontSize: "$sm",
})

const PackInformation = () => {
  const { globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()
  const { campaign, pack } = useCampaignContext()
  const [packImg, setPackImg] = useState("")
  const [soldout, setSoldout] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (campaign && pack) {
      setPackImg(pack.preview)
      setSoldout(pack.soldout)
      setPrice(pack.price)
    }
  }, [campaign, pack])

  return (
    <Container>
      <Column>
        <Box css={{ display: "flex", alignItems: "center" }}>
          <MushroomCircle variant="light" />
          <Box
            css={{
              fontFamily: "$sawton",
              fontSize: "$lg",
              marginLeft: "$md",
              textTransform: "uppercase",
            }}
          >
            Psy Points
          </Box>
        </Box>
        <Box
          css={{
            fontFamily: "$inter",
            backgroundColor: "#3B3935",
            padding: "$xs",
            width: "fit-content",
          }}
        >
          <Box
            css={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "$inter",
            }}
          >
            {price} PSY
          </Box>

          <Box css={{ lineHeight: 1.0 }}>
            <Inclusions>5 x Traits</Inclusions>
            <Inclusions css={{ fontStyle: "normal" }}>
              (Trait rarity types contained <br />
              in PSY Packs are random)
            </Inclusions>
          </Box>
        </Box>
        <Box css={{ lineHeight: 1.75, fontFamily: "$inter", fontSize: "$sm" }}>
          PSY Packs can contain Legendary, Uncommon and Common traits to upgrade
          your Genesis PFP and evolve your digital identity on New Dawn.
        </Box>

        <Row css={{}}>
          <Button
            css={{ maxHeight: "50px" }}
            onClick={() => {
              window.open("https://newdawn.xyz", "_blank")
            }}
          >
            New Dawn
          </Button>
          {!globalConnectStatus.connected &&
            (!soldout ? (
              <Button
                css={{
                  backgroundColor: "$paGreenV2",
                  border: "1px solid $paGreenV2",
                }}
                onClick={globalConnectControls.connectV2}
              >
                Buy Packs
              </Button>
            ) : (
              <Button
                css={{
                  backgroundColor: "$paRedV2",
                  border: "1px solid $paRed",
                }}
                disabled
              >
                SOLD OUT
              </Button>
            ))}
        </Row>
      </Column>
      <Column>
        <PackWrapper
          css={{
            backgroundImage: `url(${packImg})`,
          }}
        />
      </Column>
    </Container>
  )
}

export default PackInformation
