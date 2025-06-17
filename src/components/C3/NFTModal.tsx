import useClickOutside from "click-outside-hook"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import stitches from "../../stitches"
import XCircledIcon from "./XCircledIcon"

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
  backgroundColor: "$paDark",
  border: "1px solid $paLightGrey",
  borderBottom: "5px solid $paLightGrey",
  color: "$paIce",
  display: "flex",
  flexDirection: "column",
  fontFamily: "$proxima",
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
  top: "0.5rem",
  right: "0.5rem",
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
              <XCircledIcon />
            </CloseContainer>
          </Modal>
        </Container>,
        document.body
      )
    : null
}

export default NFTModal
