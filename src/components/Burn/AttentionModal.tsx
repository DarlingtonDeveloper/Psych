import React, { ReactElement } from "react"
import stitches from "../../stitches"
import NFTModal from "./NFTModal"

interface AttentionModalProps {
  close: () => void
  header: string
  message: ReactElement
}

const Header = stitches.styled("h1", {
  fontFamily: "$inter",
  color: "$paLupine",
  fontSize: "$rg",
  fontWeight: "bold",
  textTransform: "uppercase",
  "> p": {
    margin: 0,
  },
})

const AttentionModal = ({ close, header, message }: AttentionModalProps) => (
  <NFTModal close={close}>
    <Header>{header}</Header>
    {message}
  </NFTModal>
)

export default AttentionModal
