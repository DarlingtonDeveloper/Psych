import React from "react"
import Fold from "../components/common/Fold"
import MetaHead from "../components/common/MetaHead"
import stitches from "../stitches"
import Link from "next/link"
import GenesisHeader from "../components/common/GenesisHeader"
import MaxContainer from "../components/common/MaxContainer"

const Container = stitches.styled(Fold, {
  alignItems: "flex-start",
  background: `url(${require("../images/404.png?url")})`,
  backgroundAttachment: "fixed",
  backgroundBlendMode: "soft-light",
  backgroundColor: "$paDark",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "$paIce",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "8rem $lg",
  width: "100%",
  "> *": {
    "+ *": {
      marginTop: "$rg",
    },
  },
})

const Header = stitches.styled("h1", {
  fontWeight: 800,
  fontSize: "4rem",
  textTransform: "uppercase",
  lineHeight: 0.8,
})

const Button = stitches.styled("button", {
  fontFamily: "$proxima",
  color: "$paIce",
  fontSize: "$sm",
  padding: "$sm $lg",
  border: 0,
  outline: "none",
  textDecoration: "none",
  boxShadow: "none",
  textTransform: "uppercase",
  backgroundColor: "$paBlue",
  "&:hover": {
    cursor: "pointer",
  },
})

const NotFoundPage = () => (
  <Container>
    <MetaHead
      title="Psychedelics Anonymous | This is not the way."
      description="We are the night."
      link="/404"
    />
    <MaxContainer>
      <GenesisHeader css={{ fontSize: "$rg" }}>404</GenesisHeader>
      <Header>This is not the way.</Header>
      <Link href="/collections" passHref>
        <Button>Find the way</Button>
      </Link>
    </MaxContainer>
  </Container>
)

export default NotFoundPage
