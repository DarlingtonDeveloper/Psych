import Button from "../../../../components/common/ButtonV2"
import stitches from "../../../../stitches"

export const Grid = stitches.styled("section", {
  margin: "48px 0",
  display: "grid",
  gap: "48px",
  justifyContent: "center",
  "@bp2": {
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gap: "112px",
  },
  minHeight: "360px",
})

export const ActionButton = stitches.styled(Button, {
  gap: "8px",
  borderRadius: 5,
  height: 46,
  fontSize: 14,
  lineHeight: 21,
  fontFamily: "$inter",
  width: "100%",
  "@bp2": {
    width: "auto",
  },
  variants: {
    variant: {
      staked: {
        background: "$paRedV2",
        border: "$paRedV2",
        color: "$paMoonLight",
      },
      unstaked: {
        background: "$paGreenV2",
        border: "$paGreenV2",
        color: "$paMoonLight",
      },
    },
  },
})

export const ToolbarWrapper = stitches.styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: 24,
  width: "100%",
  "@bp2": {
    gap: "initial",
    justifyContent: "space-between",
    flexDirection: "row",
  },
})
