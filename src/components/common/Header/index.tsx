import React, { useCallback, useState } from "react"
import stitches from "../../../stitches"
import DiscordIcon from "./DiscordIcon"
import MenuIcon from "./MenuIcon"
import PsychedelicIcon from "./PsychedelicIcon"
import TwitterIcon from "./TwitterIcon"
import { useRouter } from "next/router"
import Navigation from "./Navigation"
import PointerLink from "../PointerLink"
import { getHFVariantFromRoute } from "../utils"
import { motion } from "framer-motion"
import { useOverrideVariantContext } from "../../../context/OverrideVariantProvider"
import { useFeatureIsOn } from "@growthbook/growthbook-react"
import { GrowthbookFeatures } from "../../../context/GrowthBookProvider"
import { PAGE } from "../../../utils/pages"

interface HeaderProps {
  version?: number
}

const Container = stitches.styled("div", {
  alignItems: "center",
  backgroundColor: "$paMid",
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  transition: "background-color ease-in 0.3s",
  maxWidth: "1440px",
  margin: "0 auto",
  variants: {
    tight: {
      true: {
        padding: 0,
        "@bp3": {
          paddingTop: "$lg",
        },
      },
      false: {
        padding: "$rg",
        "@bp3": {
          padding: "$rg $lg",
        },
      },
    },
    theme: {
      transparent: {
        backgroundColor: "transparent",
        color: "$paWhite",
      },
      forestTransparent: {
        backgroundColor: "transparent",
        color: "$ppaLupine",
      },
      lgTransparent: {
        backgroundColor: "transparent",
        color: "$paWhite",
        border: "1px solid $paLightGrey",
      },
      lupineTransparent: {
        backgroundColor: "transparent",
        color: "$paLupine",
      },
      midnightTransparent: {
        backgroundColor: "transparent",
        color: "$paMidnight",
      },
      greyYellow: {
        backgroundColor: "$paGrey",
        color: "$paYellow",
      },
      dark: {
        backgroundColor: "$paDark",
        color: "$paWhite",
      },
    },
  },
})

const LogoContainer = stitches.styled("div", {
  display: "none",
  width: "7rem",
  "@bp2": { display: "block", width: "8rem" },
  "> *:nth-child(2)": {
    marginLeft: "$rg",
  },
})

const ClickableSpan = stitches.styled("span", {
  "&:hover": {
    cursor: "pointer",
  },
})

const PaddedContainer = stitches.styled(motion.header, {
  position: "absolute",
  width: "100%",
  zIndex: "$banner",
  padding: "0 $lg",
  paddingTop: "$xl",
})

const NavigationOptions = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingLeft: "$sm",
  width: "7rem",
  "@bp2": {
    paddingLeft: 0,
    width: "8rem",
  },
})

const Header = ({ version = 1 }: HeaderProps) => {
  const router = useRouter()
  const isNewStaking = useFeatureIsOn(GrowthbookFeatures.newStaking)
  const { clientVariant } = useOverrideVariantContext()
  const newVariant =
    clientVariant ||
    getHFVariantFromRoute(router.asPath, { newStaking: isNewStaking })

  const shouldAdjustVersion =
    isNewStaking &&
    [PAGE.STAKING, PAGE.STAKING_DASHBOARD].includes(router.asPath as PAGE)
  const overrideVersion = shouldAdjustVersion ? 2 : version

  const [navOpen, setNavOpen] = useState(false)

  const close = useCallback(() => {
    setNavOpen(false)
  }, [setNavOpen])

  return (
    <PaddedContainer>
      <Container theme={newVariant} tight={overrideVersion === 2}>
        <LogoContainer>
          <PointerLink path="https://discord.gg/we-are-the-night" native={true}>
            <DiscordIcon />
          </PointerLink>
          <PointerLink path="https://twitter.com/psychedelic_nft" native={true}>
            <TwitterIcon />
          </PointerLink>
        </LogoContainer>
        <PointerLink path={PAGE.HOME}>
          <PsychedelicIcon />
        </PointerLink>
        <NavigationOptions>
          <ClickableSpan onClick={() => setNavOpen((nav) => !nav)}>
            <MenuIcon />
          </ClickableSpan>
        </NavigationOptions>
        {navOpen && <Navigation close={close} variant={newVariant} />}
      </Container>
    </PaddedContainer>
  )
}

export default Header
