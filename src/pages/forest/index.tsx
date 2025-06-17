import React, { useEffect } from "react"
import { useRouter } from "next/router"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  Container,
  ContentContainer,
  EgoHeader,
  EgoDescription,
  ConnectWallet,
} from "../../styles/forest-styles"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import { fadeInAnimation } from "../../stitches/recipes"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import jwt from "jsonwebtoken"
import pages from "../../lib/forest-pages"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

const Forest = () => {
  const router = useRouter()
  const {
    globalConnectStatus,
    globalConnectSession,
    globalConnectControls,
    walletStatus,
  } = useGlobalConnectContext()

  useEffect(() => {
    if (globalConnectStatus.connected) {
      const { progress } = jwt.decode(globalConnectSession!) as {
        progress: number
      }
      if (progress <= 3) {
        router.push(PAGE.FOREST_ENTER)
      } else {
        router.push(pages[progress])
      }
    }
  }, [router, globalConnectStatus.connected, globalConnectSession])

  useEffect(() => {
    router.prefetch(PAGE.FOREST_ENTER)
  }, [router])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest"
      />
      <MaxContainer>
        <ContentContainer>
          <EgoHeader>
            The
            <br />
            Forest
          </EgoHeader>
          <ConnectWallet>
            {globalConnectStatus.isConnecting && walletStatus.connected ? (
              <Button disabled={true}>
                <ScaleLoader
                  color={stitches.theme.colors.paLupine.value}
                  height={15}
                />{" "}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  globalConnectControls.connectV2()
                }}
              >
                Connect Wallet
              </Button>
            )}
          </ConnectWallet>
          <EgoDescription css={{ ...fadeInAnimation(1.5) }}>
            <Box
              css={{ marginTop: "$lg", lineHeight: "32px", textAlign: "left" }}
            >
              To understand nature as a teacher, <br /> we must first realise
              that we are nature.
            </Box>
            <Box css={{ fontWeight: "100", textAlign: "left" }}>
              — Dr. Rachel Lovie, Ph.D.
            </Box>
          </EgoDescription>
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

export default Forest
