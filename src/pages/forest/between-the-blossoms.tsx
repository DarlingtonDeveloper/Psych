import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { useMutation } from "react-query"
import { ScaleLoader } from "react-spinners"
import Box from "../../components/common/Box"
import MaxContainer from "../../components/common/MaxContainer"
import MetaHead from "../../components/common/MetaHead"
import { useAuthSession } from "../../hooks/useAuthSession"
import {
  GameContainer,
  ContentContainer,
  EnterContainer,
} from "../../styles/forest-styles"
import stitches from "../../stitches"
import { sessionHandler } from "../../utils/sessionStorage"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import useToast from "../../hooks/useToast"
import { PAGE } from "../../utils/pages"

const BetweenTheBlossoms = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData, setSessionData } = useAuthSession()

  const { mutate } = useMutation(
    async () => {
      const response = await axios.post(
        "/.netlify/functions/update-blossom-progress",
        undefined,
        {
          headers: {
            authorization: `Bearer ${sessionHandler.getSession()}`,
          },
        }
      )

      return response.data
    },
    {
      onSuccess: () => {
        setSessionData((data) => ({
          ...data,
          progress: data.progress + 1,
        }))
        setTimeout(() => {
          router.push(PAGE.FOREST_CHAPTER_ONE)
        }, 500)
      },
      onError: (error: AxiosError) => {
        const statusCode = error?.response?.status
        showToast({
          description:
            error?.response?.data.message ||
            "Something went wrong. Please try again.",
        })
        if (statusCode === 401 || statusCode === 403) {
          globalConnectControls.disconnect()
        }
      },
    }
  )

  const hasRunRef = useRef(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document) {
        const iframeDoc = (
          document.getElementById("between-the-blossoms-game") as any
        )?.contentWindow
        if (iframeDoc) {
          const hasRun =
            iframeDoc.cr_getC2Runtime?.().eventsheets["Event Gameplay"]?.hasRun
          const score: number = (
            Object.values(iframeDoc?.cr_getC2Runtime()?.varsBySid || {})?.find(
              (val: any) => val?.name === "var_score"
            ) as any
          )?.data
          if (!hasRun && hasRunRef.current && score >= 50) {
            mutate()
          }
          hasRunRef.current = hasRun
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [router, mutate])

  if (!sessionData.isAuthenticated) {
    return (
      <EnterContainer>
        <MetaHead
          title="Psychedelics Anonymous - The Forest"
          description="This is forest page"
          link="/forest/between-the-blossoms"
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
    <GameContainer>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/between-the-blossoms"
      />
      <MaxContainer>
        <ContentContainer>
          <iframe
            id="between-the-blossoms-game"
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              height: "80vh",
              border: "none",
            }}
            src="/orbit-game/HTML5/index.html"
          />
        </ContentContainer>
      </MaxContainer>
    </GameContainer>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default BetweenTheBlossoms
