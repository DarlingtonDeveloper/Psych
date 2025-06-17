import { useRouter } from "next/router"
import React from "react"
import stitches from "../../stitches"
import PointerLink from "./PointerLink"
import { getHFVariantFromRoute } from "./utils"
import PIcon from "./PIcon"
import Link from "next/link"
import { motion } from "framer-motion"
import { useOverrideVariantContext } from "../../context/OverrideVariantProvider"
import { useFeatureIsOn } from "@growthbook/growthbook-react"
import { GrowthbookFeatures } from "../../context/GrowthBookProvider"
import { PAGE } from "../../utils/pages"

interface FooterProps {
  version?: number
}

const Container = stitches.styled("div", {
  alignItems: "center",
  display: "flex",
  fontFamily: "$proxima",
  fontSize: "$xs",
  justifyContent: "space-between",
  position: "relative",
  transition: "background-color ease-in 0.3s",
  maxWidth: "1440px",
  margin: "0 auto",
  variants: {
    tight: {
      true: {
        padding: 0,
        "@bp2": {
          paddingBottom: "$lg",
        },
      },
      false: {
        padding: "$rg",
        "@bp2": {
          padding: "$rg $lg",
        },
      },
    },
    theme: {
      transparent: {
        backgroundColor: "transparent",
        color: "$paWhite",
      },
      lgTransparent: {
        backgroundColor: "transparent",
        color: "$paWhite",
        border: "1px solid $paLightGrey",
      },
      forestTransparent: {
        backgroundColor: "transparent",
        color: "$paLupine",
      },
      lupineTransparent: {
        backgroundColor: "transparent",
        color: "$paLupine",
      },
      midnightTransparent: {
        backgroundColor: "transparent",
        color: "$paMidnight",
      },
      dark: {
        backgroundColor: "$paDark",
        color: "$paWhite",
      },
      greyYellow: {
        backgroundColor: "$paGrey",
        color: "$paYellow",
      },
    },
  },
})

const PaddedContainer = stitches.styled(motion.footer, {
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: "0 $lg",
  paddingBottom: "$xl",
})

const TheNight = stitches.styled("span", {
  display: "none",
  width: "16rem",
  "@bp2": { display: "block" },
})

const LinkContainer = stitches.styled("div", {
  textAlign: "right",
  width: "16rem",
})

const FooterNavItem = stitches.styled("span", {
  display: "none",
  textTransform: "uppercase",
  "&:before": {
    display: "inline-block",
    textDecoration: "none",
    content: "/",
    color: "inherit",
    padding: "0 $xxs",
  },
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
  "@bp2": {
    display: "inline-block",
  },
})

const Footer = ({ version = 1 }: FooterProps) => {
  const router = useRouter()
  const { clientVariant } = useOverrideVariantContext()
  const isNewStaking = useFeatureIsOn(GrowthbookFeatures.newStaking)
  const newVariant =
    clientVariant ||
    getHFVariantFromRoute(router.asPath, { newStaking: isNewStaking }, "footer")

  const shouldAdjustVersion =
    isNewStaking &&
    [PAGE.STAKING, PAGE.STAKING_DASHBOARD].includes(router.asPath as PAGE)
  const overrideVersion = shouldAdjustVersion ? 2 : version

  return (
    <PaddedContainer>
      <Container theme={newVariant} tight={overrideVersion === 2}>
        <TheNight>WE ARE INEVITABLE.</TheNight>
        <PointerLink path={PAGE.HOME}>
          <PIcon />
        </PointerLink>
        <LinkContainer>
          <span>© 2024 PsyZen</span>
          <Link href="/nftlicense" passHref>
            <FooterNavItem>nft license</FooterNavItem>
          </Link>
          <Link href="/privacypolicy" passHref>
            <FooterNavItem>privacy</FooterNavItem>
          </Link>
          <Link href="/terms" passHref>
            <FooterNavItem>terms</FooterNavItem>
          </Link>
        </LinkContainer>
      </Container>
    </PaddedContainer>
  )
}

export default Footer
