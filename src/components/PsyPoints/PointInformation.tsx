import React from "react"
import Box from "../common/Box"
import PointDetail from "./PointDetail"
import GenesisIcon from "./GenesisIcon"
import PsilocybinIcon from "./PsilocybinIcon"
import MyceliaIcon from "./MyceliaIcon"
import MotusIcon from "./MotusIcon"
import Button from "../common/ButtonV2"
import stitches from "../../stitches"
import MushroomCircle from "./MushroomCircle"

const Container = stitches.styled("div", {
  display: "flex",
  flexGrow: "2",
  backgroundColor: "$paLupine",
  flexDirection: "column",
  padding: "$lg",
  gap: "$lg",
  maxWidth: "50rem",
  borderRadius: "12px",
  "@bp3": {
    flexDirection: "row",
  },
})

const Column = stitches.styled("div", {
  display: "flex",
  flex: "1 1 50%",
  flexDirection: "column",
  gap: "$lg",
  justifyContent: "space-between",
})

const Divider = stitches.styled("div", {
  margin: "$rg 0",
  width: "100%",
  height: "2px",
  backgroundColor: "$paMoonLight",
  "@bp3": {
    width: "2px",
    height: "100%",
    margin: "0 $rg",
  },
})

const PointInformation = () => (
  <Container>
    <Column>
      <Box css={{ display: "flex", alignItems: "center" }}>
        <MushroomCircle variant="light" />
        <Box
          css={{
            fontFamily: "$sawton",
            fontSize: "$lg",
            marginLeft: "$md",
            textTransform: "uppercase",
          }}
        >
          Psy Points
        </Box>
      </Box>
      <Box css={{ lineHeight: 1.75, fontFamily: "$inter" }}>
        <Box css={{ fontWeight: "bold" }}>Usages:</Box>
        <Box css={{ textTransform: "uppercase" }}>Raffles</Box>
        <Box css={{ textTransform: "uppercase" }}>Retreats</Box>
        
        <Box css={{ textTransform: "uppercase" }}>New Dawn</Box>
        
        <Box css={{ textTransform: "uppercase" }}>Irl Merchandise</Box>
      </Box>
      <Box css={{ lineHeight: 1.75, fontFamily: "$inter" }}>
        PSY Points can be used to purchase New Dawn credits, 
        PSY trait packs, discounts on IRL merch purchases, 
        discounts for psychedelic retreats, and towards raffles for rewards.
      </Box>
      <Button
        onClick={() => {
          window.open("https://newdawn.xyz", "_blank")
        }}
      >
        New Dawn
      </Button>
    </Column>
    <Divider />
    <Column>
      <PointDetail
        icon={<GenesisIcon />}
        title="Genesis"
        description="Genesis earn PSY Points."
      />
      <PointDetail
        icon={<PsilocybinIcon />}
        title="Psilocybin"
        description="Psilocybin earn PSY Points based on rarity."
      />
      <PointDetail
        icon={<MyceliaIcon />}
        title="Qualified"
        description="Genesis, Psilocybin and Component 1 earn PSY Points."
      />
      <PointDetail
        icon={<MotusIcon />}
        title="PsyQuest Pass"
        description="Earn PSY points through [ r e d a c t e d ] efforts."
      />
    </Column>
  </Container>
)

export default PointInformation
