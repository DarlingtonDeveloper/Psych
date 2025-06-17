import React, { createContext, useCallback, useState } from "react"
import * as Toast from "@radix-ui/react-toast"
import stitches from "../stitches"
import { fadeOut } from "../stitches/keyframes"
import Box from "../components/common/Box"
import Button from "../components/common/ButtonV2"

interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastMeta {
  header?: string
  description: string
}

export interface ToastProviderReturn {
  open: boolean
  showToast: (meta: ToastMeta) => void
}

export const ToastContext = createContext({} as ToastProviderReturn)

export const slideIn = stitches.keyframes({
  from: { transform: `translateX(calc(100%))` },
  to: { transform: "translateX(0)" },
})

export const swipeOut = stitches.keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100%))` },
})

const Viewport = stitches.styled(Toast.Viewport, {
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  top: 0,
  padding: "$rg",
  zIndex: "$toast",
  margin: 0,
  width: "100vw",
})

const ToastContainer = stitches.styled(Toast.Root, {
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: "$rg",
  display: "grid",
  gridTemplateColumns: "auto max-content",
  columnGap: "$xs",
  alignItems: "center",
  backgroundColor: "$paMoonLight",
  width: "100%",
  maxWidth: "25rem",
  color: "$paLupine",
  fontFamily: "$inter",

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: "translateX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
})

const Description = stitches.styled(Toast.Description, {
  overflowWrap: "break-word",
})

const ActionContainer = stitches.styled(Toast.Action, {
  backgroundColor: "transparent",
  border: "none",
  "&:hover": {
    cursor: "pointer",
  },
})

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [open, setOpen] = useState(false)
  const [meta, setMeta] = useState<ToastMeta>()

  const showToast = useCallback((meta: ToastMeta) => {
    setMeta(meta)
    setOpen(true)
  }, [])

  return (
    <ToastContext.Provider value={{ open, showToast }}>
      <Toast.Provider>
        <ToastContainer open={open} onOpenChange={setOpen}>
          <Box css={{ display: "flex", gap: "$xs", flexDirection: "column" }}>
            {meta?.header && (
              <Toast.Title>
                <Box css={{ fontWeight: "$bold" }}>{meta?.header}</Box>
              </Toast.Title>
            )}
            <Description>{meta?.description}</Description>
          </Box>
          <ActionContainer
            altText={`close ${meta?.header} and ${meta?.description} toast notification`}
          >
            <Button color="lupine" as="div">
              OK
            </Button>
          </ActionContainer>
        </ToastContainer>
        <Viewport />
      </Toast.Provider>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
