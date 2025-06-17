import stitches from "../../stitches"

const Button = stitches.styled("button", {
  border: "none",
  boxShadow: "none",
  backgroundColor: "$paBlue",
  textTransform: "uppercase",
  color: "$paIce",
  padding: "$sm",
  width: "100%",
  "&:hover": {
    cursor: "pointer",
    opacity: 0.8,
  },
  transition: "opacity ease-in 0.3s",
})

export default Button
