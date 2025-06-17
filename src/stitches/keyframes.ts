import stitches from "."

export const fadeIn = stitches.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const fadeInUp = stitches.keyframes({
  "0%": { opacity: 0, transform: "translateY(-25px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

export const scaleShow = stitches.keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
})

export const fadeOut = stitches.keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
})
