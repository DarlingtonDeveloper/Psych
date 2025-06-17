import React, { FC } from "react"
import stitches from "../../../stitches"
import ComponentIcon from "../assets/ComponentIcon"
import PAPPIcon from "../assets/PAPPIcon"
import IRLIcon from "../assets/IRLIcon"
import MetaverseIcon from "../assets/MetaverseIcon"
import RightArrow from "../assets/RightArrow"

const Flex = stitches.styled("div", {
  display: "flex",
})

const Text = stitches.styled("span", {
  fontFamily: "$inter",
  fontSize: "16px",
  lineHeight: 2,
})

const Button = stitches.styled("a", {
  height: "86px",
  width: "234px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "12px 18px",
  borderRadius: "5px",
  color: "$paDark",
  userSelect: "none",
  textDecoration: "none",
  transition:
    "transform .65s cubic-bezier(.05,.2,.1,1),box-shadow .65s cubic-bezier(.05,.2,.1,1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
  },

  variants: {
    variant: {
      C1: {
        backgroundColor: "$paC1",
      },
      C2: {
        backgroundColor: "$paC2",
      },
      C3: {
        backgroundColor: "$paC3",
      },
      PAPP: {
        backgroundColor: "$paLightGrey",
      },
      IRL: {
        backgroundColor: "$paDustv2",
      },
      Metaverse: {
        backgroundColor: "$paBrown",
        color: "$paMoonLight",
      },
    },
  },
})

type ButtonType = "IRL" | "Metaverse" | "PAPP" | "C1" | "C2" | "C3"

const getLabel = (type: ButtonType) => {
  switch (type) {
    case "C1":
      return "Component 1"
    case "C2":
      return "Component 2"
    case "C3":
      return "Component 3"
    case "PAPP":
      return "Midnight Machine"
    case "IRL":
      return "IRL Pass"
    case "Metaverse":
      return "Metaverse Pass"
    default:
      return "Label"
  }
}

const getIcon = (type: ButtonType) => {
  switch (type) {
    case "PAPP":
      return PAPPIcon
    case "IRL":
      return IRLIcon
    case "Metaverse":
      return MetaverseIcon
    default:
      return ComponentIcon
  }
}

const getIconColor = (type: ButtonType) => {
  switch (type) {
    case "C1":
      return "$paC1"
    case "C2":
      return "$paC2"
    case "C3":
      return "$paC3"
    case "PAPP":
      return "$paLightGrey"
    case "Metaverse":
      return "$paMoonLight"
    default:
      return "$paDark"
  }
}

const getLink = (type: ButtonType) => {
  switch (type) {
    case "C1":
      return "https://opensea.io/collection/psychedelics-anonymous-component-1"
    case "C2":
      return "https://opensea.io/collection/psychedelics-anonymous-component-two"
    case "C3":
      return "https://opensea.io/collection/psychedelics-anonymous-component-three"
    case "PAPP":
      return "https://opensea.io/collection/psychedelics-anonymous-printing-press"
    case "Metaverse":
      return "https://opensea.io/collection/metaverse-psychedelics-anonymous-pass"
    case "IRL":
      return "https://opensea.io/collection/irl-psychedelics-anonymous-pass"
  }
}

const NftButton: FC<{
  type: ButtonType
}> = ({ type }) => {
  const Icon = getIcon(type)
  const color = getIconColor(type)
  const label = getLabel(type)
  const link = getLink(type)

  return (
    <Button variant={type} href={link} target="_blank">
      <Text
        css={{
          fontWeight: 500,
          fontSize: "13px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Flex css={{ justifyContent: "space-between", width: "100%" }}>
        <Icon css={{ color, height: "auto", width: "26px" }} />
        <Flex
          css={{
            alignItems: "center",
            columnGap: "8px",
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          BUY ON OPENSEA
          <RightArrow css={{ height: "18px", width: "auto" }} />
        </Flex>
      </Flex>
    </Button>
  )
}

export default NftButton
