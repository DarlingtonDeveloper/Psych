import React, { useEffect } from "react"
import stitches from "../../../stitches"
import NavItem from "./NavItem"
import useClickOutside from "click-outside-hook"
import { useRouter } from "next/router"
import { XIcon } from "../../Icons"
import { HFVariant } from "../types"
import { PAGE } from "../../../utils/pages"
import PsychedelicIcon from "./PsychedelicIcon"
import { FooterLinks } from "../../../v3/components/FooterLinks"

interface NavigationProps {
  close: () => void
  variant: HFVariant
}

const fadeIn = stitches.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

const Container = stitches.styled("aside", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  backgroundColor: "$paMid",
  color: "$paIce",
  zIndex: "$modal",
  padding: "$lg",
  paddingTop: "$xxl",
  fontFamily: "$proxima",
  fontSize: "$sm",
  animation: `${fadeIn} ease-in 0.3s alternate`,
  "@bp2": {
    top: "5rem",
    width: "fit-content",
    minWidth: "250px",
    paddingTop: "$lg",
    paddingBottom: "$lg",
    "> svg": {
      display: "none",
    },
  },
  variants: {
    theme: {
      dark: {
        backgroundColor: "$paDark",
        color: "$paWhite",
      },
      lightGrey: {
        backgroundColor: "$paLightGrey",
        color: "$paYellow",
      },
      blue: {
        backgroundColor: "$paBlue",
        color: "$paYellow",
      },
      grey: {
        backgroundColor: "$paGrey",
        color: "$paLightGrey",
      },
      earth: {
        backgroundColor: "$paEarth",
        color: "$paDust",
      },
      yellow: {
        backgroundColor: "$paYellow",
        color: "$paGrey",
      },
      greyYellow: {
        backgroundColor: "$paGrey",
        color: "$paYellow",
      },
      darkLight: {
        backgroundColor: "$paMid",
        color: "$paWhite",
      },
      transparent: {
        backgroundColor: "$paDark",
        color: "$paWhite",
      },
      lgTransparent: {
        backgroundColor: "$paDark",
        color: "$paWhite",
      },
      forestTransparent: {
        backgroundColor: "$paDark",
        color: "$paLupine",
      },
      psilocybin: {
        backgroundColor: "$paDark",
        color: "$paPsilocybin",
      },
      blackTransparent: {
        backgroundColor: "$paDark",
        color: "$paDark",
      },
      lupineTransparent: {
        backgroundColor: "$paDark",
        color: "$paLupine",
      },
      midnightTransparent: {
        backgroundColor: "$paDark",
        color: "$paMoonLight",
      },
    },
  },
})

interface NavItems {
  path: string
  text: string
  external?: boolean
}

const externalLinks: NavItems[] = [{ path: PAGE.HOME, text: "Main Website" }]

const navItems: NavItems[] = [
  { path: PAGE.STAKING, text: "Mycelia V2.0" },
  { path: PAGE.STAKING_V1, text: "Mycelia V1.0" },
  {
    path: PAGE.PSY_POINTS,
    text: "PSY Points",
  },
  {
    path: PAGE.PSY_PACKS,
    text: "PSY Packs",
  }
]

const NavItemContainer = stitches.styled("div", {
  textAlign: "left",
  lineHeight: 2,
  width: "100%",
})

const SideBySide = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  color: "inherit",
  marginTop: "4rem",
  "& > span": {
    textAlign: "left",
  },
  "@bp2": {
    display: "none",
  },
})

const CloseContainer = stitches.styled("button", {
  background: "none",
  border: "0",
  color: "$paWhite",
  "&:hover": {
    cursor: "pointer",
  },
  "@bp2": {
    display: "none",
  },
})

const PsychedelicWrapper = stitches.styled("div", {
  marginBottom: "40px",
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  "@bp2": {
    display: "none",
    visibility: "hidden",
  },
})

const LinkSectionLabel = stitches.styled("p", {
  fontFamily: "$inter",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "18px",
  width: "100%",
})

const Navigation = ({ close, variant }: NavigationProps) => {
  const router = useRouter()
  const containerRef = useClickOutside(close)

  useEffect(() => {
    router.events.on("routeChangeComplete", close)
    return () => {
      router.events.off("routeChangeComplete", close)
    }
  }, [router, close])

  return (
    <Container ref={containerRef} theme={variant}>
      <PsychedelicWrapper>
        <PsychedelicIcon />
        <CloseContainer onClick={close}>
          <XIcon height="25" width="25" />
        </CloseContainer>
      </PsychedelicWrapper>
      <LinkSectionLabel>Psychedelics Anonymous</LinkSectionLabel>
      {externalLinks.map(({ path, text }) => (
        <NavItem path={path} key={path} variant={variant}>
          {text}
        </NavItem>
      ))}
      <LinkSectionLabel>Apps</LinkSectionLabel>
      <NavItemContainer>
        {navItems.map(({ path, text }) => (
          <NavItem path={path} key={path} variant={variant}>
            {text}
          </NavItem>
        ))}
      </NavItemContainer>
      <SideBySide>
        <FooterLinks />
      </SideBySide>
    </Container>
  )
}

export default Navigation
