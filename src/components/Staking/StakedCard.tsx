import { motion } from "framer-motion"
import React, { useState } from "react"
import stitches from "../../stitches"
import RefreshIcon from "./RefreshIcon"
import TickCircleIcon from "./TickCircleIcon"
import { StakedTokenType } from "./types"
import ReactCardFlip from "react-card-flip"
// @ts-ignore
import Moon from "react-moon"
import XCircleIcon from "./XCircleIcon"
import ShareIcon from "./ShareIcon"

interface CardProps {
  previewImg: string
  selected: boolean
  addToken: () => void
  tokenType: StakedTokenType
  tokenId: number
  daysStaked: number
}

const Container = stitches.styled(motion.div, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: "0",
  borderRadius: "5px",
  overflow: "hidden",
  userSelect: "none",
})

const ProgressContainer = stitches.styled("div", {
  height: "10px",
  backgroundColor: "$paGrey",
})

const Progress = stitches.styled(motion.div, {
  backgroundColor: "$paGrey",
  height: "inherit",
})

const ConnectContainer = stitches.styled("div", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$paLightGrey",
  height: "9rem",
  color: "$paDark",
  padding: "$sm",
})

const FlexBox = stitches.styled("div", {
  display: "flex",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
})

const Circle = stitches.styled("div", {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  top: "10px",
  right: "10px",
  backgroundColor: "$paIce",
  height: "2rem",
  width: "2rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const SwitchCircle = stitches.styled("div", {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  bottom: "15px",
  right: "10px",
  backgroundColor: "$paIce",
  height: "2rem",
  width: "2rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const ImageContainer = stitches.styled("div", {
  position: "relative",
  height: "fit-content",
  lineHeight: 0,
  ">img": {
    display: "block",
    width: "100%",
    height: "auto",
  },
})

const TokenName = stitches.styled("div", {
  width: "100%",
  textTransform: "uppercase",
  fontSize: "$rg",
  fontWeight: 900,
  textAlign: "center",
})

const LevelText = stitches.styled("div", {
  width: "100%",
  textTransform: "uppercase",
  fontSize: "3.5rem",
  fontWeight: 900,
  textAlign: "center",
})

const DaysText = stitches.styled("div", {
  width: "100%",
  fontSize: "$sm",
  textAlign: "center",
  ">span": {
    fontWeight: 900,
  },
})

const CycleContainer = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "$sm",
})

const FlippedLevelContainer = stitches.styled("div", {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: "$md",
  backgroundColor: "$paDark",
})

const MoonContainer = stitches.styled("div", {
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
})

const CycleText = stitches.styled("div", {
  fontSize: "$sm",
  fontWeight: 600,
  color: "$paLightGrey",
  ">span": {
    color: "$paDark",
    fontWeight: 800,
  },
  marginLeft: "$sm",
})

const DisconnectContainer = stitches.styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ">span": {
    textTransform: "uppercase",
    marginLeft: "$rg",
    fontWeight: 800,
    fontSize: "$sm",
  },
  height: "1.5rem",
  "&:hover": {
    cursor: "pointer",
  },
})

const levelFills = [
  "#D0F1FF",
  "#C0F9BD",
  "#E0DBFF",
  "#FFDADA",
  "#F0E4BB",
  "#F0FFD0",
  "#D1C4BB",
  "#B8CFB4",
  "#ABC7C7",
  "#A2FFF4",
]

const levelLogic = [0, 10, 32, 55, 85, 145, 205, 275]

const getProgress = (daysStaked: number) => {
  const nextLevelIndex = levelLogic.findIndex((dc) => daysStaked < dc)
  if (nextLevelIndex === -1) {
    return 100
  }

  return Math.floor(
    ((daysStaked - levelLogic[nextLevelIndex - 1]) /
      (levelLogic[nextLevelIndex] - levelLogic[nextLevelIndex - 1])) *
      100
  )
}

const getLevel = (daysStaked: number) => {
  return levelLogic.filter((dc) => daysStaked >= dc).length
}

