import axios, { AxiosError } from "axios"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ScaleLoader } from "react-spinners"
import AttentionModal from "../../components/C3/AttentionModal"
import Fold from "../../components/common/Fold"
import MaxContainer from "../../components/common/MaxContainer"
import MetaHead from "../../components/common/MetaHead"
import { ShareIcon } from "../../components/Icons"
import { batchStake, batchUnstake } from "../../components/Staking/api"
import Button from "../../components/Staking/Button"
import CommitIcon from "../../components/Staking/CommitIcon"
import Dashboard from "../../components/Staking/Dashboard"
import SafeBox from "../../components/Staking/SafeBox"
import Select from "../../components/Staking/Select"
import StakedDashboard from "../../components/Staking/StakedDashboard"
import TickCircleIcon from "../../components/Staking/TickCircleIcon"
import {
  StakedToken,
  StakedTokenType,
  UnstakedToken,
} from "../../components/Staking/types"
import WalletCard from "../../components/Staking/WalletCard"
import XCircleIcon from "../../components/Staking/XCircleIcon"
import stitches from "../../stitches"
import { PAGE } from "../../utils/pages"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"

const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "#000000",
})

const VideoBG = stitches.styled(motion.video, {
  position: "fixed",
  top: 0,
  left: 0,
  minWidth: "100%",
  minHeight: "100%",
  objectPosition: "top center",
  objectFit: "cover",
})

const WidthBox = stitches.styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  "@bp4": {
    width: "100%",
    maxWidth: "25rem",
  },
})

const ControlsContainer = stitches.styled(motion.div, {
  backgroundColor: "$paMid",
  position: "sticky",
  display: "flex",
  top: 0,
  left: 0,
  zIndex: "$sticky",
  justifyContent: "space-between",
  width: "100%",
  border: "1px $paGrey solid",
  flexDirection: "column-reverse",
  "@bp3": {
    flexDirection: "row",
  },
})

const ConnectionFilter = stitches.styled("div", {
  padding: "$sm",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  "> *": {
    "+ *": {
      marginTop: "$md",
      "@bp3": {
        marginTop: 0,
      },
    },
  },
  "> select": {
    "@bp3": {
      marginRight: "$md",
    },
  },
  "@bp3": {
    maxWidth: "25rem",
    flexDirection: "row",
  },
})

const ConnectionContainer = stitches.styled(motion.div, {
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  ">button:nth-child(2)": {
    marginLeft: "$sm",
  },
  "@bp3": {
    width: "auto",
  },
})

const MyceliumContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "$sm",
  order: -1,
  "@bp3": {
    order: 0,
  },
})

const FlexBox = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "$sm",
  backgroundColor: "#000000",
  width: "100%",
  justifyContent: "space-between",
  borderBottom: "1px $paGrey solid",
  ">div:nth-child(2)": {
    marginLeft: "$sm",
  },
  "@bp3": {
    borderLeft: "1px $paGrey solid",
    borderBottom: "none",
    width: "auto",
  },
})

const PsyBox = stitches.styled("div", {
  display: "grid",
  gridTemplateColumns: "min-content min-content",
  border: "1px solid $paGrey",
  fontSize: "$sm",
  color: "$paIce",
  ">div": {
    display: "flex",
    alignItems: "center",
    padding: "$xs",
    height: "100%",
  },
  ">div:first-child": {
    display: "flex",
    alignItems: "center",
    padding: "$xs",
    borderRight: "1px solid $paGrey",
    height: "100%",
  },
})

const IconButton = stitches.styled(Button, {
  display: "flex",
  alignItems: "center",
  ">svg": {
    marginRight: "$xs",
  },
  "&:hover": {
    ">svg": {
      ">path": {
        fill: "$paBlue",
      },
    },
  },
  variants: {
    selected: {
      true: {
        ">svg": {
          ">path": {
            fill: "$paBlue",
          },
        },
      },
    },
  },
})

interface ModalMeta {
  header: string
  text: string
}

