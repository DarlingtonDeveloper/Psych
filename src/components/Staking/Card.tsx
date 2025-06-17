import { motion } from "framer-motion"
import React from "react"
import stitches from "../../stitches"
import CommitIcon from "./CommitIcon"
import ShareIcon from "./ShareIcon"
import TickCircleIcon from "./TickCircleIcon"

interface CardProps {
  previewImg: string
  progress: number
  selected: boolean
  addToken: () => void
}

const Container = stitches.styled(motion.div, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: "0",
  borderRadius: "5px",
  overflow: "hidden",
  userSelect: "none",
  "&:hover": {
    cursor: "pointer",
  },
})

const ProgressContainer = stitches.styled("div", {
  height: "10px",
})

const Progress = stitches.styled("div", {
  backgroundColor: "$paGrey",
  height: "inherit",
})

const ConnectContainer = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$paLightGrey",
  height: "9rem",
  fontSize: "$sm",
  fontColor: "$paDark",
  textTransform: "uppercase",
  fontWeight: 600,
})

const FlexBox = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: "$rg",
  fontWeight: 800,
})

const Circle = stitches.styled("div", {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  top: "calc(10px + $xs)",
  right: "$xs",
  backgroundColor: "$paIce",
  height: "2rem",
  width: "2rem",
})

const CardImage = stitches.styled("img", {
  display: "block",
  width: "100%",
  height: "auto",
})

const Card = ({
  previewImg,
  progress = 100,
  selected = false,
  addToken,
}: CardProps) => (
  <Container
    onClick={addToken}
    variants={{
      unload: {
        y: 100,
        opacity: 0,
      },
      load: {
        y: 0,
        opacity: 1,
      },
    }}
    transition={{
      ease: "easeIn",
      duration: 1,
    }}
  >
    <ProgressContainer>
      <Progress css={{ width: `${progress}%` }} />
    </ProgressContainer>
    <CardImage src={previewImg} alt="Preview Image" />
    <ConnectContainer>
      <FlexBox>
        <ShareIcon />
        &nbsp;&nbsp;Connect
      </FlexBox>
    </ConnectContainer>
    <Circle>
      {selected ? (
        <TickCircleIcon fill={stitches.theme.colors.paBlue.value} />
      ) : (
        <CommitIcon fill={stitches.theme.colors.paDark.value} />
      )}
    </Circle>
  </Container>
)

export default Card
