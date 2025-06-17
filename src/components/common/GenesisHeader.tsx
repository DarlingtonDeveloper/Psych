import stitches from "../../stitches"

const GenesisHeader = stitches.styled("h1", {
  fontSize: "$md",
  color: "$paIce",
  fontWeight: 200,
  letterSpacing: 3,
  textTransform: "uppercase",
  "&:before": {
    content: "/",
    color: "$paIce",
    fontSize: "inherit",
    marginRight: "$sm",
  },
})

export default GenesisHeader
