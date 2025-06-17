import React from "react"
import VideoBackground from "../components/Homepage/VideoBackground"
import Fold from "../components/common/Fold"
import stitches from "../stitches"
import MetaHead from "../components/common/MetaHead"
import { fadeIn } from "../stitches/keyframes"

const Container = stitches.styled(Fold, {
  width: "100vw",
  height: "100vh",
  maxWidth: "100vw",
  maxHeight: "100vh",
})

const Hero = stitches.styled("div", {
  width: "20rem",
  padding: "$rg",
  animation: `${fadeIn} ease-in 1s`,
  opacity: 0,
  animationDelay: "1s",
  animationFillMode: "forwards",
})

const Home = () => {
  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous"
        description="At the zero hour, we gather in the darkness seeking refuge from the counterfeit dreams of our clockwork lives. We are the night."
        link="/"
      />
      <VideoBackground />
      <Hero>
        <img
          src={require("../images/hero-logo.svg?url")}
          alt="psychedelic hero logo"
          width="100%"
        />
      </Hero>
    </Container>
  )
}

export default Home
