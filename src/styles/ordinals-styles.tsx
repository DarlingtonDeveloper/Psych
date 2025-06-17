import stitches from "../stitches"
import Fold from "../components/common/Fold"

const Flex = stitches.styled("div", {
  display: "flex",
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

export const ContentContainer = stitches.styled("div", {
  minHeight: "100vh",
  background: `url(${require("../images/ordinals/symbol.svg?url")}) no-repeat, linear-gradient(90deg, #EEC2B8 1.57%, #E3DCCE 51.32%, #CBDBC3 98.25%)`,
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  paddingLeft: "60px",
  paddingRight: "60px",
  paddingTop: "192px",
  paddingBottom: "160px",
  color: "$paDark",

  "@bp3": {
    paddingLeft: "7.5rem",
    paddingRight: "7.5rem",
    paddingBottom: "300px",
  },
})

export const HeaderWrapper = stitches.styled("div", {
  mixBlendMode: "soft-light",
})

export const Header = stitches.styled("h1", {
  textAlign: "center",
  fontFamily: "$sawton",
  fontSize: "56px",
  fontWeight: 700,
  lineHeight: 0.9,
  textTransform: "uppercase",

  backgroundColor: "#EEC2B8",
  backgroundImage:
    "linear-gradient(90deg, #EEC2B8 1.57%, #E3DCCE 51.32%, #CBDBC3 98.25%)",
  backgroundSize: "100%",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",

  "@bp2": {
    fontSize: "6rem",
    letterSpacing: "-0.15rem",
    lineHeight: 0.8,
  },

  "@bp4": {
    fontSize: "10.25rem",
    letterSpacing: "-0.3075rem",
  },
})

export const Heading = stitches.styled("h2", {
  fontFamily: "$inter",
  fontSize: "1.125rem",
  fontWeight: 600,
  lineHeight: "2rem",
})

export const Subheading = stitches.styled("h3", {
  fontFamily: "$inter",
  fontSize: "16px",
  fontWeight: 500,
  fontStyle: "italic",
  lineHeight: 2,
})

export const Text = stitches.styled("span", {
  fontFamily: "$inter",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 2,
})

export const RadioFieldGroup = stitches.styled(Flex, {
  flexDirection: "column",
  alignItems: "stretch",
  color: "$paLupine",
  columnGap: "44px",

  "@bp3": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export const RadioField = stitches.styled("div", {
  borderBottom: "1px solid $paLupine",
  padding: "40px 0",
  "&:first-of-type": {
    borderTop: "1px solid $paLupine",
  },

  "@bp3": {
    maxWidth: "300px",
    borderTop: "1px solid $paLupine",
    borderBottom: "1px solid $paLupine",
  },
})

export const TextFieldGroup = stitches.styled(Flex, {
  flexDirection: "column",

  "@bp3": {
    flexDirection: "row",
  },
})

export const TextField = stitches.styled(Flex, {
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  rowGap: "12px",
})

export const TextInput = stitches.styled("input", {
  backgroundColor: "$paMoonLight",
  border: "none",
  borderRadius: "5px",
  fontSize: "14px",
  lineHeight: "21px",
  padding: "12px 20px",
  width: "100%",
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
})

export const Divider = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "0 11px",
})

export const Error = stitches.styled("p", {
  textAlign: "center",
  fontSize: "14px",
  fontWeight: 500,
  color: "$paFlame",
  lineHeight: 2,
  margin: "1em auto",
})
