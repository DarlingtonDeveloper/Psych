import React, { useEffect } from "react"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import stitches from "../../stitches"
import { useQueryClient } from "react-query"
import IRLSuccess from "../../components/IRLClaim/IRLSuccess"
import { useRouter } from "next/router"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"

const Container = stitches.styled(Fold, {
  width: "100%",
  minHeight: "100vh",
  justifyContent: "flex-start",
  background: `url(${require("../../images/midnight-paradigm-irl-claim.png?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "$paDark",
  overflow: "hidden",

  "> div": {
    "+ div": {
      marginTop: "$lg",
    },
  },
})

const Web3AcceleratorPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { wallet, globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()

  useEffect(() => {
    if (!globalConnectStatus.connected) {
      router.push("/irl-claim")
    }
  }, [globalConnectStatus.connected, router])

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | IRL Merch Registration"
        description="Verify your IRL Pass to continue."
        link="/irl-claim"
      />
      <IRLSuccess
        disconnectWallet={() => {
          globalConnectControls.disconnect()
          queryClient.resetQueries("owned-tokens")
        }}
        address={wallet?.address as string}
      />
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

export default Web3AcceleratorPage
