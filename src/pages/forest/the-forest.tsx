import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  Lore5Container,
  CherryContentWrapper,
  ForestItem,
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

const TheInexplicableCalm = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData } = useAuthSession()

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/the-forest"
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
    <Lore5Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-forest"
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
          <ForestItem>/ T H E &nbsp;F O R E S T</ForestItem>

          <LoreDesc css={{ ...fadeInAnimation(1.5) }}>
            We find ourselves unbound amongst the ravens
            <br />
            and willows – as midnight listens to the magic
            <br />
            whispers of our canopy connection.
          </LoreDesc>
          <Wrapper>
            <Button
              style={{ marginTop: "30px" }}
              onClick={() => router.push("/forest/the-veil-of-protection")}
            >
              Next
            </Button>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </Lore5Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default TheInexplicableCalm
