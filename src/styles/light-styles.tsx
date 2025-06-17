import { motion } from "framer-motion"
import stitches from "../stitches"
import Fold from "../components/common/Fold"

export const Flex = stitches.styled("div", {
  display: "flex",
})

export const Grid = stitches.styled("div", {
  display: "grid",
})

export const Image = stitches.styled("img")

export const Container = stitches.styled(Fold, {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "$paMoonLight",
  justifyContent: "initial",
  ">p": {
    margin: 0,
  },
})

export const Video = stitches.styled(motion.video, {
  objectPosition: "top center",
  objectFit: "cover",
})

export const ContentContainer = stitches.styled("div", {
  paddingTop: "8rem",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  color: "$paDark",

  "@bp3": {
    paddingLeft: "7.5rem",
    paddingRight: "7.5rem",
    paddingBottom: "5rem",
  },
})

export const StickyNavWrapper = stitches.styled("div", {
  width: "100%",
  backgroundColor: "$paMoonLight",
  "@bp2": {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  "@bp4": {
    paddingLeft: "7.5rem",
    paddingRight: "7.5rem",
  },
  variants: {
    sticky: {
      true: {
        position: "sticky",
        top: 0,
        padding: "0 !important",
        zIndex: "$sticky",
      },
      false: {},
    },
  },
})

export const DesktopNav = stitches.styled("div", {
  display: "none",
  justifyContent: "space-between",
  height: "90px",
  borderBottom: "3px solid $paDark",
  "@bp3": {
    display: "flex",
    borderTop: "2px solid $paDark",
    borderBottom: "6px solid $paDark",
  },

  variants: {
    sticky: {
      true: {
        "@bp2": {
          marginLeft: "40px",
          marginRight: "40px",
        },
        "@bp4": {
          marginLeft: "7.5rem",
          marginRight: "7.5rem",
        },
      },
      false: {},
    },
  },
})

export const MobileNav = stitches.styled("div", {
  borderBottom: "3px solid $paDark",
  overflow: "clip",

  "@bp3": {
    display: "none",
  },
})

export const NavLink = stitches.styled("a", {
  fontFamily: "$inter",
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 0.5,
  color: "$paDark",
  textDecoration: "none",
  userSelect: "none",
  cursor: "pointer",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "$paBrown",
  },

  variants: {
    active: {
      true: {
        color: "$paBrown",
      },
      false: {},
    },
  },
})

export const MobileNavLink = stitches.styled("a", {
  height: "90px",
  backgroundColor: "$paMoonLight",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "$inter",
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 0.5,
  color: "$paDark",
  textDecoration: "none",
  userSelect: "none",
  cursor: "pointer",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "$paBrown",
  },
  borderBottom: "1px solid $paDark",
  "&:last-child": {
    borderBottom: "none",
  },

  variants: {
    active: {
      true: {
        color: "$paBrown",
      },
      false: {},
    },
  },
})

export const Header = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: "3.47125rem",
  lineHeight: 0.85,
  textAlign: "center",
  transform: "translateY(1.5rem)",

  "@bp2": {
    fontSize: "8rem",
    transform: "translateY(3.5rem)",
  },

  "@bp3": {
    fontSize: "13.4875rem",
    transform: "translateY(5.5rem)",
  },
})

export const Heading = stitches.styled("h2", {
  fontFamily: "$sawton",
  fontWeight: 700,
  textTransform: "uppercase",
  textAlign: "center",
  marginBottom: "5rem",
  fontSize: "2.5625rem",
  lineHeight: 0.8,

  "@bp2": {
    fontSize: "5.625rem",
  },

  variants: {
    color: {
      light: {
        color: "$paMoonLight",
      },
      dark: {
        color: "$paDark",
      },
    },
  },

  defaultVariants: {
    color: "dark",
  },
})

export const Text = stitches.styled("span", {
  fontFamily: "$inter",
  fontSize: "16px",
  lineHeight: 2,
})

export const Emphasis = stitches.styled("em", {
  fontFamily: "$inter",
  fontWeight: 500,
})

export const Strong = stitches.styled("strong", {
  fontFamily: "$inter",
  fontWeight: 700,
})

export const VerticalLine = stitches.styled("div", {
  width: 0,

  variants: {
    color: {
      light: {
        borderLeft: "1px solid $paMoonLight",
        borderRight: "1px solid $paMoonLight",
      },
      dark: {
        borderLeft: "1px solid $paLupine",
        borderRight: "1px solid $paLupine",
      },
    },
    length: {
      base: {
        height: 128,
      },
      long: {
        height: 276,
      },
    },
  },

  defaultVariants: {
    length: "base",
    color: "light",
  },
})

export const NftButton = stitches.styled("a", {
  height: "86px",
  width: "234px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "12px 18px",
  borderRadius: "5px",
  color: "$paLupine",
  userSelect: "none",

  variants: {
    variant: {
      c1: {
        backgroundColor: "$paC1",
      },
      c2: {
        backgroundColor: "#paC2",
      },
      c3: {
        backgroundColor: "#paC3",
      },
    },
  },
})
