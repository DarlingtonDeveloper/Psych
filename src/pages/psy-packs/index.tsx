import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import Button from "../../components/common/ButtonV2"
import ButtonLoading from "../../components/common/ButtonLoading"
import LockIcon from "../../components/PsyPoints/LockIcon"
import { Text } from "../../components/common/Text"
import PackInformation from "./PackInformation"
import Cart from "./Cart"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { useRouter } from "next/router"
import {
  useCampaignContext,
  CampaignProvider,
} from "../../context/CampaignProvider"

const Container = stitches.styled("section", {
  backgroundImage: `url(${require("../../images/psypay/bg.jpg?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
  padding: "8rem $lg",
  width: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(#91B27D 10%, #4C744E 80%)",
    mixBlendMode: "multiply",
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
})

const ContentContainer = stitches.styled(MaxContainer, {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  color: "$paIce",
  gap: "$rg",
})

const PsyPayHeader = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontSize: "$xxl",
  textTransform: "uppercase",
  textAlign: "center",
})

const PASubHeader = stitches.styled("h2", {
  fontFamily: "$inter",
  fontSize: "$md",
  fontWeight: 400,
  letterSpacing: "5px",
  textTransform: "uppercase",
  textAlign: "center",
})

const InformationContainerOg = stitches.styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "$rg",
  width: "100%",
  justifyContent: "center",
  "@bp3": {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
})

const InformationContainer = stitches.styled("div", {
  gap: "$rg",
  width: "100%",
  justifyContent: "center",
  "@bp3": {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "auto",
  },
})

const InformationContainer2 = stitches.styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: "$rg",
  width: "100%",
  marginTop: "$sm",
  "@bp3": {
    flexDirection: "row-reverse",
  },
})

const BlankSpace = stitches.styled("div", {
  gridColumn: "1",
  gridRow: "2 / span 1",
})
const Disclaimer = stitches.styled("div", {
  gridColumn: "2",
  gridRow: "2 / span 1",
})

const StyledButton = stitches.styled(Button, {
  gap: "8px",
  borderRadius: 5,
})
const ButtonWrapper = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
})

const PsyPayPage = () => {
  const router = useRouter()
  const { campaign, pack } = useCampaignContext()
  const [soldout, setSoldout] = useState(false)

  useEffect(() => {
    if (campaign && pack) {
      setSoldout(pack.soldout)
    }
  }, [campaign, pack])

  const {
    globalConnectStatus,
    globalConnectControls,
    userHasGST,
    userHasGSTEZU,
    walletStatus,
  } = useGlobalConnectContext()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <CampaignProvider>
        <Container>
          <MetaHead
            title="Psychedelics Anonymous | PsyPoints"
            description="We are the night."
            link="/psy-packs"
          />

          <ContentContainer>
            <PsyPayHeader>Psy Packs</PsyPayHeader>
            <PASubHeader>NEW DAWN</PASubHeader>

            <ButtonWrapper>
              {globalConnectStatus.isConnecting && walletStatus.connected ? (
                <Button css={{ marginTop: "$lg" }} disabled={true}>
                  <ButtonLoading color={stitches.theme.colors.paLupine.value} />
                </Button>
              ) : globalConnectStatus.connected ? (
                <StyledButton
                  onClick={() => {
                    globalConnectControls.disconnect()
                    router.push("/psy-packs")
                  }}
                >
                  DISCONNECT
                </StyledButton>
              ) : (
                !soldout && (
                  <StyledButton onClick={globalConnectControls.connectV2}>
                    <LockIcon />
                    CONNECT
                  </StyledButton>
                )
              )}
            </ButtonWrapper>

            {!globalConnectStatus.connected ? (
              <InformationContainerOg>
                <PackInformation />
                {userHasGST &&
                  userHasGSTEZU &&
                  globalConnectStatus.connected && <Cart />}
              </InformationContainerOg>
            ) : (
              <>
                <InformationContainer>
                  <PackInformation />
                  <BlankSpace />
                  {userHasGST &&
                    userHasGSTEZU &&
                    globalConnectStatus.connected && (
                      <>
                        <Cart />
                        {!isMobile && (
                          <Disclaimer>
                            <Text
                              css={{
                                fontSize: "$sm",
                                fontFamily: "$inter",
                                textAlign: "justify",
                                textJustify: "inter-word",
                              }}
                            >
                              * If you input an incorrect wallet address when
                              purchasing a Trait Pack you will NOT receive the
                              Trait Pack you purchased and Voltura Labs Pty Ltd
                              T/A NewDawn.xyz is not liable for your error and
                              will not provide a refund.
                            </Text>
                          </Disclaimer>
                        )}
                      </>
                    )}
                </InformationContainer>
                {userHasGST &&
                  userHasGSTEZU &&
                  globalConnectStatus.connected &&
                  isMobile && (
                    <InformationContainer2>
                      <Text
                        css={{
                          fontSize: "$sm",
                          fontFamily: "$inter",
                          textAlign: "justify",
                          textJustify: "inter-word",
                        }}
                      >
                        * If you input an incorrect wallet address when
                        purchasing a Trait Pack you will NOT receive the Trait
                        Pack you purchased and Voltura Labs Pty Ltd T/A
                        NewDawn.xyz is not liable for your error and will not
                        provide a refund.
                      </Text>
                    </InformationContainer2>
                  )}
              </>
            )}
          </ContentContainer>
        </Container>
      </CampaignProvider>
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

export default PsyPayPage
