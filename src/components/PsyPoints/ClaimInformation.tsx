import React from "react"
import stitches from "../../stitches"
import MushroomCircle from "./MushroomCircle"
import WalletCard from "../common/WalletCard"
import Box from "../common/Box"
import Button from "../common/ButtonV2"
import ButtonLoading from "../common/ButtonLoading"
import { BeatLoader } from "react-spinners"
import { useGlobalConnectContext } from "../../context/GlobalConnectProvider"
import { useRouter } from "next/router"
import { useGetUserPsypoints } from "../../queries/psypoints"
import { useClaimPsypoints } from "../../mutations/psypoints"

const Containter = stitches.styled("div", {
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  backgroundColor: "$paMoonLight",
  padding: "$lg",
  borderRadius: "12px",
  gap: "$lg",
  fontFamily: "$inter",
  color: "$paLupine",
  justifyContent: "space-between",
})

const ClaimDetail = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid $paLupine",
})

const ButtonContainer = stitches.styled("div", {
  display: "flex",
  gap: "$lg",
  flexDirection: "column-reverse",
  "@bp3": { flexDirection: "row" },
})

const ClaimInformation = () => {
  const router = useRouter()
  const { wallet, globalConnectControls } = useGlobalConnectContext()

  const psyPointsQuery = useGetUserPsypoints()

  const psyPointsClaim = useClaimPsypoints()

  const claimedPoints = psyPointsQuery.isSuccess
    ? psyPointsQuery.data.claimedPoints
    : 0
  const unclaimedPoints = psyPointsQuery.isSuccess
    ? psyPointsQuery.data.unclaimedPoints
    : 0

  return (
    <Containter>
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
      <ClaimDetail>
        <Box css={{ textTransform: "uppercase" }}>Balance</Box>
        <Box css={{ display: "flex", alignItems: "flex-end", margin: "$rg 0" }}>
          <Box css={{ fontFamily: "$sawton", fontSize: "$xl" }}>
            {psyPointsQuery.isLoading ? (
              <BeatLoader color={stitches.theme.colors.paLupine.value} />
            ) : (
              claimedPoints
            )}{" "}
          </Box>
          <Box css={{ marginLeft: "$xs", position: "relative", top: "-8px" }}>
            PSY
          </Box>
        </Box>
      </ClaimDetail>
      <ClaimDetail>
        <Box css={{ textTransform: "uppercase" }}>Unclaimed</Box>
        <Box
          css={{
            display: "flex",
            alignItems: "flex-end",
            margin: "$rg 0",
            color: "$paGreenV2",
          }}
        >
          <Box css={{ fontFamily: "$sawton", fontSize: "$xl" }}>
            {psyPointsQuery.isLoading ? (
              <BeatLoader color={stitches.theme.colors.paGreenV2.value} />
            ) : (
              unclaimedPoints
            )}
          </Box>
          <Box css={{ marginLeft: "$xs", position: "relative", top: "-8px" }}>
            PSY
          </Box>
        </Box>
      </ClaimDetail>
      <ButtonContainer>
        <Button
          color="lupine"
          size="full"
          onClick={() => {
            globalConnectControls.disconnect()
            router.push("/psy-points")
          }}
        >
          Disconnect
        </Button>
        <Button
          color="green"
          size="full"
          disabled={unclaimedPoints === 0 || psyPointsClaim.isLoading}
          onClick={() => {
            psyPointsClaim.mutate()
          }}
        >
          {psyPointsClaim.isLoading ? (
            <ButtonLoading color={stitches.theme.colors.paMoonLight.value} />
          ) : (
            "Claim Psy"
          )}
        </Button>
      </ButtonContainer>
    </Containter>
  )
}

export default ClaimInformation
