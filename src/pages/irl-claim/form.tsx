import React, { useEffect, useState } from "react"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import AttentionModal from "../../components/Mint/AttentionModal"
import useModal from "../../hooks/useModal"
import stitches from "../../stitches"
import { useMutation, useQueryClient } from "react-query"
import axios from "axios"
import { ethers } from "ethers"
import { JsonRpcSigner } from "@ethersproject/providers"
import IRLForm, { IRLClaim } from "../../components/IRLClaim/IRLForm"
import CurrentWallet from "../../components/IRLClaim/CurrentWallet"
import { useRouter } from "next/router"
import { NextPage } from "next"
import IRLTopHero from "../../components/IRLClaim/IRLTopHero"
import IRLBottomHero from "../../components/IRLClaim/IRLBottomHero"
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

const FormContainer = stitches.styled("div", {
  width: "100%",
})

const FormProper = stitches.styled("div", {
  display: "flex",
  width: "100%",
  backgroundColor: "$paDark",
  flexDirection: "column-reverse",
  padding: "$lg",
  "@bp3": {
    flexDirection: "row",
  },
  "> div:first-child": {
    width: "100%",
  },
  "> div:last-child": {
    width: "100%",
    "@bp3": {
      maxWidth: "20rem",
      paddingLeft: "$lg",
    },
  },
})

const createMessage = async (signer: JsonRpcSigner, tokens: number[]) => {
  const messageHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(JSON.stringify(tokens))
  )
  const signingMessage = ethers.utils.arrayify(messageHash)
  const signingMessageAsHex = ethers.utils.hexlify(signingMessage)
  const signature = await signer.signMessage(signingMessageAsHex)
  return signature
}

interface IRLFormData extends IRLClaim {
  address: string
  signature: string
}

const IRLClaimFormPage: NextPage = () => {
  const queryClient = useQueryClient()
  const [amount, setAmount] = useState(1)
  const { wallet, globalConnectStatus, globalConnectControls } =
    useGlobalConnectContext()

  const router = useRouter()

  const [formErrorModal, formErrorModalControls] = useModal()

  const claimMutation = useMutation((data: IRLFormData) =>
    axios.post(process.env.NEXT_PUBLIC_CLAIM_IRL as string, data)
  )

  const fetchedTokens = queryClient.getQueryData("owned-tokens") as number[]

  const claimIRL = async (data: IRLClaim) => {
    if (wallet?.signer && fetchedTokens) {
      const tokens = fetchedTokens.slice(0, amount)
      const signature = await createMessage(wallet?.signer, tokens)
      claimMutation.mutate(
        {
          ...data,
          signature,
          address: wallet?.address,
          tokens,
        },
        {
          onError: () => {
            formErrorModalControls.open()
          },
        }
      )
    }
  }

  useEffect(() => {
    if (!globalConnectStatus.connected) {
      router.push("/irl-claim")
    }
  }, [globalConnectStatus.connected, router])

  useEffect(() => {
    if (claimMutation.isSuccess) {
      router.push("/irl-claim/success")
    }
  }, [claimMutation.isSuccess, router])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | IRL Merch Registration"
        description="Verify your IRL Pass to continue."
        link="/irl-claim"
      />
      <FormContainer>
        <IRLTopHero />
        <FormProper>
          <div>
            <IRLForm
              onSubmit={claimIRL}
              loading={claimMutation.isLoading}
              allowance={fetchedTokens ? fetchedTokens.length : 0}
              amount={amount}
              setAmount={setAmount}
            />
          </div>
          <div>
            <CurrentWallet
              disconnectWallet={() => {
                globalConnectControls.disconnect()
                claimMutation.reset()
                queryClient.resetQueries("owned-tokens")
                setAmount(1)
              }}
              address={wallet?.address as string}
              disabled={claimMutation.isLoading}
            />
          </div>
        </FormProper>
        <IRLBottomHero />
      </FormContainer>
      {formErrorModal && (
        <AttentionModal
          header="attention"
          message={
            <p>
              {
                // @ts-ignore
                claimMutation.error?.response?.data?.message ||
                  "Something went wrong. Please refresh to try again."
              }
            </p>
          }
          close={() => {
            formErrorModalControls.close()
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

export default IRLClaimFormPage
