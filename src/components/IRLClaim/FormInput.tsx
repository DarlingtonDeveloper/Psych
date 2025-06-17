import stitches from "../../stitches"

const FormInput = stitches.styled("input", {
  backgroundColor: "transparent",
  border: "none",
  color: "$paIce",
  borderBottom: "1px solid $paIce",
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

export default FormInput
