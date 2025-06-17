import React from "react"
import stitches from "../../stitches"
import { PuffLoader } from "react-spinners"

interface ButtonLoadingProps {
  color: string
}

const Containter = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 $lg",
})

const ButtonLoading = ({ color }: ButtonLoadingProps) => (
  <Containter>
    <PuffLoader color={color} size={15} />
  </Containter>
)

export default ButtonLoading
