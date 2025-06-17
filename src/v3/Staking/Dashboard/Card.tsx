import React from "react"
import stitches from "../../../stitches"
import { Mushroom } from "./Icons/Mushroom"

const Card = stitches.styled("div", {
  width: 250,
  height: 400,
  backgroundColor: "$paLupine",
  overflow: "hidden",
  borderRadius: 5,
  position: "relative",
  display: "grid",
  gridTemplateRows: "250px 1fr",
  transition: "box-shadow ease-out 0.2s",
  variants: {
    selected: {
      true: {
        boxShadow: "0 0 4px 2px rgba(214, 73, 73, 0.9)",
      },
      false: {
        boxShadow: "initial",
      },
    },
  },
  defaultVariants: {
    selected: "false",
  },
})

const CardImg = stitches.styled("img", {
  height: 250,
  width: 250,
})

const CardTitle = stitches.styled("p", {
  fontFamily: "$sawton",
  fontSize: 40,
  color: "$paMoonLight",
  textAlign: "center",
  margin: 0,
})

const CardSubheading = stitches.styled("p", {
  fontFamily: "$inter",
  fontSize: 12,
  lineHeight: "26px",
  color: "$paMoonLight",
  textAlign: "center",
  margin: 0,
})

const TextWrapper = stitches.styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  flexDirection: "column",
  padding: "16px",
})

const Icon = stitches.styled("i", {
  height: 32,
  width: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$paDustv2",
  borderRadius: "100%",
})

const MushroomIcon = stitches.styled(Icon, {
  position: "absolute",
  top: 16,
  left: 16,
})

interface Props {
  id: number
  img: string
  title: string
  subheading: string
}

export const NFTCard = React.forwardRef<HTMLDivElement, Props>(
  ({ id, title, subheading, img }, ref) => {
    return (
      <Card ref={ref} key={id}>
        <MushroomIcon>
          <Mushroom />
        </MushroomIcon>
        <CardImg src={img} />
        <TextWrapper>
          <CardTitle>{title}</CardTitle>
          <CardSubheading>{subheading}</CardSubheading>
        </TextWrapper>
      </Card>
    )
  }
)
NFTCard.displayName = "NFTCard"
