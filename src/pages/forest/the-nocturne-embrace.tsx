import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  AscensionContentContainer,
  LoreContainer,
  CherryContentWrapper,
  LoreDesc,
  ContentContainer,
  DisconnectBtn,
  DisconnectWrapper,
  EnterContainer,
  StyledButton,
  Wrapper,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { fadeInAnimation } from "../../stitches/recipes"
import { useAuthSession } from "../../hooks/useAuthSession"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import Box from "../../components/common/Box"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

const TheNocturneEmbrace = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData } = useAuthSession()

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/the-bone-machine"
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
    <LoreContainer>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-bone-machine"
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
            This nocturne embrace exhales the rising <br /> and demising of
            wallflower nights <br /> and famine days – as the bone machine{" "}
            <br /> emerges from the tragedy of commons <br /> to meet the
            eternal evening.
          </LoreDesc>
          <Wrapper>
            <StyledButton onClick={() => router.push(PAGE.FOREST_BONE_MACHINE)}>
              Next
            </StyledButton>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </LoreContainer>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default TheNocturneEmbrace
