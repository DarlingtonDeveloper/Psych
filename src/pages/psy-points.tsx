import React from "react"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import MaxContainer from "../components/common/MaxContainer"
import Box from "../components/common/Box"
import Button from "../components/common/ButtonV2"
import PointInformation from "../components/PsyPoints/PointInformation"
import ClaimInformation from "../components/PsyPoints/ClaimInformation"
import { useGlobalConnectContext } from "../context/GlobalConnectProvider"
import ButtonLoading from "../components/common/ButtonLoading"

const Container = stitches.styled("section", {
  background: `url(${require("../images/psypoints/lsd_background.png?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
  padding: "8rem $lg",
  width: "100%",
})

const ContentContainer = stitches.styled(MaxContainer, {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  color: "$paIce",
  gap: "$rg",
})

const PsyPointHeader = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontSize: "$xxl",
  textTransform: "uppercase",
  textAlign: "center",
  textShadow:
    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;",
})

const InformationContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "$rg",
  width: "100%",
  marginTop: "$xl",
  justifyContent: "center",
  "@bp3": {
    flexDirection: "row",
  },
})

const PsyPointsPage = () => {
  const {
    globalConnectStatus,
    globalConnectControls,
    userHasGST,
    userHasGSTEZU,
    walletStatus,
  } = useGlobalConnectContext()

  return (
    <>
      <Container>
        <MetaHead
          title="Psychedelics Anonymous | PsyPoints"
          description="We are the night."
          link="/psy-points"
        />
        <ContentContainer>
          <PsyPointHeader>Psy Points</PsyPointHeader>
          <Box
            as="p"
            css={{
              lineHeight: 1.75,
              maxWidth: "12rem",
              fontFamily: "$inter",
              fontSize: "$sm",
              textAlign: "center",
            }}
          >
            Hold in your wallet and connect to our site to start earning.
          </Box>
          {globalConnectStatus.isConnecting && walletStatus.connected ? (
            <Button css={{ marginTop: "$lg" }} disabled={true}>
              <ButtonLoading color={stitches.theme.colors.paLupine.value} />
            </Button>
          ) : (
            !globalConnectStatus.connected && (
              <Button
                onClick={() => {
                  globalConnectControls.connectV2()
                }}
              >
                CONNECT
              </Button>
            )
          )}

          <InformationContainer>
            <PointInformation />
            {userHasGST && userHasGSTEZU && globalConnectStatus.connected && (
              <ClaimInformation />
            )}
          </InformationContainer>
        </ContentContainer>
      </Container>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default PsyPointsPage
