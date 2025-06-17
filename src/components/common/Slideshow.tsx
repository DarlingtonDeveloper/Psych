import GlitchImage from "./GlitchImage"
import React, { useEffect, useState } from "react"
import stitches from "../../stitches"

interface SlideshowProps {
  slideshowImages?: string[]
}

const defaultSlideShow = [
  require("../../images/slideshow/1.png?url"),
  require("../../images/slideshow/2.png?url"),
  require("../../images/slideshow/3.png?url"),
  require("../../images/slideshow/4.png?url"),
  require("../../images/slideshow/5.png?url"),
  require("../../images/slideshow/6.png?url"),
]

const fadeIn = stitches.keyframes({
  "0%": { opacity: 0.4 },
  "100%": { opacity: 1 },
})

const Placeholder = stitches.styled("div", {
  position: "relative",
  height: "100%",
  width: "100%",
  animation: `${fadeIn} ease-in 0.5s`,
})

const Slideshow = ({ slideshowImages = defaultSlideShow }: SlideshowProps) => {
  const [placeHolderLoaded, setPlaceHolderLoaded] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [slide, setSlide] = useState(0)

  const allImages = slideshowImages.map((image, i) => (
    <GlitchImage
      key={image}
      image={image}
      nextImage={slideshowImages[(i + 1) % slideshowImages.length]}
    />
  ))

  const allImagesLoaded = assetsLoaded === slideshowImages.length

  useEffect(() => {
    const image = new Image()
    image.src = slideshowImages[0]
    image.onload = () => {
      setPlaceHolderLoaded(true)
      setTimeout(() => {
        setAssetsLoaded((a) => a + 1)
      }, 1500)
    }
  }, [slideshowImages])

  useEffect(() => {
    slideshowImages.slice(1).forEach((src) => {
      const image = new Image()
      image.src = src
      image.onload = () => {
        setAssetsLoaded((a) => a + 1)
      }
    })
  }, [slideshowImages])

  useEffect(() => {
    if (allImagesLoaded) {
      const tick = setInterval(() => {
        setSlide((s) => {
          if (s === slideshowImages.length - 1) {
            return 0
          }

          return s + 1
        })
      }, 4000)

      return () => {
        clearInterval(tick)
      }
    }
  }, [allImagesLoaded, slideshowImages])

  return allImagesLoaded ? (
    allImages[slide]
  ) : placeHolderLoaded ? (
    <Placeholder
      css={{
        background: `url(${slideshowImages[0]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  ) : null
}

export default Slideshow
