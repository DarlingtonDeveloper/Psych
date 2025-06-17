import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import stitches from "../../stitches"
import { fadeInAnimation } from "../../stitches/recipes"
import Box from "../common/Box"
import Button from "../common/ButtonV2"
import VerticalGrid from "../common/VerticalGrid"
import BurnMobileWalletCard from "./BurnMobileWalletCard"
import BurnWalletCard from "./BurnWalletCard"
import ENTRIES from "./entries.json"
import NFTEntryDialog from "./NFTEntryDialog"
import TicketDialog from "./TicketDialog"
import TokenTypeBox from "./TokenTypeBox"
import TokenTypeInput from "./TokenTypeInput"
import TokenTypeSelect from "./TokenTypeSelect"
import { TokenType } from "./types"
import { chooseWeek } from "./utils"

interface BurnFormProps {
  burn: (tokenType: TokenType, ids: number[]) => void
}

interface EgoFormData {
  tokenIds: string
}

const egoFormSchema = Joi.object({
  tokenIds: Joi.string()
    .regex(/^[0-9]+(,[0-9]+)*$/)
    .required()
    .messages({
      "string.empty": "Please complete this required answer.",
      "string.pattern.base":
        "Please enter only numbers (comma separated if multiple)",
    }),
})

const ContentContainer = stitches.styled("div", {
  display: "grid",
  gridGap: "$lg",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(2, max-content)",
  width: "100%",
  color: "$paLupine",
  minHeight: "calc(100vh - 16rem)",
  fontFamily: "$inter",
  "@bp3": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
  },
})

const LastBox = stitches.styled("div", {
  display: "none",
  "@bp3": {
    display: "flex",
    height: "fit-content",
    justifyContent: "flex-end",
  },
})

const BurnForm = ({ burn }: BurnFormProps) => {
  const [tokenType, setTokenType] = useState<TokenType>()
  const currentWeek = chooseWeek()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EgoFormData>({
    resolver: joiResolver(egoFormSchema),
  })

  const entry = ENTRIES.find(({ name }) => name === tokenType)
  const tokenIds = watch("tokenIds")
  const tokens = tokenIds
    ? Array.from(new Set(tokenIds.split(",").map((t) => +t)))
    : []

  const entryQuantity =
    !errors.tokenIds && entry && tokens ? entry.quantity * tokens.length : 0

  const onTokenTypeChange = (value: TokenType) => {
    setTokenType(value)
  }

  const startBurning = () => {
    if (tokenType) {
      burn(tokenType, tokens)
    }
  }

  return (
    <ContentContainer>
      <VerticalGrid css={{ "@bp2": { maxWidth: "85%" } }}>
        <Box css={{ display: "flex", gap: "$sm" }}>
          <NFTEntryDialog />
          {currentWeek && <TicketDialog weekNo={currentWeek?.weekNo} />}
        </Box>
        <Box css={{ margin: "$rg 0" }}>
          You may only burn 1 token type per burn.
        </Box>
        <VerticalGrid css={{ gridGap: "$sm" }}>
          <Box css={{ fontSize: "$sm" }}>Token Type</Box>
          <TokenTypeSelect
            onChange={onTokenTypeChange}
            placeholder="Select NFT Type to burn"
          />
        </VerticalGrid>
        <Box
          css={{
            height: "4rem",
            backgroundColor: "$paMoonLight",
            margin: "$rg 0",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {tokenType && <TokenTypeBox tokenType={tokenType} />}
        </Box>
        {tokenType && (
          <>
            <VerticalGrid css={{ gridGap: "$sm" }}>
              <Box css={{ fontSize: "$sm" }}>Token ID</Box>
              <TokenTypeInput
                placeholder="Type IDs (comma separated if multiple)"
                {...register("tokenIds")}
                error={!!errors.tokenIds?.message}
              />
              {errors.tokenIds && (
                <Box css={{ fontSize: "$sm", color: "$paFormRed" }}>
                  {errors.tokenIds.message}
                </Box>
              )}
            </VerticalGrid>
            <Box css={{ margin: "$rg 0" }}>
              You will receive&nbsp;
              <strong>{entryQuantity} entries for week 1</strong> if you proceed
              to the burning process.
            </Box>
            <Box css={{ display: "flex", justifyContent: "space-between" }}>
              <BurnMobileWalletCard />
              <Button
                color="lupine"
                onClick={handleSubmit(startBurning)}
                css={{ height: "fit-content" }}
              >
                Burn the ego
              </Button>
            </Box>
          </>
        )}
      </VerticalGrid>
      <Box
        css={{
          width: "100%",
          height: "25rem",
          gridRow: 1,
          "@bp3": { height: "100%", gridColumn: 2 },
          ...fadeInAnimation(0.5),
        }}
      >
        <Box
          as="img"
          src={require("../../images/burn/vendor-open.png?url")}
          css={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            "@bp3": {
              objectPosition: "center",
              objectFit: "cover",
            },
          }}
        />
      </Box>
      <LastBox>
        <BurnWalletCard />
      </LastBox>
    </ContentContainer>
  )
}

export default BurnForm
