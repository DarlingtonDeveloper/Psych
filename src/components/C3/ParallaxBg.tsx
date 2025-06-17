import React, { useRef } from "react"
import useRefScrollProgress from "../../hooks/useRefScrollProgress"
import { useTransform, useViewportScroll, motion } from "framer-motion"
import stitches from "../../stitches"

const Parallax = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  position: "relative",
})

const LunarDiv = stitches.styled(motion.div, {
  position: "absolute",
  top: "-22rem",
  background: `url(${require("../../images/c3-claim-moon.png?url")}) no-repeat`,
  backgroundSize: "55rem 55rem",
  width: "100%",
  height: "55rem",
  margin: "0 auto",
  backgroundPosition: "center",
})

const TreesDiv = stitches.styled("div", {
  position: "absolute",
  bottom: 0,
  background: `url(${require("../../images/c3-claim-trees.png?url")}) no-repeat`,
  backgroundSize: "cover",
  width: "100%",
  height: "50rem",
  margin: "0 auto",
  backgroundPosition: "top",
})

const TextDiv = stitches.styled(motion.div, {
  position: "relative",
  background: `url(${require("../../images/c3-claim-text.png?url")}) no-repeat`,
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  minHeight: "50rem",
  margin: "0 auto",
  backgroundPosition: "top",
  backgroundClip: "border-box",
})

const ParallaxBg = () => {
  const parallaxContainer = useRef<HTMLDivElement>(null)
  const { start, end } = useRefScrollProgress(parallaxContainer)
  const { scrollYProgress } = useViewportScroll()
  const moonY = useTransform(scrollYProgress, [start, end], [0, 800])

  return (
    <Parallax ref={parallaxContainer}>
      <TextDiv />
      <LunarDiv style={{ translateY: moonY }} />
      <TreesDiv />
    </Parallax>
  )
}

export default ParallaxBg
