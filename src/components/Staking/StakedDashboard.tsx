import { motion } from "framer-motion"
import React from "react"
import stitches from "../../stitches"
import StakedCard from "./StakedCard"
import { StakedToken, StakedTokenType } from "./types"

interface DashboardProps {
  tokens: StakedToken[]
  selectedTokens?: number[]
  addToken: (tokenId: number) => void
  tokenType: StakedTokenType
  goToDisconnect: () => void
}

const Container = stitches.styled(motion.div, {
  display: "grid",
  gridGap: "$lg",
  gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))",
  width: "100%",
  marginTop: "$lg",
})

const ErrorContainer = stitches.styled("div", {
  position: "relative",
  display: "flex",
  fontSize: "$rg",
  color: "$paIce",
  height: "10rem",
  width: "100%",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
})

const ClickableSpan = stitches.styled("span", {
  textDecoration: "underline",
  display: "inline-block",
  "&:hover": {
    cursor: "pointer",
  },
})

const StakedDashboard = ({
  tokens,
  selectedTokens = [],
  addToken,
  tokenType,
  goToDisconnect,
}: DashboardProps) => {
  if (tokens.length === 0) {
    return (
      <ErrorContainer>
        <div>You don&apos;t have a staked {tokenType} NFT.</div>
        <div>
          Click <ClickableSpan onClick={goToDisconnect}>here</ClickableSpan> to
          show unstaked NFT(s).
        </div>
      </ErrorContainer>
    )
  }
  return (
    <Container
      variants={{
        unload: {
          transition: {
            staggerChildren: 0.25,
            staggerDirection: -1,
          },
        },
        load: {
          transition: {
            staggerChildren: 0.25,
            delayChildren: 0.7,
          },
        },
      }}
      initial="unload"
      animate="load"
      exit="unload"
    >
      {tokens.map((token) => (
        <StakedCard
          tokenId={token.tokenId}
          tokenType={tokenType}
          previewImg={token.preview}
          key={token.tokenId}
          selected={selectedTokens.includes(token.tokenId)}
          addToken={() => addToken(token.tokenId)}
          daysStaked={token.daysStaked}
        />
      ))}
    </Container>
  )
}

export default StakedDashboard
