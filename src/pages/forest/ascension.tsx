import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  AscensionContentContainer,
  CherryContainer,
  CherryContentWrapper,
  CherryDesc,
  CherryItem,
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

const Ascension = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData } = useAuthSession()

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/ascension"
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
    <CherryContainer>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/ascension"
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
          <CherryItem>/ A S C E N S I O N</CherryItem>
          <CherryDesc css={{ ...fadeInAnimation(1.5) }}>
            We live as dying cherry blossoms, pink <br /> inside the fury –
            reflecting the distance <br /> between us like mirrors in the dark.
          </CherryDesc>
          <Wrapper>
            <StyledButton
              onClick={() => router.push(PAGE.FOREST_BETWEEN_THE_BLOSSOMS)}
            >
              Next
            </StyledButton>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </CherryContainer>
  )
}

export function getStaticProps() {
  return {
    props: {
      headerVariant: "forestTransparent",
      footerVariant: "forestTransparent",
      version: 2,
    },
  }
}

export default Ascension
