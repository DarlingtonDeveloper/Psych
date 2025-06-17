import stitches from "../../stitches"

const TokenTypeInput = stitches.styled("input", {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  padding: "$sm",
  gap: "$sm",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
  boxShadow: `0 2px 10px $paMid`,
  "&:hover": { backgroundColor: "$paMoonLight" },
  "&:focus": { boxShadow: `0 0 0 2px $paMid` },
  variants: {
    error: {
      true: {
        border: "1px solid $paFormRed",
      },
    },
  },
})

export default TokenTypeInput
