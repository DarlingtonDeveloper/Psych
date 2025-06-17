import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import stitches from "../../stitches"
import Box from "../common/Box"
import PsychedelicIcon from "./PsychedelicIcon"
import Link from "next/link"
import Button from "../common/ButtonV2"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

const modalAppear = stitches.keyframes({
  "0%": { opacity: 0, top: -20 },
  "100%": { opacity: 1, top: 0 },
})

const Container = stitches.styled("div", {
  backgroundColor: "rgba(0,0,0,0.4)",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  padding: "$lg",
  height: "100vh",
  width: "100vw",
  zIndex: "$modal",
  overflowY: "auto",
})

const Modal = stitches.styled("aside", {
  position: "relative",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
  fontFamily: "$inter",
  display: "flex",
  flexDirection: "column",
  padding: "$xl",
  maxWidth: "25rem",
  boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
  animation: `${modalAppear} ease-in 0.2s`,
  width: "100%",
  height: "fit-content",
  lineHeight: 1.5,
  margin: "auto",
})

const ContentContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  "> * + *": {
    marginTop: "$lg",
  },
})

const WelcomeText = stitches.styled("h1", {
  fontSize: "$rg",
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "$paGrey",
})

const CustomCheckbox = stitches.styled(Checkbox.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "3px",
  backgroundColor: "$paMoonLight",
  border: "1px solid $paLupine",
  width: "1rem",
  height: "1rem",
  marginRight: "$space$2",
  "&:focus": {
    border: "1px solid $paLupine",
  },
  variants: {
    checkedStatus: {
      true: {
        backgroundColor: "$paLupine",
      },
    },
  },
})
interface PrivacyPolicyModalProps {
  accept: () => void
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ accept }) => {
  const [agreed, setAgreed] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <Container>
          <Modal>
            <ContentContainer>
              <PsychedelicIcon />
              <WelcomeText>Welcome</WelcomeText>
              <Box
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "$rg",
                  textAlign: "center",
                  color: "$paGrey",
                  a: {
                    all: "unset",
                    textDecoration: "underline",
                    "&:hover": { cursor: "pointer" },
                  },
                }}
              >
                <Box>
                  By using and/or visiting this website and collecting PSY
                  Points you are acknowledging and agreeing to the following
                  terms, conditions and policies:
                </Box>
                <Box>
                  <Link href="/privacypolicy" passHref>
                    <a target="_blank">Privacy Policy</a>
                  </Link>
                </Box>
                <Box>
                  <Link href="/terms" passHref>
                    <a target="_blank">Terms & Conditions</a>
                  </Link>
                </Box>
                <Box>
                  <Link href="/nftlicense" passHref>
                    <a target="_blank">PA NFT License</a>
                  </Link>
                </Box>
                <Box>
                  <Link href="https://ezu.xyz/nft-license/" passHref>
                    <a target="_blank">EZU NFT License</a>
                  </Link>
                </Box>
                <Box>
                  <Link
                    href="https://psychedelicsanonymous.com/psy-terms/"
                    passHref
                  >
                    <a target="_blank">PSY POINTS</a>
                  </Link>
                </Box>
              </Box>
              <Box css={{ display: "flex", gap: "$rg", alignItems: "center" }}>
                <CustomCheckbox
                  id="c1"
                  onCheckedChange={() => setAgreed((s) => !s)}
                  checked={agreed}
                  checkedStatus={agreed}
                >
                  <Checkbox.Indicator>
                    <CheckIcon
                      color={stitches.theme.colors.paMoonLight.value}
                      fontSize={3}
                    />
                  </Checkbox.Indicator>
                </CustomCheckbox>
                <Box htmlFor="c1" as="label" css={{ fontSize: "$sm" }}>
                  <strong>
                    I understand and have read and agree to all the contents of
                    all listed items, policies, terms and license agreements.
                  </strong>
                </Box>
              </Box>

              <Box css={{ display: "flex", gap: "$rg", alignItems: "center" }}>
                <CustomCheckbox
                  id="c2"
                  onCheckedChange={() => setAcknowledged((s) => !s)}
                  checked={acknowledged}
                  checkedStatus={acknowledged}
                >
                  <Checkbox.Indicator>
                    <CheckIcon
                      color={stitches.theme.colors.paMoonLight.value}
                      fontSize={3}
                    />
                  </Checkbox.Indicator>
                </CustomCheckbox>
                <Box htmlFor="c2" as="label" css={{ fontSize: "$sm" }}>
                  <strong>
                    I acknowledge and understand as stated in our NFT
                    License(s), any NFT issued, created or distributed by
                    Voltura Labs Pty Ltd are not financial products and you have
                    no reasonable expectation of profit from purchasing, holding
                    or owning these NFTs in accordance within our NFT License
                    and Terms.
                  </strong>
                </Box>
              </Box>
              <Button
                onClick={accept}
                color="lupine"
                size="full"
                disabled={!(agreed && acknowledged)}
              >
                I agree
              </Button>
            </ContentContainer>
          </Modal>
        </Container>,
        document.body
      )
    : null
}

export default PrivacyPolicyModal
