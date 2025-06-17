import stitches from "../../stitches"

const Input = stitches.styled("input", {
  backgroundColor: "$paIce",
  border: "none",
  borderBottom: "1px solid $paLightGrey",
  fontSize: "$rg",
  outline: 0,
  width: "100%",
  padding: "$xxs",
  variants: {
    error: {
      true: {
        border: "1px solid $paRed",
      },
    },
  },
})

export default Input
