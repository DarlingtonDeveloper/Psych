import React, { FC } from "react"
import stitches from "../../../stitches"
import { StakedTokenType } from "../../../components/Staking/types"

interface Props {
  tokenType?: StakedTokenType
}

const Text = stitches.styled("p", {
  fontFamily: "$inter",
  textAlign: "center",
})

const Wrapper = stitches.styled("div", {
  gridColumn: "1 / 5",
  padding: "$xxl 0",
})

export const NoTokens: FC<Props> = ({ tokenType }) => {
  const noNFTsText = tokenType
    ? `You don't have any ${tokenType} NFTs.`
    : "You don't have any NFTs."
  return (
    <Wrapper>
      <Text>{noNFTsText}</Text>
    </Wrapper>
  )
}
