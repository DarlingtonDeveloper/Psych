import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { ScaleLoader } from "react-spinners"
import useModal from "../../hooks/useModal"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import AttentionModal from "../Mint/AttentionModal"
import Button from "./Button"
import Input from "./Input"

const Container = stitches.styled("div", {
  display: "flex",
  width: "100%",
  backgroundColor: "$paMid",
  padding: "$lg",
  flexDirection: "column",
  alignItems: "center",
  height: "fit-content",
  fontWeight: 400,
  color: "$paIce",
  "@bp2": {
    flexDirection: "row",
  },
  marginTop: "-3.1rem",
  marginBottom: "1.5rem",
  "> *": {
    "+ *": {
      marginTop: "$lg",

      "@bp2": {
        marginTop: "0",
        marginLeft: "$lg",
      },
    },
  },
})

const Section = stitches.styled("div", {
  display: "flex",
  flex: "1 1 100%",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  fontSize: "$sm",
  justifyContent: "center",
  variants: {
    hideInMobile: {
      true: {
        display: "none",
        "@bp2": {
          display: "flex",
        },
      },
    },
    show: {
      true: {
        display: "flex !important",
      },
    },
  },
})

const SpecialHeader = stitches.styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  marginBottom: 0,
  "@bp2": {
    marginBottom: "$sm",
  },
  variants: {
    reveal: {
      true: {
        marginBottom: "$sm !important",
      },
    },
  },
})

const DownImage = stitches.styled("img", {
  position: "relative",
  top: "-3.5px",
  display: "block",
  "@bp2": {
    display: "none",
  },
  "&:hover": {
    cursor: "pointer",
  },
})

const P = stitches.styled("p", {
  margin: 0,
  variants: {
    hideInMobile: {
      true: {
        display: "none",
        "@bp2": {
          display: "block",
        },
      },
    },
    show: {
      true: {
        display: "block !important",
      },
    },
  },
})

const _renderClaimMessage = (exists: boolean) => {
  return exists ? (
    <p>
      This Psychedelics Anonymous IRL Pass has already been used to claim a
      one-time IRL Merchandise Pack and is <strong>NOT ELIGIBLE</strong> for
      this claim.
    </p>
  ) : (
    <p>
      This Psychedelics Anonymous IRL Pass <strong>IS ELIGIBLE</strong> for this
      claim. Please proceed to wallet validation.
    </p>
  )
}

const IRLVerify = () => {
  const [resultModal, resultModalControls] = useModal()
  const [errorModal, errorModalControls] = useModal()
  const [reveal, setReveal] = useState(false)

  const claimMutation = useMutation(async (token: number) => {
    const response = await axios.post<{ exists: boolean }>(
      process.env.NEXT_PUBLIC_CHECK_IRL_CLAIM as string,
      { token }
    )
    return response.data
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const checkClaim = async () => {
    if (inputRef.current) {
      await claimMutation.mutate(+inputRef.current?.value)
    }
  }

  const loading = claimMutation.isLoading

  useEffect(() => {
    if (claimMutation.isSuccess) {
      resultModalControls.open()
    }
  }, [resultModalControls, claimMutation.isSuccess])

  useEffect(() => {
    if (claimMutation.isError) {
      errorModalControls.open()
    }
  }, [errorModalControls, claimMutation.isError])

  return (
    <Container>
      <Section>
        <SpecialHeader reveal={reveal}>
          <GenesisHeader css={{ fontSize: "$rg", marginBottom: 0 }}>
            IRL Pass Check
          </GenesisHeader>
          <DownImage
            src={
              reveal
                ? require("../../images/up-small.png?url")
                : require("../../images/down-small.png?url")
            }
            onClick={() => setReveal(!reveal)}
            alt="down small reveal button"
          />
        </SpecialHeader>
        <P hideInMobile={true} show={reveal}>
          Enter a Psychedelics Anonymous IRL Pass Token ID to check if an IRL
          Pass is eligible for this one-time IRL Merchandise Pack claim*.
        </P>
      </Section>
      <Section show={reveal} hideInMobile={true}>
        <Input placeholder="Enter Token ID" ref={inputRef} type="number" />
        <Button
          css={{ backgroundColor: "$paForest" }}
          onClick={checkClaim}
          disabled={loading}
        >
          {loading ? (
            <ScaleLoader
              color={stitches.theme.colors.paIce.value}
              height={15}
            />
          ) : (
            "Check"
          )}
        </Button>
      </Section>
      <Section show={reveal} hideInMobile={true}>
        <P>
          *This IRL Pass checker operates in real time. If you are purchasing a
          Psychedelics Anonymous IRL Pass on the secondary market, please be
          aware that it is possible for someone to purchase a Psychedelics
          Anonymous IRL Pass and use it for the claim immediately after you have
          checked here, making the Pass inelibible for the claim.
        </P>
      </Section>
      {resultModal && (
        <AttentionModal
          header={claimMutation.data?.exists ? "denied" : "approved"}
          message={_renderClaimMessage(claimMutation.data?.exists as boolean)}
          close={() => {
            claimMutation.reset()
            resultModalControls.close()
          }}
        />
      )}
      {errorModal && (
        <AttentionModal
          header="attention"
          message={
            <p>Something went wrong. Check your internet and try again.</p>
          }
          close={() => {
            claimMutation.reset()
            errorModalControls.close()
          }}
        />
      )}
    </Container>
  )
}

export default IRLVerify