const OldStakingDashboardPage = () => {
  const queryClient = useQueryClient()

  const { globalConnectStatus, wallet } = useGlobalConnectContext()
  const [showUnstaked, setShowUnstaked] = useState(false)
  const [selectedTokens, setSelectedTokens] = useState<number[]>([])
  const [tokenType, setTokenType] = useState<StakedTokenType>("genesis")
  const [modalMeta, setModalMeta] = useState<ModalMeta>()
  const router = useRouter()

  const unstakedQuery = useQuery(
    ["unstakedTokens", tokenType],
    async () => {
      const response = await axios.get<UnstakedToken[]>(
        process.env.NEXT_PUBLIC_FETCH_UNSTAKED_TOKENS as string,
        {
          params: {
            ownerAddress: wallet?.address,
            tokenType,
          },
        }
      )

      return response.data
    },
    {
      onError: (err: AxiosError<{ message: string }>) => {
        setModalMeta({
          header: "attention",
          text:
            err?.response?.data.message ||
            "Something went wrong. Please refresh to try again.",
        })
      },
    }
  )

  const stakedQuery = useQuery(
    ["stakedTokens", tokenType],
    async () => {
      const response = await axios.get<StakedToken[]>(
        process.env.NEXT_PUBLIC_FETCH_STAKED_TOKENS as string,
        {
          params: {
            ownerAddress: wallet?.address,
            tokenType,
          },
        }
      )

      return response.data
    },
    {
      onError: (err: AxiosError<{ message: string }>) => {
        setModalMeta({
          header: "attention",
          text:
            err?.response?.data.message ||
            "Something went wrong. Please refresh to try again.",
        })
      },
    }
  )

  const batchStakedMutation = useMutation(
    async () => {
      if (wallet) {
        await batchStake(wallet, selectedTokens, tokenType)
      }
    },
    {
      onMutate: () => {
        queryClient.cancelQueries(["unstakedTokens", tokenType])
        const unstakedTokens = queryClient.getQueryData([
          "unstakedTokens",
          tokenType,
        ]) as UnstakedToken[]

        return { unstakedTokens }
      },
      onSettled: () => {
        queryClient.removeQueries(["stakedTokens", tokenType])
        queryClient.invalidateQueries(["unstakedTokens", tokenType])
      },
      onSuccess: (_data, _var, context) => {
        const selectedSet = new Set(selectedTokens)
        queryClient.setQueryData(
          ["unstakedTokens", tokenType],
          context?.unstakedTokens.filter(
            (token) => !selectedSet.has(token.tokenId)
          )
        )
        setSelectedTokens([])
        setModalMeta({
          header: "success",
          text: `You have staked ${
            selectedTokens.length
          } ${tokenType.toUpperCase()} NFT/s.`,
        })
      },
      onError: (err: any): void => {
        setModalMeta({
          header: "attention",
          text:
            err?.error?.message ||
            "Something went wrong. Transaction must have been rejected.",
        })
      },
    }
  )

  const batchUnstakedMutation = useMutation(
    async () => {
      if (wallet) {
        await batchUnstake(wallet, selectedTokens, tokenType)
      }
    },
    {
      onMutate: () => {
        queryClient.cancelQueries(["stakedTokens", tokenType])
        const stakedTokens = queryClient.getQueryData([
          "stakedTokens",
          tokenType,
        ]) as StakedToken[]

        return { stakedTokens }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["stakedTokens", tokenType])
        queryClient.removeQueries(["unstakedTokens", tokenType])
      },
      onSuccess: (_data, _var, context) => {
        const selectedSet = new Set(selectedTokens)
        queryClient.setQueryData(
          ["stakedTokens", tokenType],
          context?.stakedTokens.filter(
            (token) => !selectedSet.has(token.tokenId)
          )
        )

        setSelectedTokens([])
        setModalMeta({
          header: "success",
          text: `You have unstaked ${
            selectedTokens.length
          } ${tokenType.toUpperCase()} NFT/s.`,
        })
      },
      onError: (err: any): void => {
        setModalMeta({
          header: "attention",
          text:
            err?.error?.message ||
            "Something went wrong. Transaction must have been rejected.",
        })
      },
    }
  )

  useEffect(() => {
    if (!globalConnectStatus.connected) {
      router.push(PAGE.STAKING_V1)
    }
  }, [globalConnectStatus.connected, router])

  useEffect(() => {
    setSelectedTokens([])
  }, [tokenType, showUnstaked])

  if (!globalConnectStatus.connected) {
    return null
  }

  const stakeSelectedTokens = () => {
    if (selectedTokens.length > 0) {
      batchStakedMutation.mutate()
    }
  }

  const unstakeSelectedTokens = () => {
    if (selectedTokens.length > 0) {
      batchUnstakedMutation.mutate()
    }
  }

  const anyMutationIsLoading =
    batchStakedMutation.isLoading || batchUnstakedMutation.isLoading

  const addToken = (tokenId: number) => {
    if (!anyMutationIsLoading) {
      if (!selectedTokens.includes(tokenId)) {
        setSelectedTokens([...selectedTokens, tokenId])
      } else {
        setSelectedTokens(selectedTokens.filter((token) => token !== tokenId))
      }
    }
  }

  const isLoading =
    (unstakedQuery.isLoading && showUnstaked) ||
    (stakedQuery.isLoading && !showUnstaked)

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | Staking"
        description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
        link="/staking/dashboard"
      />
      {isLoading ? (
        <VideoBG
          key="mycelia-travel"
          src="/mycelia-travel.mp4"
          width="100%"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={{ zIndex: "$tooltip" }}
        />
      ) : (
        <MaxContainer css={{ minHeight: "calc(100vh - 16rem)" }}>
          <VideoBG
            css={{ filter: "brightness(30%)" }}
            key="mycelia-loop"
            src="/mycelia-loop.mp4"
            width="100%"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <ControlsContainer
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ ease: "easeIn", duration: 1 }}
          >
            <ConnectionFilter>
              <Select
                value={tokenType}
                onChange={(event) =>
                  setTokenType(event.target.value as StakedTokenType)
                }
                disabled={anyMutationIsLoading}
              >
                <option value="genesis">genesis</option>
                <option value="psilocybin">psilocybin</option>
                <option value="c1">c1</option>
              </Select>
              {!anyMutationIsLoading && (
                <ConnectionContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <IconButton
                    zero
                    variant="transparent"
                    selected={!showUnstaked}
                    onClick={() => setShowUnstaked(false)}
                  >
                    <ShareIcon />
                    Connected
                  </IconButton>
                  <IconButton
                    zero
                    variant="transparent"
                    selected={showUnstaked}
                    onClick={() => setShowUnstaked(true)}
                  >
                    <CommitIcon />
                    Disconnected
                  </IconButton>
                </ConnectionContainer>
              )}
            </ConnectionFilter>
            <MyceliumContainer>
              {anyMutationIsLoading ? (
                <ScaleLoader
                  color={stitches.theme.colors.paIce.value}
                  height={15}
                />
              ) : (
                <>
                  {showUnstaked ? (
                    <IconButton
                      sm
                      onClick={stakeSelectedTokens}
                      disabled={
                        anyMutationIsLoading || selectedTokens.length === 0
                      }
                      css={{ visibility: "hidden" }}
                    >
                      <TickCircleIcon />
                      Add to Mycelia
                    </IconButton>
                  ) : (
                    <IconButton
                      sm
                      onClick={unstakeSelectedTokens}
                      disabled={
                        anyMutationIsLoading || selectedTokens.length === 0
                      }
                    >
                      <XCircleIcon /> Remove from Mycelia
                    </IconButton>
                  )}
                </>
              )}
            </MyceliumContainer>
            <WidthBox>
              <FlexBox>
                <WalletCard address={wallet?.address} />
                <PsyBox>
                  <div>
                    <SafeBox />
                    &nbsp;&nbsp;PSY
                  </div>
                  <div>
                    <img
                      src={require("../../images/psy.gif?url")}
                      alt="PSY Gif"
                      height="20px"
                      width="20px"
                    />
                  </div>
                </PsyBox>
              </FlexBox>
            </WidthBox>
          </ControlsContainer>
          {unstakedQuery.data && showUnstaked && (
            <Dashboard
              tokens={unstakedQuery.data}
              addToken={addToken}
              selectedTokens={selectedTokens}
              key={tokenType}
              tokenType={tokenType}
              gotoConnect={() => setShowUnstaked(false)}
            />
          )}
          {stakedQuery.data && !showUnstaked && (
            <StakedDashboard
              tokens={stakedQuery.data}
              addToken={addToken}
              selectedTokens={selectedTokens}
              key={tokenType}
              tokenType={tokenType}
              goToDisconnect={() => setShowUnstaked(true)}
            />
          )}
        </MaxContainer>
      )}
      {modalMeta && (
        <AttentionModal
          header={modalMeta.header}
          message={<p>{modalMeta.text}</p>}
          close={() => {
            setModalMeta(undefined)
          }}
        />
      )}
    </Container>
  )
}

export default OldStakingDashboardPage
