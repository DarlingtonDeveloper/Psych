import React, { useState, useEffect } from "react"
import stitches from "../../stitches"
import MushroomCircle from "../../components/PsyPoints/MushroomCircle"
import WalletCard from "../../components/common/WalletCard"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import ButtonLoading from "../../components/common/ButtonLoading"
import { BeatLoader } from "react-spinners"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { useRouter } from "next/router"
import { useGetUserPsypoints } from "../../queries/psypoints"
import { Text } from "../../components/common/Text"
import Counter from "../../components/common/Counter"
import { useCampaignContext } from "../../context/CampaignProvider"
import Grid from "../../components/common/Grid"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import useToast from "../../hooks/useToast"
import usePsypayPendingTransaction from "../../hooks/usePsypayPendingTransaction"
import { CartType } from "../../utils/psypay"
import useFinalizePsypayTransaction from "../../hooks/useFinalizePsypayTransaction"
import { useQueryClient } from "react-query"
import { PAGE } from "../../utils/pages"

enum Error {
  INTENT_FAILED = "Something went wrong while initiating purchase. Please try again.",
  DEBIT_FAILED = "Something went wrong on payment. Please contact admin.",
  FINALIZE_FAILED = "Something went wrong during transfer of bought packs. Please contact admin.",
  DEBIT_DONE_UNRECORDED_IN_PA = "Something went wrong on final step of payment. Please contact admin.",
  ACCESS_TOKEN_INVALID = "Your access token is no longer valid. Please connect your wallet again.",
}

const Containter = stitches.styled("div", {
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  backgroundColor: "$paMoonLight",
  borderRadius: "12px",
  fontFamily: "$inter",
  "@bp3": {
    gridColumn: "2",
    gridRow: "1 / span 1",
  },
})

const BalanceBox = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
})

const CartContents = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
})

const TotalContainer = stitches.styled("div", {
  display: "flex",
  gap: "$lg",
  flexDirection: "row-reverse",
  "@bp3": { flexDirection: "row" },
  borderRadius: "10px",
  px: "$7",
  py: "$4",
  background: "$paLupine",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "$sm $md",
})

const PsyPointsBox = stitches.styled("div", {
  padding: "$lg",
  justifyContent: "space-between",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
})

const CartBox = stitches.styled("div", {
  padding: "$lg",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#48714D",
  color: "$paMoonLight",
})

const TextInput = stitches.styled("input", {
  fontSize: "$rg",
  padding: "$sm",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid $paMoonLight",
  boxShadow: "none",
  backgroundColor: "$paMoonLight",
  "&:focus": {
    outline: "none",
    border: "1px solid $paLupine",
    boxShadow: "none",
  },
})

const createIdempotentKey = () =>
  `${uuidv4()}${uuidv4()}`.replaceAll("-", "").substring(0, 50)

