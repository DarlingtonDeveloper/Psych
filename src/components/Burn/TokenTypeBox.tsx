import React from "react"
import stitches from "../../stitches"
import { fadeIn } from "../../stitches/keyframes"
import ComponentIcon from "./ComponentIcon"
import IRLIcon from "./IRLIcon"
import MetaverseIcon from "./MetaverseIcon"
import PAPPIcon from "./PAPPIcon"
import PsilocybinIcon from "./PsilocybinIcon"
import type { TokenType } from "./types"

interface TokenTypeBoxProps {
  tokenType: TokenType
}

interface TokenTypeMeta {
  color: string
  icon: React.ReactNode
}

const Container = stitches.styled("div", {
  display: "flex",
  backgroundColor: "$paLupine",
  width: "100%",
  height: "100%",
  animation: `${fadeIn} ease-in 0.5s`,
})

const IconBoxContainer = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "4rem",
  height: "100%",
  backgroundColor: "$paDust",
})

const TokenTypeText = stitches.styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  fontFamily: "$sawton",
  fontWeight: "bold",
  color: "$paMoonLight",
  textTransform: "uppercase",
  paddingLeft: "$lg",
})

const IconCircle = stitches.styled("div", {
  padding: "5px",
  borderRadius: "50%",
  backgroundColor: "$paLupine",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const TOKEN_TYPE_META: Record<TokenType, TokenTypeMeta> = {
  "IRL Pass": {
    color: "#BFBBA4",
    icon: <IRLIcon />,
  },
  "Metaverse Pass": {
    color: "#A48F79",
    icon: <MetaverseIcon />,
  },
  PAPP: {
    color: "#ACB6AE",
    icon: (
      <IconCircle>
        <PAPPIcon />
      </IconCircle>
    ),
  },
  Psilocybin: {
    color: "#0070F4",
    icon: <PsilocybinIcon />,
  },
  C1: {
    color: "#F0CDA3",
    icon: (
      <IconCircle css={{ backgroundColor: "$paMoonLight" }}>
        <ComponentIcon color="#F0CDA3" />
      </IconCircle>
    ),
  },
  C2: {
    color: "#FFA4D5",
    icon: (
      <IconCircle css={{ backgroundColor: "$paMoonLight" }}>
        <ComponentIcon color="#FFA4D5" />
      </IconCircle>
    ),
  },
  C3: {
    color: "#87D6CD",
    icon: (
      <IconCircle css={{ backgroundColor: "$paMoonLight" }}>
        <ComponentIcon color="#87D6CD" />
      </IconCircle>
    ),
  },
}

const TokenTypeBox = ({ tokenType }: TokenTypeBoxProps) => (
  <Container key={tokenType}>
    <IconBoxContainer
      css={{ backgroundColor: TOKEN_TYPE_META[tokenType].color }}
    >
      {TOKEN_TYPE_META[tokenType].icon}
    </IconBoxContainer>
    <TokenTypeText>{tokenType}</TokenTypeText>
  </Container>
)

export default TokenTypeBox
