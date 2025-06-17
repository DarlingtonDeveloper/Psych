import stitches from "../../stitches"

const VerseHeader = stitches.styled("h1", {
  fontWeight: 800,
  fontSize: "2.5rem",
  lineHeight: 0.75,
  color: "$paLightGrey",
  "> span": {
    color: "$paIce",
  },
  "> span:first-child": {
    color: "$paYellow",
  },
  "@bp3": {
    fontSize: "3rem",
  },
})

export default VerseHeader
