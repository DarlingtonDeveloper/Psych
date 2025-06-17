import React, { useState } from "react"
import Button from "../../../../components/common/ButtonV2"
import stitches from "../../../../stitches"
import WalletIcon from "../../../../components/common/WalletCard/WalletIcon"
import Loader from "react-spinners/BeatLoader"
import ButtonLoading from "../../../../components/common/ButtonLoading"
import { useGlobalConnectContext } from "../../../../context/GlobalConnectProvider"
import useToast from "../../../../hooks/useToast"
import axios from "axios"

const HeaderCompensate = stitches.styled("div", {
  margin: "10rem 0 8rem 0",
  display: "none",
  visibility: "hidden",
  "@bp2": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    visibility: "visible",
  },
})

const Wrapper = stitches.styled("div", {
  display: "grid",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: 1337,
  alignItems: "center",
  padding: "1.25rem 0",
  margin: "0 $md",
  gridTemplateColumns: "repeat(4, 1fr)",
  justifyItems: "center",
  border: "1px solid $paLupine",
  borderLeft: 0,
  borderRight: 0,
  overflow: "hidden",
})

const StyledButton = stitches.styled(Button, {
  gap: "8px",
  borderRadius: 5,
  width: "100%",
})

const DisconnectButton = stitches.styled(Button, {
  gap: "8px",
  borderRadius: 5,
})

const LabelText = stitches.styled("p", {
  fontFamily: "$inter",
  fontSize: "12px",
  lineHeight: "22px",
  color: "$paMoonLight",
  margin: 0,
  textAlign: "center",
})

const InfoWrapper = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
})

const Balance = stitches.styled("p", {
  fontFamily: "$sawton",
  fontWeight: 700,
  fontSize: 26,
  color: "$paMoonLight",
  margin: 0,
  textAlign: "center",
})

const BalanceUnit = stitches.styled("span", {
  fontFamily: "$inter",
  fontSize: 16,
  color: "$paMoonLight",
})

const WalletWrapper = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  width: "100%",
  flexDirection: "row",
  overflow: "hidden",
})

const WalletAddress = stitches.styled("p", {
  color: "$paMoonLight",
  fontSize: 19,
  lineHeight: "21px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
})

const UnclaimedPsy = stitches.styled("p", {
  margin: 0,
  fontFamily: "$sawton",
  color: "$paGreenV2",
  fontSize: 26,
  textAlign: "center",
})

const UnclaimedUnit = stitches.styled("span", {
  color: "$paGreenV2",
  fontFamily: "$inter",
  fontWeight: 400,
  fontSize: 20,
})

const TransferSection = stitches.styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "center",
  gap: "20px",
  marginTop: "2rem",
  width: "100%",
  maxWidth: 1337,
  padding: "1.25rem",
  border: "1px solid $paLupine",
  borderRadius: "5px",
})

const Input = stitches.styled("input", {
  width: "100%",
  padding: "8px 12px",
  borderRadius: 5,
  border: "1px solid $paLupine",
  backgroundColor: "transparent",
  color: "$paMoonLight",
  fontFamily: "$inter",
  fontSize: "14px",
  '&[type="number"]': {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
})

const ImportantMessageWrapper = stitches.styled("div", {
  width: "100%",
  maxWidth: 1337,
  padding: "1.25rem",
  gridTemplateColumns: "1fr",
  margin: "0 $md",
  borderTop: "1px solid $paLupine",
  borderBottom: "1px solid $paLupine",
})

const ImportantMessage = stitches.styled("p", {
  fontFamily: "$inter",
  fontSize: "12px",
  lineHeight: "1.5",
  color: "$paMoonLight",
  margin: 0,
  gridColumn: "1 / -1",
})

interface Props {
  isLoading: boolean
  balance: number
  unclaimed: number
  handleClaim: () => void
  isClaiming: boolean
}

export const WalletBalanceDesktop: React.FC<Props> = ({
  isLoading,
  balance,
  unclaimed,
  handleClaim,
  isClaiming,
}) => {
  const { wallet, globalConnectControls } = useGlobalConnectContext()
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const { showToast } = useToast()

  const handleTransfer = async () => {
    if (!recipientAddress || !amount) {
      showToast({
        description: "Please fill in both recipient address and amount.",
      })
      return
    }
    setIsTransferring(true)
    try {
      const transferData = {
        walletAddress: wallet?.address,
        recipientAddress,
        amount: parseFloat(amount),
      }
      console.log("Transfer data:", transferData)

      const response = await axios.post(
        "/.netlify/functions/transfer-psypoints",
        transferData
      )
      console.log("Transfer response:", response.data)

      showToast({ description: "PSY transfer successful, please refresh." })
      setRecipientAddress("")
      setAmount("")
    } catch (error) {
      console.error("Transfer error:", error)
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data)
        console.error("Error status:", error.response.status)
        showToast({
          description:
            error.response.data.message || "Transfer failed. Please try again.",
        })
      } else {
        showToast({
          description: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <HeaderCompensate>
      <Wrapper>
        <WalletWrapper>
          <DisconnectButton onClick={globalConnectControls.disconnect}>
            <WalletIcon /> DISCONNECT
          </DisconnectButton>
          <WalletAddress>{wallet?.address}</WalletAddress>
        </WalletWrapper>
        <InfoWrapper>
          <LabelText>BALANCE</LabelText>
          {isLoading ? (
            <Loader
              css="margin: 12px 0 0 0;"
              color={stitches.theme.colors.paWhite.value}
            />
          ) : (
            <Balance>
              {balance} <BalanceUnit>PSY</BalanceUnit>
            </Balance>
          )}
        </InfoWrapper>

        <InfoWrapper>
          <LabelText>UNCLAIMED</LabelText>
          {isLoading ? (
            <Loader
              css="margin: 12px 0 0 0;"
              color={stitches.theme.colors.paWhite.value}
            />
          ) : (
            <UnclaimedPsy>
              {unclaimed} <UnclaimedUnit>PSY</UnclaimedUnit>
            </UnclaimedPsy>
          )}
        </InfoWrapper>
        <InfoWrapper>
          <StyledButton
            color="green"
            disabled={unclaimed === 0 || isClaiming}
            onClick={handleClaim}
          >
            {isClaiming ? (
              <ButtonLoading color={stitches.theme.colors.paMoonLight.value} />
            ) : (
              "Claim PSY"
            )}
          </StyledButton>
        </InfoWrapper>
      </Wrapper>
      <ImportantMessageWrapper>
        <ImportantMessage>
          IMPORTANT: Please double check the wallet address you&apos;re sending
          points to is correct. PsyZen and Psychedelics Anonymous are not liable
          for your points if sent to the wrong address. Currently, points can
          only be sent to wallet addresses that have connected to Mycelia V2
          before. Please ensure anyone you&apos;re gifting to has a wallet
          that&apos;s connected to this site before.
        </ImportantMessage>
      </ImportantMessageWrapper>
      <TransferSection>
        <InfoWrapper>
          <Input
            placeholder="Recipient Wallet Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </InfoWrapper>
        <InfoWrapper>
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InfoWrapper>
        <InfoWrapper>
          <StyledButton
            color="green"
            onClick={handleTransfer}
            disabled={isTransferring}
          >
            {isTransferring ? (
              <ButtonLoading color={stitches.theme.colors.paMoonLight.value} />
            ) : (
              "Transfer PSY"
            )}
          </StyledButton>
        </InfoWrapper>
      </TransferSection>
    </HeaderCompensate>
  )
}
