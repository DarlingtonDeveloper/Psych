import { Cross2Icon } from "@radix-ui/react-icons"
import useClickOutside from "click-outside-hook"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import stitches from "../../stitches"

const modalAppear = stitches.keyframes({
  "0%": { opacity: 0, top: -20 },
  "100%": { opacity: 1, top: 0 },
})

const Container = stitches.styled("div", {
  backgroundColor: "rgba(0,0,0,0.4)",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  padding: "$lg",
  height: "100vh",
  width: "100vw",
  zIndex: "$modal",
})

const Modal = stitches.styled("aside", {
  position: "relative",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
  display: "flex",
  flexDirection: "column",
  fontFamily: "$inter",
  padding: "$lg",
  maxWidth: "30rem",
  boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
  animation: `${modalAppear} ease-in 0.2s`,
  width: "100%",
  height: "fit-content",
  lineHeight: 1.5,
})

const CloseContainer = stitches.styled("span", {
  position: "absolute",
  top: "1.5rem",
  right: "1.5rem",
  "&:hover": {
    cursor: "pointer",
  },
})

interface NFTItemModalProps {
  close: () => void
}

const NFTModal: React.FC<NFTItemModalProps> = ({ close, children }) => {
  const modalRef = useClickOutside(close)

  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <Container>
          <Modal ref={modalRef}>
            {children}
            <CloseContainer onClick={close}>
              <Cross2Icon />
            </CloseContainer>
          </Modal>
        </Container>,
        document.body
      )
    : null
}

export default NFTModal
