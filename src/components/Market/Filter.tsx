import React from "react"
import stitches from "../../stitches"

interface FilterProps {
  onClick: () => void
  disabled: boolean
  icon: React.ReactNode
  text: string
}

const Container = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$paIce",
  color: "$paGrey",
  padding: "$rg",
  fontSize: "$rg",
  width: "100%",
  textTransform: "uppercase",
  "> svg": {
    marginRight: "$rg",
  },
  "&:hover": {
    cursor: "pointer",
  },
  "@bp3": {
    maxWidth: "18rem",
  },
  transition: "backgroundColor ease-in 0.5s",
  variants: {
    disabled: {
      true: {
        backgroundColor: "$paLightGrey",
        color: "$paGrey",
      },
    },
  },
})

const Filter = ({ disabled, icon, text, onClick }: FilterProps) => (
  <Container onClick={onClick} disabled={disabled}>
    {icon}
    <div>{text}</div>
  </Container>
)

export default Filter
