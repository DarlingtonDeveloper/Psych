import stitches from "../../stitches"

const Select = stitches.styled("select", {
  width: "100%",
  backgroundImage: `url(/select-arrow.svg)`,
  backgroundColor: "transparent",
  border: "1px solid $paIce",
  color: "$paIce",
  borderRadius: "$sm",
  fontSize: "$sm",
  outline: 0,
  textTransform: "uppercase",
  padding: "12px",
  paddingRight: "30px",
  height: "fit-content",
  "> option": {
    color: "$paDark",
  },
  "@bp3": {
    width: "auto",
  },
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "98%",
  backgroundPositionY: "50%",
  appearance: "none",
})

export default Select
