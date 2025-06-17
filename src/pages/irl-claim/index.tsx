import React, { useEffect } from "react"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import AttentionModal from "../../components/Mint/AttentionModal"
import useModal from "../../hooks/useModal"
import stitches from "../../stitches"
import IRLConnect from "../../components/IRLClaim/IRLConnect"
import IRLVerifyV3 from "../../components/IRLClaim/IRLVerifyV3"
import { useQuery } from "react-query"
import axios from "axios"
import IRLConnectHero from "../../components/IRLClaim/IRLConnectHero"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"

const Container = stitches.styled(Fold, {
  width: "100%",
  minHeight: "100vh",
  justifyContent: "flex-start",
  background: `url(${require("../../images/web3-accelerator-bg.png?url")})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "$paDark",
  "> div": {
    "+ div": {
      marginTop: "$lg",
    },
  },
})

const ConnectContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "9rem $lg 0 $lg",
  alignItems: "center",
})

const IRLClaimConnectPage: NextPage = () => {
  const router = useRouter()
  const { wallet, globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()

  const [tokenErrorModal, tokenErrorModalControls] = useModal()

  const tokenQuery = useQuery(
    "owned-tokens",
    async () => {
      const request = await axios.get<number[]>(
        process.env.NEXT_PUBLIC_GET_OWNED_IRL_TOKEN as string,
        {
          params: {
            ownerAddress: wallet?.address,
          },
        }
      )
      return request.data
    },
    {
      enabled: globalConnectStatus.connected,
      onError: () => {
        tokenErrorModalControls.open()
      },
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
    }
  )

  const showForm = globalConnectStatus.connected && tokenQuery.isSuccess

  useEffect(() => {
    if (showForm) {
      router.push("/irl-claim/form")
    }
  }, [showForm, router])

  useEffect(() => {
    router.prefetch("/irl-claim/form")
    router.prefetch("/irl-claim/success")
  }, [router])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | IRL Merch Registration"
        description="Verify your IRL Pass to continue."
        link="/irl-claim"
      />
      <ConnectContainer>
        <IRLVerifyV3 />
        <IRLConnect
          connectWallet={globalConnectControls.connectV2}
          loading={tokenQuery.isLoading}
          closed={true}
        />
      </ConnectContainer>
      <IRLConnectHero />
      {tokenErrorModal && (
        <AttentionModal
          header="attention"
          message={
            <p>
              {
                // @ts-ignore
                tokenQuery.error?.response.data.message ||
                  "Something went wrong in fetching your NFTs. Please refresh to try again."
              }
            </p>
          }
          close={() => {
            tokenErrorModalControls.close()
            globalConnectControls.disconnect()
          }}
        />
      )}
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

export default IRLClaimConnectPage
