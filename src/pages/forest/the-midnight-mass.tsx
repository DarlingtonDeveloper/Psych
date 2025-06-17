import React, { useEffect, useState } from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  EnterContainer,
  ContentContainer,
  NaturalText,
  DisconnectBtn,
  EnterBtn,
  DisconnectWrapper,
  ErrorText,
} from "../../styles/forest-styles"
import Button from "../../components/common/ButtonV2"
import { useRouter } from "next/router"
import Box from "../../components/common/Box"
import SplitInput from "../../components/SplitInput"
import { useAuthSession } from "../../hooks/useAuthSession"
import axios, { AxiosError } from "axios"
import { useMutation, useQuery } from "react-query"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import { sessionHandler } from "../../utils/sessionStorage"
import AttentionModal from "../../components/Burn/AttentionModal"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"

interface ModalMeta {
  header: string
  text: string
}

const MidnightMass = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const [riddleAnswer, setRiddleAnswer] = useState("")
  const { sessionData, setSessionData } = useAuthSession()
  const [modalMeta, setModalMeta] = useState<ModalMeta>()

  const { data, isLoading } = useQuery(
    ["get-forest-riddle-by-id", sessionData?.progress],
    async () => {
      const response = await axios.get<{
        answerLength: number
        icon: string
        riddle: string
        riddleID: number
      }>("/.netlify/functions/get-forest-riddle-by-id", {
        params: { riddleID: sessionData?.progress },
      })

      return response.data
    },
    {
      onError: (error: AxiosError) => {
        setModalMeta({
          header: "attention",
          text: "A server error occurred. Try again later.",
        })
        const statusCode = error?.response?.status
        if (statusCode === 401 || statusCode === 403) {
          globalConnectControls.disconnect()
        }
      },
      enabled: sessionData.progress < 8 && sessionData?.progress > 4,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: 0,
    }
  )

  useEffect(() => {
    const isReadyForNextStep = sessionData.progress > 7
    if (isReadyForNextStep) {
      router.push(PAGE.FOREST_NOCTURNE_EMBRACE)
    }
  }, [sessionData.progress, router])

  const checkRiddleAnswer = useMutation(
    async (data: { riddleID: number; userAnswer: string }) => {
      const response = await axios.post<{
        isCorrect: boolean
        riddleID: number
      }>(
        "/.netlify/functions/verify-forest-blossom-riddle-answer",
        {
          userAnswer: data.userAnswer,
        },
        {
          params: {
            riddleID: data.riddleID,
          },
          headers: {
            authorization: `Bearer ${sessionHandler.getSession()}`,
          },
        }
      )

      return response.data
    },
    {
      onError: (err: AxiosError) => {
        if (
          err?.response?.data?.message ===
            "Too many attempts. Try again in a later time." &&
          err?.response?.status === 429
        ) {
          setModalMeta({
            header: "attention",
            text: "You have made too many recent attempts. Please try again later.",
          })
        } else if (err?.response?.data?.message !== "Wrong answer.") {
          setModalMeta({
            header: "attention",
            text: "A server error occurred. Try again later.",
          })
        }
        const statusCode = err?.response?.status
        if (statusCode === 401 || statusCode === 403) {
          globalConnectControls.disconnect()
        }
      },
    }
  )

  const handleInputChange = (val: string) => {
    setRiddleAnswer(val)
    checkRiddleAnswer.reset()
  }

  useEffect(() => {
    router.prefetch("/forest/the-nocturne-embrace")
  }, [router])

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/the-midnight-mass"
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
    <EnterContainer>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-midnight-mass"
      />
      <MaxContainer>
        <ContentContainer>
          <DisconnectWrapper>
            <DisconnectBtn
              onClick={() => {
                globalConnectControls.disconnect()
                router.push(PAGE.FOREST)
              }}
            >
              Disconnect
            </DisconnectBtn>
          </DisconnectWrapper>
          {isLoading ? (
            <Box css={{ display: "flex", justifyContent: "center" }}>
              <ScaleLoader
                color={stitches.theme.colors.paLupine.value}
                height={26}
              />
            </Box>
          ) : (
            <>
              <Box
                css={{
                  margin: "16px 0 16px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {data?.icon ? (
                  <img
                    src={require(`../../images/forest/${data?.icon}.png?url`)}
                    alt={data?.riddle}
                  />
                ) : null}
              </Box>
              <NaturalText>{data?.riddle}</NaturalText>
              <Box
                css={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "49px",
                  marginTop: "42px",
                }}
              >
                <SplitInput
                  onChange={handleInputChange}
                  value={riddleAnswer}
                  characterLength={data?.answerLength || 0}
                />
              </Box>
              {checkRiddleAnswer.error?.response?.data?.message ===
              "Wrong answer." ? (
                <Box css={{ display: "flex", justifyContent: "center" }}>
                  <ErrorText>Try Again</ErrorText>
                </Box>
              ) : null}
              <EnterBtn>
                <Button
                  onClick={async () => {
                    if (data) {
                      try {
                        await checkRiddleAnswer.mutateAsync({
                          riddleID: data.riddleID,
                          userAnswer: riddleAnswer,
                        })

                        setSessionData((data) => ({
                          ...data,
                          progress: data.progress + 1,
                        }))
                        setRiddleAnswer("")
                      } catch (e) {}
                    }
                  }}
                >
                  {checkRiddleAnswer.isLoading ? (
                    <ScaleLoader
                      color={stitches.theme.colors.paLupine.value}
                      height={15}
                    />
                  ) : (
                    "Next"
                  )}
                </Button>
              </EnterBtn>
            </>
          )}
        </ContentContainer>
      </MaxContainer>
      {modalMeta && (
        <AttentionModal
          header={modalMeta.header}
          message={<p>{modalMeta.text}</p>}
          close={() => {
            setModalMeta(undefined)
            globalConnectControls.disconnect()
          }}
        />
      )}
    </EnterContainer>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default MidnightMass
