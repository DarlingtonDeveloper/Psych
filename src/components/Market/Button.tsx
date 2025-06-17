import React from "react"
import stitches from "../../stitches"

interface ButtonProps {
  href: string
  children: React.ReactNode
}

const StyledButton = stitches.styled("a", {
  fontFamily: "$proxima",
  color: "$paIce",
  fontSize: "$sm",
  padding: "$sm $lg",
  border: 0,
  outline: "none",
  textDecoration: "none",
  boxShadow: "none",
  textTransform: "uppercase",
  backgroundColor: "$paBlue",
  "&:hover": {
    cursor: "pointer",
  },
})

const Button = ({ href, children }: ButtonProps) => (
  <StyledButton href={href} target="_blank" rel="noreferrer">
    {children}
  </StyledButton>
)

export default Button