const Cart = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { wallet, globalConnectSession } = useGlobalConnectContext()
  const { campaign, pack } = useCampaignContext()
  const psyPointsQuery = useGetUserPsypoints()
  const claimedPoints = psyPointsQuery.isSuccess
    ? psyPointsQuery.data.claimedPoints
    : 0

  const campaignId = Number(process.env.NEXT_PUBLIC_PSYPACK_CAMPAIGN_ID)
  const [address, setAddress] = useState("")
  const [packName, setPackName] = useState("")
  const [packMaxQ, setPackMaxQ] = useState(0)
  const [packAvailableQ, setPackAvailableQ] = useState(0)
  const [campaignCurrency, setCampaignCurrency] = useState("PSY")
  const [pendingTxnId, setPendingTxnId] = useState<number | null>(null)
  const [createPsypayPendingTrxIsLoading, setCreatePsypayPendingTrxIsLoading] =
    useState(false)

  const [cart, setCart] = useState<CartType>({
    common: 0,
    uncommon: 0,
    legendary: 0,
    psy: 0,
  })
  const [cartPrice, setCartPrice] = useState<number>(0)

  const [walletInput, setWalletInput] = useState<string>("")
  const [successBuy, setSuccessBuy] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWalletInput(value)
  }
  const handleInputPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text")
    setWalletInput(pastedText)
  }

  useEffect(() => {
    const calculatePricePerItem = () => {
      const pricePerItem: Record<string, number> = {}

      for (const [itemName, quantity] of Object.entries(cart)) {
        if (pack) {
          const price = pack?.price
          const priceForItem = quantity * price
          pricePerItem[itemName] = priceForItem
        }
      }
      const cartPrice = Object.values(pricePerItem).reduce(
        (acc, curr) => acc + curr,
        0
      )
      setCartPrice(cartPrice)
    }

    calculatePricePerItem()
  }, [cart, pack])

  useEffect(() => {
    if (campaign && pack) {
      setPackName(pack.name)
      setPackMaxQ(pack.maxQuantity)
      setPackAvailableQ(pack.available)
      setCampaignCurrency(campaign.currency)
    }
  }, [campaign, pack])

  const { handleCreatePendingTrx } = usePsypayPendingTransaction({
    onError: (error: any) => {
      showToast({
        description:
          error?.response?.data.message ||
          "Something went wrong creating psypay pending transaction. Please try again.",
      })
    },
  })

  const { handleFinalizePsypayTransaction } = useFinalizePsypayTransaction({
    onError: (error: any) => {
      showToast({
        description:
          error?.response?.data.message ||
          "Something went wrong finalizing psypay transaction. Please try again.",
      })
    },
  })

  useEffect(() => {
    if (wallet) {
      if (wallet.address) {
        setAddress(wallet.address)
      }
    }
  }, [wallet, setAddress])

  useEffect(() => {
    router.prefetch(PAGE.PSY_PACKS_SUCCESS)
  }, [router])

  useEffect(() => {
    if (successBuy) {
      showToast({ description: "Successfully bought Psy Packs." })
      queryClient.invalidateQueries([
        "psyPoints",
        wallet?.address.toLowerCase(),
      ])
      setPendingTxnId(null)

      const numOfPsyPacksBought = cart.psy
      const successPage = `${PAGE.PSY_PACKS_SUCCESS}?packs=${numOfPsyPacksBought}`

      router.push(successPage)
    }
  }, [router, successBuy, cart.psy, queryClient, showToast, wallet?.address])

  async function handleBuyBtnClick() {
    setCreatePsypayPendingTrxIsLoading(true)
    const forWalletAddress = walletInput
    const byWalletAddress = address
    if (!campaignId) {
      showToast({
        header: "Error",
        description: "Invalid campaign",
      })
    } else if (!pendingTxnId && byWalletAddress && forWalletAddress) {
      try {
        const { psypayTransactionId } = await handleCreatePendingTrx(
          globalConnectSession,
          {
            campaignId,
            packs: Object.entries(cart)
              .filter(([, value]) => value > 0)
              .map(([key, value]) => ({
                type: key,
                value,
              })),
            idempotentKey: createIdempotentKey(),
            forWalletAddress,
            byWalletAddress,
          }
        )
        if (!psypayTransactionId) {
          showToast({ description: Error.INTENT_FAILED })
        } else {
          setPendingTxnId(psypayTransactionId)

          try {
            const { data: buyRes } = await axios.post(
              "/.netlify/functions/buy-psypack",
              {
                walletAddress: address,
                price: cartPrice,
                item: JSON.stringify(cart),
                psypayTransactionId: psypayTransactionId,
              },
              {
                headers: {
                  authorization: `Bearer ${globalConnectSession}`,
                },
              }
            )
            if (!buyRes) {
              showToast({ description: Error.DEBIT_FAILED })
            } else {
              try {
                const captureRes = await handleFinalizePsypayTransaction(
                  {
                    campaignId,
                    psypayTransactionId,
                  },
                  buyRes
                )

                if (!captureRes) {
                  showToast({ description: Error.FINALIZE_FAILED })
                } else {
                  setSuccessBuy(true)
                }
              } catch (error) {
                showToast({ description: Error.FINALIZE_FAILED })
              }
            }
          } catch (error) {
            showToast({ description: Error.DEBIT_FAILED })
          }
        }
        setPendingTxnId(null)
      } catch (error: any) {
        console.log("Error in transaction.")
        showToast({
          description:
            error?.response?.data.message ||
            "Something went wrong. Please try again.",
        })
      }
    }
    setCreatePsypayPendingTrxIsLoading(false)
  }

  return (
    <Containter>
      <PsyPointsBox>
        <Box
          css={{
            display: "flex",
            justifyContent: "space-between",
            height: "fit-content",
            width: "100%",
          }}
        >
          <MushroomCircle variant="dark" />
          {wallet?.address && <WalletCard address={wallet?.address} />}
        </Box>
        <BalanceBox>
          <Box
            css={{
              textTransform: "uppercase",
              fontSize: "$rg",
              marginTop: "$xl",
            }}
          >
            BALANCE
          </Box>
          <Box
            css={{
              display: "flex",
              alignItems: "flex-end",
              margin: "$sm 0 0 0",
            }}
          >
            <Box css={{ fontFamily: "$sawton", fontSize: "$xl" }}>
              {psyPointsQuery.isLoading ? (
                <BeatLoader color={stitches.theme.colors.paLupine.value} />
              ) : (
                claimedPoints
              )}{" "}
            </Box>
            <Box
              css={{
                marginLeft: "$xs",
                position: "relative",
                top: "-8px",
                fontSize: "$md",
              }}
            >
              PSY
            </Box>
          </Box>
        </BalanceBox>
      </PsyPointsBox>

      <CartBox>
        <CartContents css={{ gap: "$rg" }}>
          <Box>
            <Text
              css={{
                textTransform: "uppercase",
                fontSize: "$rg",
                fontFamily: "$inter",
                color: "$paMoonLight",
                fontWeight: "bold",
              }}
            >
              NEW DAWN ACCOUNT
            </Text>
            <Text
              css={{
                fontSize: "$sm",
                fontFamily: "$inter",
                color: "$paMoonLight",
              }}
            >
              Your packs will be sent to this wallet. *
            </Text>
            <TextInput
              onChange={handleInputChange}
              onPaste={handleInputPaste}
              placeholder="0x00000..."
            />
          </Box>
          <Grid
            css={{
              width: "100%",
              gridTemplateColumns: "1fr auto",
              gap: "$4",
              borderRadius: "5px",
              p: "$7",
              alignItems: "center",
            }}
          >
            <React.Fragment key={packName}>
              <Text
                css={{
                  fontSize: "$rg",
                  textTransform: "capitalize",
                  color: "$paMoonLight",
                  margin: 0,
                  fontFamily: "$inter",
                }}
              >
                PSY PACKS
              </Text>
              <Counter
                value={cart[packName]}
                onChange={(value) => {
                  setCart((curr) => ({ ...curr, [packName]: value }))
                }}
                minValue={0}
                maxValue={Math.min(packMaxQ, packAvailableQ)}
              />
            </React.Fragment>
          </Grid>
          <TotalContainer>
            <Text
              css={{
                color: "$paMoonLight",
                fontSize: "$sm",
                fontWeight: "bold",
                margin: 0,
                fontFamily: "$inter",
              }}
            >
              TOTAL
            </Text>
            <Text
              css={{
                color: "$paMoonLight",
                fontSize: "$md",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "$inter",
                margin: 0,
              }}
            >
              {cartPrice} {campaignCurrency}
            </Text>
          </TotalContainer>

          <Button
            color="green"
            size="full"
            css={{ fontSize: "$sm", fontFamily: "$inter" }}
            disabled={
              cartPrice === 0 ||
              createPsypayPendingTrxIsLoading ||
              !walletInput ||
              claimedPoints < cartPrice ||
              packAvailableQ === 0
            }
            onClick={handleBuyBtnClick}
          >
            {createPsypayPendingTrxIsLoading ? (
              <ButtonLoading color={stitches.theme.colors.paMoonLight.value} />
            ) : (
              "BUY PACKS"
            )}
          </Button>
        </CartContents>
      </CartBox>
    </Containter>
  )
}

export default Cart
