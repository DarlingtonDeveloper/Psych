import React from "react"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import stitches from "../../stitches"
import Button from "../../components/common/ButtonV2"
import ButtonLoading from "../../components/common/ButtonLoading"
import LockIcon from "../../components/PsyPoints/LockIcon"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"

const image = require("./assets/psilocybin_background.png")

const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "#000000",
  backgroundImage: `url(${image})`,
  backgroundOrigin: "border-box",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
})

const Heading = stitches.styled("h1", {
  fontFamily: "$sawton",
  color: "$paMoonLight",
  textAlign: "center",

  fontSize: 44,
  lineHeight: "39px",
  "@bp2": {
    fontSize: 89,
    lineHeight: "134px",
  },
})

const SecondaryHeading = stitches.styled("h2", {
  fontFamily: "$inter",
  fontSize: 24,
  lineHeight: "60px",
  color: "$paMoonLight",
  textAlign: "center",
  fontWeight: 500,
  letterSpacing: 3,
})

const Text = stitches.styled("p", {
  fontFamily: "$inter",
  fontSize: 16,
  lineHeight: "32px",
  fontWeight: 700,
  textAlign: "center",
  color: "$paMoonLight",
})

const TextWrapper = stitches.styled("div", {
  width: "100%",
  "@bp2": {
    margin: "0 auto",
    width: 405,
  },
})

const Fade = stitches.styled("div", {
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  background: " linear-gradient(180deg, rgba(30, 30, 30, 0) 30%, #1E1E1E 100%)",
  mixBlendMode: "multiply",
  transform: "rotate(-180deg)",
})

const Fade2 = stitches.styled("div", {
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  background: "linear-gradient(180deg, rgba(30, 30, 30, 0) 80%, #1E1E1E 100%)",
  mixBlendMode: "multiply",
})

const Body = stitches.styled("div", {
  zIndex: 2,
})

const StyledButton = stitches.styled(Button, {
  gap: "8px",
  borderRadius: 5,
})

const ButtonWrapper = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  margin: "3rem",
})

export const StakingV3 = () => {
  const { globalConnectControls, globalConnectStatus, walletStatus } =
    useGlobalConnectContext()

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | Staking"
        description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
        link="/staking"
      />
      <Fade />
      <Fade2 />
      <Body>
        <Heading>THE MYCELIA</Heading>
        <SecondaryHeading>2.0</SecondaryHeading>
        <TextWrapper>
          <Text>
            Unlock rewards. Earn PSY points. <br /> Claim at your convenience.
          </Text>
        </TextWrapper>
        <ButtonWrapper>
          {globalConnectStatus.isConnecting && walletStatus.connected ? (
            <Button css={{ marginTop: "$lg" }} disabled={true}>
              <ButtonLoading color={stitches.theme.colors.paLupine.value} />
            </Button>
          ) : (
            <StyledButton onClick={globalConnectControls.connectV2}>
              <LockIcon />
              CONNECT
            </StyledButton>
          )}
        </ButtonWrapper>
      </Body>
    </Container>
  )
}
