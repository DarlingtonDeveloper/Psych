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
  alignItems: "center",
  padding: "$lg",
  height: "100vh",
  width: "100vw",
  zIndex: "$modal",
})

const Modal = stitches.styled("aside", {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  padding: "$lg",
  maxWidth: "40rem",
  boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
  animation: `${modalAppear} ease-in 0.2s`,
  width: "100%",
  height: "fit-content",
  lineHeight: 1.5,
  backgroundColor: "$paIce",
  maxHeight: "70vh",
  overflowY: "scroll",
})

const SizeGrid = stitches.styled("div", {
  marginTop: "$lg",
  display: "grid",
  gridGap: "$lg",
  gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
})

interface IRLSizeModalProps {
  close: () => void
}

const IRLSizeModal: React.FC<IRLSizeModalProps> = ({ close }) => {
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
            <div>[Tees]</div>
            <SizeGrid
              css={{
                marginTop: "$rg",
                flexWrap: "wrap",
                justifyContent: "space-between",
                "> img": {
                  width: "30rem",
                },
              }}
            >
              <img
                src={require("../../images/sizes.png?url")}
                alt="Sizing Guide"
              />
            </SizeGrid>
          </Modal>
        </Container>,
        document.body
      )
    : null
}

export default IRLSizeModal