const getDaysForNextLevel = (daysStaked: number) => {
  const nextLevelIndex = levelLogic.findIndex((dc) => daysStaked < dc)
  if (nextLevelIndex === -1) {
    return 0
  }

  return levelLogic[nextLevelIndex] - daysStaked
}

const StakedCard = ({
  previewImg,
  selected = false,
  addToken,
  tokenType,
  tokenId,
  daysStaked,
}: CardProps) => {
  const [flipped, setFlipped] = useState(false)
  const level = getLevel(Math.min(daysStaked, 152))
  const progress = getProgress(Math.min(daysStaked, 152))
  const daysForNextLevel = getDaysForNextLevel(Math.min(daysStaked, 152))

  return (
    <motion.div
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
      <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <Container>
          <ProgressContainer>
            <Progress
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{ duration: 1, delay: 1.5 }}
              css={{
                backgroundColor: levelFills[level - 1],
              }}
            />
          </ProgressContainer>
          <ImageContainer>
            <img src={previewImg} alt="Preview Image" />
            <Circle
              css={{ backgroundColor: levelFills[level - 1] }}
              onClick={addToken}
            >
              {selected ? (
                <TickCircleIcon fill={stitches.theme.colors.paBlue.value} />
              ) : (
                <ShareIcon fill={stitches.theme.colors.paDark.value} />
              )}
            </Circle>
            <SwitchCircle
              css={{ backgroundColor: levelFills[level - 1] }}
              onClick={() => setFlipped((f) => !f)}
            >
              <RefreshIcon />
            </SwitchCircle>
          </ImageContainer>
          <ConnectContainer css={{ backgroundColor: levelFills[level - 1] }}>
            <FlexBox>
              <TokenName>
                {tokenType.toUpperCase()} #{tokenId}
              </TokenName>
              <LevelText>{level}</LevelText>
              <DaysText>
                Connected for <span>{daysStaked} Days</span>
              </DaysText>
            </FlexBox>
          </ConnectContainer>
        </Container>
        <Container>
          <ProgressContainer>
            <Progress
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{ duration: 1, delay: 1.5 }}
              css={{
                backgroundColor: levelFills[level - 1],
              }}
            />
          </ProgressContainer>
          <ImageContainer>
            <img src={previewImg} alt="Preview Image" />
            <Circle
              css={{ backgroundColor: levelFills[level - 1] }}
              onClick={addToken}
            >
              {selected ? (
                <TickCircleIcon fill={stitches.theme.colors.paBlue.value} />
              ) : (
                <ShareIcon fill={stitches.theme.colors.paDark.value} />
              )}
            </Circle>
            <SwitchCircle
              css={{ backgroundColor: levelFills[level - 1] }}
              onClick={() => setFlipped((f) => !f)}
            >
              <RefreshIcon />
            </SwitchCircle>
          </ImageContainer>
          <ConnectContainer
            css={{
              backgroundColor: "$paIce",
              padding: 0,
              height: "7.5rem",
            }}
          >
            <CycleContainer>
              <TokenName css={{ textAlign: "left" }}>
                {tokenType.toUpperCase()} #{tokenId}
              </TokenName>
              <DaysText css={{ textAlign: "left" }}>
                Connected for <span>{daysStaked} Days</span>
              </DaysText>
              <MoonContainer>
                {daysForNextLevel !== 0 && (
                  <>
                    <Moon
                      phase={progress / 200}
                      size={40}
                      darkColor={stitches.theme.colors.paLightGrey.value}
                      border="none"
                    />
                    <CycleText>
                      Next cycle is <br />
                      <span>{daysForNextLevel} days</span>
                    </CycleText>
                  </>
                )}
              </MoonContainer>
            </CycleContainer>
            <FlippedLevelContainer>
              <LevelText css={{ color: levelFills[level - 1] }}>
                {level}
              </LevelText>
            </FlippedLevelContainer>
          </ConnectContainer>
          <DisconnectContainer
            css={{ backgroundColor: levelFills[level - 1] }}
            onClick={addToken}
          >
            <XCircleIcon fill={stitches.theme.colors.paMid.value} />
            <span>Disconnect</span>
          </DisconnectContainer>
        </Container>
      </ReactCardFlip>
    </motion.div>
  )
}

export default StakedCard
