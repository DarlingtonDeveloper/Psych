import stitches from "../../stitches"

const Input = stitches.styled("input", {
  backgroundColor: "transparent",
  border: "1px solid $paLightGrey",
  fontSize: "$rg",
  outline: 0,
  color: "$paIce",
  textAlign: "center",
  textTransform: "uppercase",
  width: "100%",
  padding: "$md",
  fontWeight: 600,
  variants: {
    error: {
      true: {
        border: "1px solid $paRed",
      },
    },
  },
})

export default Input
