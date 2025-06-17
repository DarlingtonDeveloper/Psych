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
  LockTitle,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { sessionHandler } from "../../utils/sessionStorage"
import { fadeInAnimation } from "../../stitches/recipes"
import Box from "../../components/common/Box"
import { ScaleLoader } from "react-spinners"
import { useAuthSession } from "../../hooks/useAuthSession"
import stitches from "../../stitches"
import Button from "../../components/common/ButtonV2"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

const ChapterThree = () => {
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
          link="/forest/chapter-three"
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
        link="/forest/chapter-three"
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
                src={require("../../images/forest/lock.png?url")}
                alt="Impact Logo"
              />
            </Box>
            <LockItem>Chapter III</LockItem>
            <LockTitle>The symmetry of surrender.</LockTitle>
            <LockDesc
              css={{ ...fadeInAnimation(1.5) }}
              style={{ fontWeight: "bold" }}
            >
              If you think you are free,
              <br />
              there’s no escape possible.
            </LockDesc>
            <Box css={{ marginTop: "30px" }}>— Ram Dass</Box>
            <Button
              style={{ marginTop: "30px" }}
              onClick={() => router.push("/forest/the-forest")}
            >
              Next
            </Button>
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

export default ChapterThree
