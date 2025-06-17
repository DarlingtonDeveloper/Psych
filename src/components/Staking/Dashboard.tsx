import { motion } from "framer-motion"
import React from "react"
import stitches from "../../stitches"
import Card from "./Card"
import { StakedTokenType, UnstakedToken } from "./types"

interface DashboardProps {
  tokens: UnstakedToken[]
  selectedTokens?: number[]
  addToken: (tokenId: number) => void
  tokenType: StakedTokenType
  gotoConnect: () => void
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
  display: "inline-block",
  textDecoration: "underline",
  "&:hover": {
    cursor: "pointer",
  },
})

const Dashboard = ({
  tokens,
  selectedTokens = [],
  addToken,
  tokenType,
  gotoConnect,
}: DashboardProps) => {
  if (tokens.length === 0) {
    return (
      <ErrorContainer>
        <div>You don&apos;t own an unstaked {tokenType} NFT.</div>
        <div>
          Click <ClickableSpan onClick={gotoConnect}>here</ClickableSpan> to
          show staked NFT(s).
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
        <Card
          previewImg={token.preview}
          key={token.tokenId}
          progress={100}
          selected={selectedTokens.includes(token.tokenId)}
          addToken={() => addToken(token.tokenId)}
        />
      ))}
    </Container>
  )
}

export default Dashboard
