import React from "react"
import stitches from "../../stitches"

const glitchEffect1 = stitches.keyframes({
  "0%": {
    clipPath: "polygon(0 2%, 100% 2%, 100% 5%, 0 5%)",
  },
  "10%": {
    clipPath: "polygon(0 15%, 100% 15%, 100% 15%, 0 15%)",
  },
  "20%": {
    clipPath: "polygon(0 10%, 100% 10%, 100% 20%, 0 20%)",
  },
  "30%": {
    clipPath: "polygon(0 1%, 100% 1%, 100% 2%, 0 2%)",
  },
  "40%": {
    clipPath: "polygon(0 33%, 100% 33%, 100% 33%, 0 33%)",
  },
  "50%": {
    clipPath: "polygon(0 44%, 100% 44%, 100% 44%, 0 44%)",
  },
  "60%": {
    clipPath: "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
  },
  "70%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
  },
  "80%": {
    clipPath: "polygon(0 80%, 100% 80%, 100% 80%, 0 80%)",
  },
  "90%": {
    clipPath: "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
  },
  "100%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)",
  },
})

const glitchEffect2 = stitches.keyframes({
  "0%": {
    clipPath: "polygon(0 15%, 100% 15%, 100% 15%, 0 15%)",
  },
  "10%": {
    clipPath: "polygon(0 10%, 100% 10%, 100% 20%, 0 20%)",
  },
  "20%": {
    clipPath: "polygon(0 33%, 100% 33%, 100% 33%, 0 33%)",
  },
  "30%": {
    clipPath: "polygon(0 1%, 100% 1%, 100% 2%, 0 2%)",
  },
  "40%": {
    clipPath: "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
  },
  "50%": {
    clipPath: "polygon(0 2%, 100% 2%, 100% 5%, 0 5%)",
  },
  "60%": {
    clipPath: "polygon(0 50%, 100% 50%, 100% 20%, 0 20%)",
  },
  "70%": {
    clipPath: "polygon(0 15%, 100% 15%, 100% 15%, 0 15%)",
  },
  "80%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
  },
  "90%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)",
  },
  "100%": {
    clipPath: "polygon(0 80%, 100% 80%, 100% 80%, 0 80%)",
  },
})

const glitchEffect3 = stitches.keyframes({
  "0%": {
    clipPath: "polygon(0 80%, 100% 80%, 100% 80%, 0 80%)",
  },
  "10%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)",
  },
  "20%": {
    clipPath: "polygon(0 70%, 100% 70%, 100% 70%, 0 70%)",
  },
  "30%": {
    clipPath: "polygon(0 15%, 100% 15%, 100% 15%, 0 15%)",
  },
  "40%": {
    clipPath: "polygon(0 10%, 100% 10%, 100% 20%, 0 20%)",
  },
  "50%": {
    clipPath: "polygon(0 2%, 100% 2%, 100% 5%, 0 5%)",
  },
  "60%": {
    clipPath: "polygon(0 50%, 100% 50%, 100% 55%, 0 55%)",
  },
  "70%": {
    clipPath: "polygon(0 1%, 100% 1%, 100% 2%, 0 2%)",
  },
  "80%": {
    clipPath: "polygon(0 33%, 100% 33%, 100% 33%, 0 33%)",
  },
  "90%": {
    clipPath: "polygon(0 10%, 100% 10%, 100% 20%, 0 20%)",
  },
  "100%": {
    clipPath: "polygon(0 15%, 100% 15%, 100% 15%, 0 15%)",
  },
})

const glitchFlash = stitches.keyframes({
  "0%, 5%": {
    opacity: 0.2,
  },
  "5.5%, 100%": {
    opacity: 0,
  },
})

const Container = stitches.styled("div", {
  position: "relative",
  height: "100%",
  width: "100%",
})

const BlinkRed = stitches.styled("div", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  backgroundColor: "#fb0102",
  animation: `0.5s linear 0s infinite running ${glitchFlash}`,
})

const BlinkGreen = stitches.styled("div", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  backgroundColor: "#01ff00",
  animation: `0.2s linear 0s infinite running ${glitchFlash}`,
})

const BlinkBlue = stitches.styled("div", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  backgroundColor: "#0301fc",
  animation: `0.3s linear 0s infinite running ${glitchFlash}`,
})

const Image1 = stitches.styled("img", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  objectFit: "cover",
  animation: `${glitchEffect1} 1s`,
})

const Image2 = stitches.styled("img", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  objectFit: "cover",
  animation: `${glitchEffect2} 1s`,
})

const Image3 = stitches.styled("img", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  objectFit: "cover",
  animation: `${glitchEffect3} 1s`,
})

const StillImage = stitches.styled("img", {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  objectFit: "cover",
})

interface GlitchImageProps {
  image: string
  nextImage: string
}

const GlitchImage = ({ image, nextImage }: GlitchImageProps) => (
  <Container>
    <StillImage src={image} alt="still image" />
    <BlinkRed />
    <BlinkGreen />
    <BlinkBlue />
    <Image1 src={nextImage} alt="slideshow 1" />
    <Image2 src={nextImage} alt="slideshow 2" />
    <Image3 src={nextImage} alt="slideshow 3" />
  </Container>
)

export default GlitchImage
