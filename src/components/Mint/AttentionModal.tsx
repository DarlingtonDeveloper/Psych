import React, { ReactElement } from "react"
import stitches from "../../stitches"
import NFTModal from "./NFTModal"

interface AttentionModalProps {
  close: () => void
  header: string
  message: ReactElement
}

const Header = stitches.styled("h1", {
  fontSize: "$rg",
  letterSpacing: 3,
  fontWeight: "normal",
  textTransform: "uppercase",
  color: "$paIce",
  "&:before": {
    content: "/",
    color: "$paIce",
    fontSize: "$rg",
    marginRight: "$xs",
  },
})

const AttentionModal = ({ close, header, message }: AttentionModalProps) => (
  <NFTModal close={close}>
    <Header>{header}</Header>
    {message}
  </NFTModal>
)

export default AttentionModal
