import React, { ComponentProps } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import stitches from "../../stitches"
import { keyframes } from "@stitches/react"

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "scale(.96)" },
  "100%": { opacity: 1, transform: "scale(1)" },
})

const DialogOverlay = stitches.styled(Dialog.Overlay, {
  backgroundColor: "rgba(0,0,0,0.6)",
  position: "fixed",
  inset: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "$overlay",
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const DialogContent = stitches.styled(Dialog.Content, {
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  width: "100%",
  maxHeight: "85vh",
  padding: "32px",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  zIndex: "$modal",
  "&:focus": { outline: "none" },
})

export const ModalHeading = stitches.styled("h2", {
  fontWeight: 800,
  fontSize: "14px",
  color: "$dawnFlame",
  "@lg": {
    fontSize: "19px",
  },
})

export const DialogPortal = stitches.styled(Dialog.Portal, {
  overflow: "auto",
})

interface Props extends ComponentProps<typeof DialogContent> {
  isOpen: boolean
  onToggle?: () => void
}

const Modal: React.FC<Props> = ({
  isOpen,
  onToggle,
  children,
  ...contentProps
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent {...contentProps}>{children}</DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog.Root>
  )
}

export default Modal
