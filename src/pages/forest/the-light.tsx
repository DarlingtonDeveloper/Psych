import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  Lore7Container,
  CherryContentWrapper,
  LoreDesc,
  ContentContainer,
  DisconnectBtn,
  DisconnectWrapper,
  EnterContainer,
  Wrapper,
  AscensionContentContainer,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { fadeInAnimation } from "../../stitches/recipes"
import { useAuthSession } from "../../hooks/useAuthSession"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

const TheLightLore = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData } = useAuthSession()

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/the-light"
        />
        <MaxContainer>
          <ContentContainer>
            <Box css={{ display: "flex", justifyContent: "center" }}>
              <ScaleLoader
                color={stitches.theme.colors.paLupine.value}
                height={26}
              />
            </Box>
          </ContentContainer>
        </MaxContainer>
      </EnterContainer>
    )
  }

  return (
    <Lore7Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-light"
      />
      <AscensionContentContainer>
        <DisconnectWrapper>
          <DisconnectBtn
            css={{
              backgroundColor: "$paLupine",
              borderBlockColor: "$paLupine",
              color: "$paIce",
              border: "none",
            }}
            onClick={() => {
              globalConnectControls.disconnect()
              router.push(PAGE.FOREST)
            }}
          >
            Disconnect
          </DisconnectBtn>
        </DisconnectWrapper>
        <CherryContentWrapper>
          <LoreDesc css={{ color: "$paDark", ...fadeInAnimation(1.5) }}>
            We meet in portals amongst the galaxies, locked in stellar arms
            <br />
            and traveling light years - immortal in cosmic intimacy and
            <br />
            quantum ecstasies emitting from every motion.
            <br />
            <br />
            In streams of endless suns, we melt iron into blinding luminosity
            <br />– spinning relentlessly - in the universe of one inside the
            other.
          </LoreDesc>
          <Wrapper>
            <Button
              css={{
                marginTop: "50px",
                backgroundColor: "$paLupine",
                borderBlockColor: "$paLupine",
                color: "$paIce",
                border: "none",
              }}
              onClick={() => router.push(PAGE.FOREST_CHAPTER_FIVE)}
            >
              Next
            </Button>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </Lore7Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default TheLightLore
