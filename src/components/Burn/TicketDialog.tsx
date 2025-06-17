import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import stitches from "../../stitches"
import { Cross2Icon } from "@radix-ui/react-icons"
import { fadeIn, scaleShow } from "../../stitches/keyframes"
import Button from "../common/ButtonV2"
import Box from "../common/Box"
import TicketIcon from "./TicketIcon"
import { useWalletContext } from "../../context/WalletProvider"
import axios from "axios"
import { useQuery } from "react-query"
import { ScaleLoader } from "react-spinners"
import VerticalGrid from "../common/VerticalGrid"

interface TicketDialogProps {
  weekNo: number
}

interface AddressTotalEntriesResponse {
  entries: number
}

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

const TicketDialog = ({ weekNo }: TicketDialogProps) => {
  const [wallet] = useWalletContext()
  const walletTotalWeekQuery = useQuery(
    ["address-entries", weekNo, wallet?.address],
    async () => {
      const request = await axios.get<AddressTotalEntriesResponse>(
        process.env.NEXT_PUBLIC_ADDRESS_WEEK_ENTRIES_ENDPOINT as string,
        {
          params: {
            weekNo,
            walletAddress: wallet!.address,
          },
        }
      )
      return request.data
    }
  )

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <Button shape="circular" text="normal">
          <TicketIcon />
          <Box
            css={{ fontSize: "$sm", marginLeft: "$xxs" }}
          >{`My W${weekNo} Entries`}</Box>
        </Button>
      </DialogPrimitive.Trigger>
      <DialogContent>
        <DialogTitle>Week {weekNo}</DialogTitle>
        <DialogDescription>
          {walletTotalWeekQuery.isLoading ? (
            <ScaleLoader
              color={stitches.theme.colors.paLupine.value}
              height={15}
            />
          ) : (
            <VerticalGrid>
              <Box>
                You have{" "}
                <strong>
                  {walletTotalWeekQuery.isSuccess
                    ? walletTotalWeekQuery.data?.entries
                    : 0}{" "}
                  entries
                </strong>{" "}
                in total for the current raffle.
              </Box>
              <Box css={{ fontSize: "$sm" }}>
                Note: Your current entries will be displayed once confirmed on
                the blockchain.
              </Box>
            </VerticalGrid>
          )}
        </DialogDescription>
        <IconButton>
          <Cross2Icon />
        </IconButton>
      </DialogContent>
    </DialogPrimitive.Root>
  )
}

export default TicketDialog
