import React, { useEffect } from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  Container,
  ContentContainer,
  DisconnectBtn,
  DisconnectWrapper,
  EnterContainer,
  LockContentWrapper,
  LockDesc,
  LockItem,
  TheLightButton,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { sessionHandler } from "../../utils/sessionStorage"
import { fadeInAnimation } from "../../stitches/recipes"
import Box from "../../components/common/Box"
import { ScaleLoader } from "react-spinners"
import { useAuthSession } from "../../hooks/useAuthSession"
import stitches from "../../stitches"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

const ChapterFive = () => {
  const router = useRouter()
  const { globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()

  const { sessionData } = useAuthSession()

  useEffect(() => {
    const hasSession = !!sessionHandler.getSession()
    if (!hasSession || !globalConnectStatus.connected) {
      router.push(PAGE.FOREST)
    }
  }, [router, globalConnectStatus.connected])

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/chapter-five"
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
    <Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/chapter-five"
      />
      <MaxContainer>
        <ContentContainer>
          <DisconnectWrapper>
            <DisconnectBtn
              css={{
                backgroundColor: "$paWhite",
                borderBlockColor: "$paWhite",
                color: "$paLupine",
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
          <LockContentWrapper>
            <Box css={{ margin: "15px 0 15px 0" }}>
              <img
                src={require("../../images/forest/chapter-5-icon.png?url")}
                alt="Impact Logo"
              />
            </Box>
            <LockItem>THE LIGHT</LockItem>
            <LockDesc
              css={{ ...fadeInAnimation(1.5) }}
              style={{ fontWeight: "bold" }}
            >
              The shadow is the greatest teacher
              <br />
              for how to come to the light.
            </LockDesc>
            <Box css={{ marginTop: "30px" }}>— Ram Dass</Box>
            <TheLightButton
              style={{
                marginTop: "30px",
              }}
              onClick={() => router.push(PAGE.LIGHT)}
            >
              <div className="become-light-text-wrapper">
                <p>BECOME THE LIGHT</p>
              </div>
            </TheLightButton>
          </LockContentWrapper>
        </ContentContainer>
      </MaxContainer>
    </Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default ChapterFive
