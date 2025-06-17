import { fadeIn, fadeInUp } from "./keyframes"

export const fadeInUpAnimation = (delay = 0) => ({
  animation: `${fadeInUp} ease-in 1s`,
  animationDelay: `${delay}s`,
  animationFillMode: "forwards",
  opacity: 0,
})

export const fadeInAnimation = (delay = 0) => ({
  animation: `${fadeIn} ease-in 1s`,
  animationDelay: `${delay}s`,
  animationFillMode: "forwards",
  opacity: 0,
})
