import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import stitches from "../../stitches"
import { Cross2Icon } from "@radix-ui/react-icons"
import { fadeIn, scaleShow } from "../../stitches/keyframes"
import Button from "../common/ButtonV2"
import ThreeBarsIcon from "./ThreeBarsIcon"
import Box from "../common/Box"
import ENTRIES from "./entries.json"

const Overlay = stitches.styled(DialogPrimitive.Overlay, {
  backgroundColor: "$modalOverlayBlack",
  position: "fixed",
  width: "100vw",
  height: "100vh",
  zIndex: "$modal",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

const DialogContainer = stitches.styled(DialogPrimitive.Content, {
  fontFamily: "$inter",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
  borderRadius: "10px",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "20rem",
  maxHeight: "85vh",
  padding: "$lg",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${scaleShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
})

const DialogContent: React.FC = ({ children, ...props }) => (
  <DialogPrimitive.Portal>
    <Overlay />
    <DialogContainer {...props}>{children}</DialogContainer>
  </DialogPrimitive.Portal>
)

const DialogTitle = stitches.styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: "bold",
  color: "$paLupine",
  fontSize: "$rg",
})

const DialogDescription = stitches.styled(DialogPrimitive.Description, {
  margin: "$lg 0 0",
  fontSize: "$rg",
  lineHeight: 1.5,
})

const Entry = stitches.styled("div", {
  display: "flex",
  justifyContent: "space-between",
  padding: "$sm 0",
})

const IconButton = stitches.styled(DialogPrimitive.Close, {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 35,
  width: 35,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$paLupine",
  position: "absolute",
  top: "1.33rem",
  right: "1.1rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const NFTEntryDialog = () => (
  <DialogPrimitive.Root>
    <DialogPrimitive.Trigger asChild>
      <Button shape="circular" text="normal">
        <ThreeBarsIcon />
        <Box css={{ fontSize: "$sm", marginLeft: "$xxs" }}>NFT Weighting</Box>
      </Button>
    </DialogPrimitive.Trigger>
    <DialogContent>
      <DialogTitle>NFT Entries</DialogTitle>
      <DialogDescription>
        <Box css={{ "> * + *": { borderTop: "1px solid $paLightGrey" } }}>
          {ENTRIES.map(({ name, quantity }) => (
            <Entry key={name}>
              <Box>{name}</Box>
              <Box css={{ fontWeight: "bold" }}>{quantity}</Box>
            </Entry>
          ))}
        </Box>
      </DialogDescription>
      <IconButton>
        <Cross2Icon />
      </IconButton>
    </DialogContent>
  </DialogPrimitive.Root>
)

export default NFTEntryDialog
