import React, { useEffect, useState } from "react"
import Fold from "../../../components/common/Fold"
import MetaHead from "../../../components/common/MetaHead"
import stitches from "../../../stitches"
import { Balance } from "./Balance"
import { StakedTokenType } from "../../../components/Staking/types"
import { StakingBody } from "./StakingBody"
import { useGlobalConnectContext } from "../../../context/GlobalConnectProvider"
import AttentionModal from "../../../components/C3/AttentionModal"
import { useRouter } from "next/router"
import { useGetOwnedTokens } from "./hooks"
import { PAGE } from "../../../utils/pages"
import { useInView } from "react-intersection-observer"

const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "100%",
  gridTemplateRows: "min-content 1fr",
  justifyItems: "center",
})

const Body = stitches.styled("div", {
  background: "$paDustv2",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  paddingLeft: "$md",
  paddingRight: "$md",
})

const MaxWidth = stitches.styled("div", {
  maxWidth: 1337,
  width: "100%",
  margin: "64px 0",
  marginBottom: "160px",
})
interface ModalMeta {
  header: string
  text: string
}

export const StakingDashboardV2 = () => {
  const [tokenType, setTokenType] = useState<StakedTokenType>(
    "" as StakedTokenType
  )
  const [modalMeta, setModalMeta] = useState<ModalMeta>()
  const pageSize = 16
  // For testing
  // const pageSize = 1

  const { wallet, walletStatus, globalConnectStatus } =
    useGlobalConnectContext()

  const router = useRouter()

  useEffect(() => {
    if (!globalConnectStatus.connected) {
      router.push(PAGE.STAKING)
    }
  }, [globalConnectStatus.connected, router])

  const { ref, inView } = useInView({
    threshold: 0.9,
  })

  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useGetOwnedTokens(
      {
        ownerAddress: wallet?.address || "",
        tokenType,
        pageSize,
      },
      {
        enabled: !!(walletStatus.connected && wallet?.address),
        onError: (err) => {
          setModalMeta({
            header: "attention",
            text:
              err?.response?.data.message ||
              "Something went wrong. Please refresh to try again.",
          })
        },
      }
    )

  React.useEffect(() => {
    if (inView && !(isFetchingNextPage || isLoading)) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, isFetchingNextPage, isLoading])

  if (!globalConnectStatus.connected) {
    return null
  }

  const nftData = (data?.pages || [])?.reduce(
    (acc, val) => [...acc, ...val.projectedData],
    [] as Array<{
      preview: string
      tokenId: number
      tokenType: string
    }>
  )

  return (
    <>
      <Container>
        <MetaHead
          title="Psychedelics Anonymous | Staking"
          description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
          link="/staking"
        />
        <Balance />
        <Body>
          <MaxWidth>
            <StakingBody
              tokenType={tokenType}
              setTokenType={setTokenType}
              data={nftData}
              ref={ref}
              isLoading={isLoading}
              isFetchingNextPage={isFetchingNextPage}
            />
          </MaxWidth>
        </Body>
      </Container>
      {modalMeta && (
        <AttentionModal
          header={modalMeta.header}
          message={<p>{modalMeta.text}</p>}
          close={() => {
            setModalMeta(undefined)
          }}
        />
      )}
    </>
  )
}
