import stitches from "../../stitches"

const VerticalGrid = stitches.styled("div", {
  display: "grid",
  height: "fit-content",
  gridTemplateColumns: "1fr",
  gridGap: "$rg",
  width: "100%",
})

export default VerticalGrid
