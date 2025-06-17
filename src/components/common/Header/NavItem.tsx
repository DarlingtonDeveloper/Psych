import React from "react"
import stitches from "../../../stitches"
import Link from "next/link"
import { useRouter } from "next/router"
import { HFVariant } from "../types"

interface NavItemProps {
  path: string
  variant: HFVariant
  inline?: boolean
  external?: boolean
}

const Container = stitches.styled("div", {
  display: "block",
  fontFamily: "$inter",
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "21px",
  padding: "12px 0 15px 20px",
  borderBottom: "1px solid $paLupine",
  width: "100%",
  textDecoration: "none",
  variants: {
    color: {
      dark: {
        color: "$paIce",
      },
      lightGrey: {
        color: "$paIce",
      },
      blue: {
        color: "$paIce",
      },
      grey: {
        color: "$paLightGrey",
      },
      earth: {
        color: "$paIce",
        "&:hover": {
          cursor: "pointer",
          color: "$paDust",
        },
      },
      yellow: {
        color: "$paGrey",
        "&:hover": {
          cursor: "pointer",
          color: "$paBlue",
        },
      },
      greyYellow: {
        color: "$paYellow",
        "&:hover": {
          cursor: "pointer",
          color: "$paIce",
        },
      },
      darkLight: {
        color: "$paIce",
      },
      transparent: {
        color: "$paIce",
      },
      lgTransparent: {
        color: "$paIce",
      },
      forestTransparent: {
        color: "$paLupine",
      },
      psilocybin: {
        color: "$paPsilocybin",
      },
      blackTransparent: {
        color: "$paIce",
      },
      lupineTransparent: {
        color: "$paIce",
        "&:hover": {
          cursor: "pointer",
          color: "$paLupine",
        },
      },
      midnightTransparent: {
        color: "$paIce",
      },
    },
    inline: {
      true: {
        display: "inline-block",
      },
    },
    current: {
      true: {},
    },
  },
  compoundVariants: [
    {
      color: "dark",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "lightGrey",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "blue",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "grey",
      current: true,
      css: {
        color: "$paIce",
      },
    },
    {
      color: "earth",
      current: true,
      css: {
        color: "$paDust",
      },
    },
    {
      color: "yellow",
      current: true,
      css: {
        color: "$paBlue",
      },
    },
    {
      color: "greyYellow",
      current: true,
      css: {
        color: "$paIce",
      },
    },
    {
      color: "darkLight",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "transparent",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "lgTransparent",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "psilocybin",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "blackTransparent",
      current: true,
      css: {
        color: "$paYellow",
      },
    },
    {
      color: "lupineTransparent",
      current: true,
      css: {
        color: "$paLupine",
      },
    },
  ],
  "&:hover": {
    cursor: "pointer",
    color: "$paYellow",
  },
  transition: "color ease-in 0.3s",
})

const Anchor = stitches.styled("a", {
  width: "100%",
  textDecoration: "none",
})

const NextLink = stitches.styled(Link, {
  width: "100%",
})

const NavItem: React.FC<NavItemProps> = ({
  path,
  children,
  variant,
  inline = false,
  external = false,
}) => {
  const router = useRouter()
  const current =
    router.asPath.split("/").length === 2
      ? router.asPath === path
      : router.asPath.startsWith(path) && path !== "/"

  if (external) {
    return (
      <Anchor href={path} target="_blank" rel="noreferrer">
        <Container color={variant} current={current} inline={inline}>
          {children}
        </Container>
      </Anchor>
    )
  }

  return (
    <NextLink href={path} passHref>
      <Container as="a" color={variant} current={current} inline={inline}>
        {children}
      </Container>
    </NextLink>
  )
}

export default NavItem
