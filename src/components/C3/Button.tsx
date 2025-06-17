import stitches from "../../stitches"

const Button = stitches.styled("button", {
  border: "none",
  boxShadow: "none",
  backgroundColor: "$paLightGrey",
  textTransform: "uppercase",
  color: "$paDark",
  padding: "$md",
  width: "100%",
  fontSize: "$rg",
  fontWeight: "600",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
  transition: "opacity ease-in 0.3s",
})

export default Button
