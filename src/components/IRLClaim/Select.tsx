import stitches from "../../stitches"

const Select = stitches.styled("select", {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid $paIce",
  color: "$paIce",
  borderRadius: "$sm",
  fontSize: "$rg",
  outline: 0,
  width: "100%",
  padding: "$xxs",
  "> option": {
    color: "$paDark",
  },
  variants: {
    error: {
      true: {
        border: "1px solid $paRed",
      },
    },
  },
})

export default Select
