import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  Lore4Container,
  CherryContentWrapper,
  LoreDesc,
  ContentContainer,
  DisconnectBtn,
  DisconnectWrapper,
  EnterContainer,
  StyledButton,
  Wrapper,
  AscensionContentContainer,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { fadeInAnimation } from "../../stitches/recipes"
import { useAuthSession } from "../../hooks/useAuthSession"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import Box from "../../components/common/Box"
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
          link="/forest/the-inexplicable-calm"
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
    <Lore4Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-inexplicable-calm"
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
          <LoreDesc css={{ ...fadeInAnimation(1.5) }}>
            We move in echoes against the tyranny of detachment,
            <br />
            becoming shaman-trailblazers entranced by the quiet <br />
            entwine of neutron and fire. Wrapped within the <br /> ruptured
            whispers of prism and space – the inexplicable
            <br />
            calm – we measure the death of the morning. <br />
            <br />
            We are alive.
          </LoreDesc>
          <Wrapper>
            <StyledButton
              onClick={() => router.push(PAGE.FOREST_CHAPTER_THREE)}
            >
              Next
            </StyledButton>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </Lore4Container>
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
