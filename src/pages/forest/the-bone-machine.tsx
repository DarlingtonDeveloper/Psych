import React, { useEffect, useRef } from "react"
import MetaHead from "../../components/common/MetaHead"
import MaxContainer from "../../components/common/MaxContainer"
import {
  G2Container,
  ContentContainer,
  EnterContainer,
} from "../../styles/forest-styles"
import { useRouter } from "next/router"
import { useAuthSession } from "../../hooks/useAuthSession"
import { useMutation } from "react-query"
import axios from "axios"
import { sessionHandler } from "../../utils/sessionStorage"
import { ScaleLoader } from "react-spinners"
import Box from "../../components/common/Box"
import stitches from "../../stitches"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { PAGE } from "../../utils/pages"
import pages from "../../lib/forest-pages"

const G2 = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const { sessionData, setSessionData } = useAuthSession()

  const { mutate } = useMutation(
    async () => {
      const response = await axios.post(
        "/.netlify/functions/update-moon-progress",
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
        setTimeout(() => {
          setSessionData((data) => ({
            ...data,
            progress: +Object.keys(pages).find(
              (key) => pages[+key] === PAGE.FOREST_CHAPTER_TWO
            )!,
          }))
          router.push(PAGE.FOREST_CHAPTER_TWO)
        }, 500)
      },
      onError: () => {
        globalConnectControls.disconnect()
      },
    }
  )

  const hasRunRef = useRef(false)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document) {
        const iframeDoc = (
          document.getElementById("the-bone-machine-game") as any
        )?.contentWindow
        if (iframeDoc) {
          const hasRun =
            iframeDoc.cr_getC2Runtime?.().eventsheets["Event Gameplay"]?.hasRun
          const score: number = (
            Object.values(iframeDoc?.cr_getC2Runtime()?.varsBySid || {})?.find(
              (val: any) => val?.name === "var_score"
            ) as any
          )?.data
          if (!hasRun && hasRunRef.current && score >= 40) {
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
    <G2Container>
      <MetaHead
        title="Psychedelics Anonymous - The Forest"
        description="This is forest page"
        link="/forest/the-bone-machine"
      />
      <MaxContainer>
        <ContentContainer>
          <iframe
            id="the-bone-machine-game"
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              height: "80vh",
              border: "none",
            }}
            src="/on-the-hill/HTML5/index.html"
          />
        </ContentContainer>
      </MaxContainer>
    </G2Container>
  )
}

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default G2
