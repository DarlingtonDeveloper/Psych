import React from "react"
import Fold from "../../components/common/Fold"
import MetaHead from "../../components/common/MetaHead"
import stitches from "../../stitches"
import MaxContainer from "../../components/common/MaxContainer"
import VerticalGrid from "../../components/common/VerticalGrid"
import Box from "../../components/common/Box"
import Button from "../../components/common/ButtonV2"
import { fadeInAnimation } from "../../stitches/recipes"

const Container = stitches.styled(Fold, {
  width: "100%",
  minHeight: "100vh",
  padding: "8rem $lg",
  justifyContent: "flex-start",
  backgroundColor: "$paMid",
  fontFamily: "$inter",
  ">p": {
    margin: 0,
  },
})

const ContentContainer = stitches.styled("div", {
  display: "grid",
  gridGap: "$lg",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(3, max-content)",
  width: "100%",
  color: "$paIce",
  minHeight: "calc(100vh - 16rem)",
  "@bp3": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
  },
})

const EgoHeader = stitches.styled("h1", {
  fontFamily: "$sawton",
  fontWeight: 700,
  textTransform: "uppercase",
  fontSize: "7rem",
  lineHeight: 0.85,
  textAlign: "center",
  "@bp3": {
    textAlign: "left",
  },
})

const EgoDescription = stitches.styled(VerticalGrid, {
  width: "100%",
  lineHeight: 1.75,
  textAlign: "center",
  "@bp3": {
    textAlign: "left",
  },
})

const BurnPage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous - Burn The Ego"
      description="We ascend through the fibreglass roughness of our imposed reality
        &ndash; the night's gift &ndash; knowing we must burn the ego,
        the final gatekeeper dividing us through the perpetual circles of
        black spiral infinities."
      link="/burn"
    />
    <MaxContainer>
      <ContentContainer>
        <VerticalGrid css={{ ...fadeInAnimation(1) }}>
          <EgoHeader>Burn the ego</EgoHeader>
          <Box
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              "@bp3": {
                justifyContent: "flex-start",
              },
            }}
          >
            <Button disabled={true}>PAUSED</Button>
          </Box>
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
            src={require("../../images/burn/vendor.png?url")}
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
        <EgoDescription css={{ ...fadeInAnimation(1.5) }}>
          <Box css={{ fontWeight: "bold" }}>
            The more you burn, the more you enter.
          </Box>
          <Box>
            If you burn a component, pass, printing press or psilocybin through
            Burn The Ego, you will have entered the raffle.
          </Box>
          <Box>
            Each NFT will be weighted based on the current floor price to
            provide additional entries for higher priced items. Connect your
            wallet to view the weighting for the current week.
          </Box>
          <Box>
            There is no limit to how many times you can enter each week.
          </Box>
          <Box>
            All you need to enter is a Psychedelics Anonymous Genesis and
            something to burn.
          </Box>
          <Box css={{ fontSize: "$sm", marginTop: "$rg" }}>
            NOTE : Burning a component, pass, printing press or psilocybin
            through Burn The Ego only provides entries for the current
            week&rsquo;s raffle not future raffles. You must burn through this
            portal to be eligible for the draw.
          </Box>
        </EgoDescription>
      </ContentContainer>
    </MaxContainer>
  </Container>
)

export function getStaticProps() {
  return {
    props: {
      version: 2,
    },
  }
}

export default BurnPage
