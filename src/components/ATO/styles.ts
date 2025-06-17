import stitches from "../../stitches"
import Fold from "../common/Fold"

export const Container = stitches.styled(Fold, {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  backgroundColor: "$paDustv2",
})

export const Header = stitches.styled("h3", {
  fontSize: 42,
  lineHeight: "50px",
  color: "$paLupine",
})

export const Text = stitches.styled("p", {
  fontFamily: "$inter",
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "32px",
  textAlign: "center",
  variants: {
    fontWeight: {
      400: {
        fontWeight: 400,
      },
      600: {
        fontWeight: 600,
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
  },
})

export const DescriptionWrapper = stitches.styled("div", {
  width: "100%",
  maxWidth: 448,
  marginTop: 36,
})

export const WalletWrapper = stitches.styled("div", {
  display: "flex",
  gap: "16px",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  margin: "40px 0",
  "@bp2": {
    flexDirection: "row",
    justifyContent: "center",
  },
})

export const WalletIconWrapper = stitches.styled("div", {
  backgroundColor: "$paDustv2",
  width: 46,
  height: 46,
  borderRadius: "100%",
  color: "$paLupine",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "18px 20px",
})

export const WalletTab = stitches.styled("div", {
  width: "100%",
  maxWidth: "initial",
  borderRadius: 16,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "12px",
  "@bp2": {
    maxWidth: "270px",
  },
  variants: {
    cardColor: {
      green: {
        backgroundColor: "$paGreenV2",
        color: "$paMoonlight",
      },
      black: {
        backgroundColor: "$paLupine",
        color: "$paMoonlight",
      },
      sage: {
        backgroundColor: "$paSage",
        color: "$paLupine",
      },
    },
  },
})

export const WalletText = stitches.styled("p", {
  fontFamily: "$inter",
  color: "$paMoonLight",
  margin: 0,
  variants: {
    type: {
      number: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 700,
      },
      label: {
        fontSize: 14,
        lineHeight: "21px",
      },
    },
  },
})

export const ChartPanel = stitches.styled("div", {
  background: "#E9EAE5",
  borderRadius: 16,
  display: "flex",
  width: "100%",
  maxWidth: "842px",
  flexDirection: "column",
  alignItems: "center",
  padding: 24,
  "@bp2": {
    padding: 48,
  },
})

export const ChartMaxWidth = stitches.styled("div", {
  maxWidth: 448,
  width: "calc(100% + 40px)",
  "& > svg": {
    overflow: "visible",
  },
  "@bp2": {
    width: "100%",
    padding: 0,
  },
})

export const TextSVG = stitches.styled("text", {
  fontFamily: "$inter",
  color: "$paLupine",
  fill: "$paLupine",
})

export const TextGroup = stitches.styled("g", {
  display: "none",
  visibility: "hidden",
  "@bp2": {
    display: "block",
    visibility: "visible",
  },
})

export const ChartMobilePercentage = stitches.styled("dd", {
  fontSize: 24,
  lineHeight: "32px",
  color: "$paLupine",
  fontWeight: 700,
})

export const ChartMobileLabel = stitches.styled("dt", {
  fontFamily: "$inter",
  fontSize: 16,
  lineHeight: "32px",
  color: "$paLupine",
  fontWeight: 600,
})

export const ChartMobileLabelList = stitches.styled("dl", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  margin: "30px 0",
  width: "100%",
  "@bp2": {
    display: "none",
    visibility: "hidden",
  },
})

export const LabelWrapper = stitches.styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexFlow: "wrap",
})

export const RelativeEllipse = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "31px",
  height: "31px",
})

export const OuterEllipse = stitches.styled("div", {
  position: "absolute",
  width: "31px",
  height: "31px",
  opacity: 0.2,
  borderRadius: "100%",
  variants: {
    ellipseColor: {
      green: {
        backgroundColor: "$paGreenV2",
      },
      sage: {
        backgroundColor: "$paSage",
      },
      black: {
        backgroundColor: "$paLupine",
      },
    },
  },
})

export const InnerEllipse = stitches.styled(OuterEllipse, {
  width: "17px",
  height: "17px",
  border: "1px solid $paWhite",
  borderRadius: "100%",
  opacity: 1,
})

export const EllipseWithLabel = stitches.styled("div", {
  display: "flex",
  gap: "12px",
})
