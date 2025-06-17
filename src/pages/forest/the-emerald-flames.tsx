import React from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  AscensionContentContainer,
  Lore3Container,
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

const TheEmeraldFlamesPage = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData } = useAuthSession()

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/the-flames-of-destiny"
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
    <Lore3Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-flames-of-destiny"
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
          <LoreDesc css={{ ...fadeInAnimation(0.5) }}>
            Unfolding like fabric through the endless <br />
            arcades of heresy and prayer, we are <br />
            petals in bloom drowning yesterday with <br />
            the emerald flames of lunar renascence.
          </LoreDesc>
          <Wrapper>
            <StyledButton
              onClick={() => router.push(PAGE.FOREST_FLAMES_OF_DESTINY)}
            >
              Next
            </StyledButton>
          </Wrapper>
        </CherryContentWrapper>
      </AscensionContentContainer>
    </Lore3Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default TheEmeraldFlamesPage
