import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import MetaHead from "../../components/common/MetaHead"
import Fold from "../../components/common/Fold"
import MaxContainer from "../../components/common/MaxContainer"
import { motion } from "framer-motion"
import { useWalletContext } from "../../context/WalletProvider"
import { useRouter } from "next/router"
import useModal from "../../hooks/useModal"
import AttentionModal from "../../components/C3/AttentionModal"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import Button from "../../components/Staking/Button"
import { PAGE } from "../../utils/pages"

interface ModalMeta {
  header: string
  text: string
}

const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "#000000",
})

const Content = stitches.styled("div", {
  display: "grid",
  gridGap: "$lg",
  gridTemplateRows: "min-content 1fr min-content",
  width: "100%",
  minHeight: "inherit",
  "@bp2": {
    gridTemplateRows: "min-content 1fr",
  },
  "> div:nth-child(3)": {
    display: "block",
    "@bp2": {
      display: "none",
    },
  },
})

const WalletContainer = stitches.styled(motion.div, {
  "@bp2": {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    justifyItems: "center",
  },
})

const MyceliaV1Section = stitches.styled(motion.div, {
  color: "$paIce",
  textAlign: "center",
  justifySelf: "center",
  backgroundColor: "#D64949",
  maxWidth: "22rem",
  borderRadius: "10px",
  padding: "1.5rem 3rem 1.5rem 3rem",
  "@bp2": {
    padding: "1.5rem",
    gridColumn: "2",
  },
})

const Section = stitches.styled(motion.div, {
  color: "$paIce",
  width: "100%",
  textAlign: "center",
  justifySelf: "center",
  "@bp2": { justifySelf: "end", maxWidth: "10rem" },
})

const MyceliumVideo = stitches.styled(motion.video, {
  width: "100%",
  minHeight: "100%",
  objectFit: "contain",
  transform: "scale(0.7)",
  opacity: 0,
  "@bp2": {
    width: "60%",
  },
})

const TopImage = stitches.styled(motion.img, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  zIndex: 1,
})

const MyceliaContainer = stitches.styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
})

const StakingHomepage = () => {
  const { globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()
  const [_, walletStatus, walletControls] = useWalletContext()
  const [walletErrorModal, walletErrorModalControls] = useModal()
  const router = useRouter()
  const [modalMeta, setModalMeta] = useState<ModalMeta>()

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

  useEffect(() => {
    router.prefetch(PAGE.STAKING_V1_DASHBOARD)
  }, [router])

  useEffect(() => {
    if (globalConnectStatus.connected) {
      router.push(PAGE.STAKING_V1_DASHBOARD)
    }
  }, [router, globalConnectStatus.connected])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | Staking"
        description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
        link="/staking"
      />
      <MaxContainer css={{ minHeight: "calc(100vh - 16rem)" }}>
        {!isMobile ? (
          <Content>
            <WalletContainer>
              <MyceliaV1Section
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 2.5, ease: "easeIn" }}
              >
                <strong>Unstake your assets</strong> from Mycelia 1.0 and start
                earning PSY Points in{" "}
                <strong>
                  <u>Mycelia 2.0.</u>
                </strong>
              </MyceliaV1Section>
              <Section
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 3.5, ease: "easeIn" }}
              >
                {!globalConnectStatus.connected && (
                  <Button onClick={globalConnectControls.connectV2}>
                    Connect Wallet
                  </Button>
                )}
              </Section>
            </WalletContainer>
            <MyceliaContainer>
              <MyceliumVideo
                src="/mycelia-loop.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                animate={{ transform: "scale(1)", opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
              />
              <TopImage
                src={require("../../images/mycelia.png?url")}
                alt="Mycelia"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeIn" }}
              />
            </MyceliaContainer>
          </Content>
        ) : (
          <Content>
            <MyceliaV1Section
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 2.5, ease: "easeIn" }}
            >
              <strong>Unstake your assets</strong> from Mycelia 1.0 and start
              earning PSY Points in{" "}
              <strong>
                <u>Mycelia 2.0.</u>
              </strong>
            </MyceliaV1Section>
            <MyceliaContainer>
              <MyceliumVideo
                src="/mycelia-loop.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                animate={{ transform: "scale(1)", opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
              />
              <TopImage
                src={require("../../images/mycelia.png?url")}
                alt="Mycelia"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeIn" }}
              />
            </MyceliaContainer>
            <Section
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 3.5, ease: "easeIn" }}
            >
              {!globalConnectStatus.connected && (
                <Button onClick={globalConnectControls.connectV2}>
                  Connect Wallet
                </Button>
              )}
            </Section>
          </Content>
        )}
      </MaxContainer>
      {modalMeta && (
        <AttentionModal
          header={modalMeta.header}
          message={<p>{modalMeta.text}</p>}
          close={() => {
            setModalMeta(undefined)
          }}
        />
      )}
      {walletErrorModal && (
        <AttentionModal
          header="attention"
          message={<p>{walletStatus.error}</p>}
          close={() => {
            walletErrorModalControls.close()
            walletControls.resetError()
          }}
        />
      )}
    </Container>
  )
}

export default StakingHomepage
