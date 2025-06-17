import { createStitches } from "@stitches/react"

const stitches = createStitches({
  media: {
    bp1: "(min-width: 320px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1025px)",
    bp4: "(min-width: 1200px)",
    bp5: "(min-width: 1440px)",
  },
  theme: {
    colors: {
      paMid: "#242424",
      paDark: "#1E1E1E",
      paIce: "#F3F5F7",
      paLightGrey: "#ACB6AE",
      paYellow: "#FFFF00",
      paBlue: "#4669FB",
      paGrey: "#4A555B",
      paDust: "#FFD396",
      paEarth: "#6A5359",
      paRed: "#FF0404",
      paPsilocybin: "#5BFFF8",
      paImpactBlue: "#0D438A",
      paWhite: "#FFFFFF",
      paGreen: "#126C63",

      // v2 Design
      paMoonLight: "#F3F5F7",
      paMidnight: "#242424",
      paLunar: "#464646",
      paLupine: "#54514B",
      paDustv2: "#E0DFD3",
      paFormRed: "#8b0000",
      paGreenV2: "#97B784",
      paSage: "#C3C6AC",
      paRedV2: "#D64949",
      paResist: "#BFBBA4",
      paForest: "#666850",

      // light
      paFlame: "#EE776F",
      paC1: "#F0CDA3",
      paC2: "#FFA4D5",
      paC3: "#87D6CD",
      paBrown: "#A48F79",

      // Utility
      modalOverlayBlack: "rgba(0,0,0,0.4)",
    },
    space: {
      xxs: "0.422rem",
      xs: "0.563rem",
      sm: "0.75rem",
      rg: "1rem",
      md: "1.33rem",
      lg: "1.77rem",
      xl: "2.369rem",
      xxl: "3.157rem",
    },
    fontSizes: {
      xxs: "0.422rem",
      xs: "0.563rem",
      sm: "0.75rem",
      rg: "1rem",
      md: "1.33rem",
      lg: "1.77rem",
      xl: "2.369rem",
      xxl: "3.157rem",
    },
    fonts: {
      proxima: "Proxima Nova, sans-serif",
      sawton: "Sawton Circular, sans-serif",
      inter: "Inter, sans-serif",
    },
    fontWeights: {},
    lineHeights: {
      xxs: "0.422rem",
      xs: "0.563rem",
      sm: "0.75rem",
      rg: "1rem",
      md: "1.33rem",
      lg: "1.77rem",
      xl: "2.369rem",
      xxl: "3.157rem",
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {
      cropped: -2,
      hide: -1,
      auto: "auto",
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800,
    },
    transitions: {},
  },
})

const globalStyles = stitches.globalCss({
  "*": { boxSizing: "border-box", fontFamily: "$proxima" },
  "*:after": { boxSizing: "border-box", fontFamily: "$proxima" },
  "*:before": { boxSizing: "border-box", fontFamily: "$proxima" },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "$paMid",
    position: "relative",
  },
  strong: {
    fontWeight: 600,
  },
  b: {
    fontWeight: 600,
  },
  html: {
    "@initial": { fontSize: "16px" },
    "@bp1": { fontSize: "calc(16px + 4 * ((100vw - 320px) / 704))" },
    "@bp3": { fontSize: "20px" },
    scrollBehavior: "smooth",
  },
  "#WEB3_CONNECT_MODAL_ID": {
    position: "fixed",
    zIndex: "$modal",
  },
  h1: { margin: 0 },
  h2: { margin: 0 },
  h3: { margin: 0 },
  h4: { margin: 0 },
  h5: { margin: 0 },
  h6: { margin: 0 },
  "::-webkit-scrollbar-track": {
    backgroundColor: "$paMid",
  },
  "::-webkit-scrollbar": {
    width: "2px",
    backgroundColor: "#F5F5F5",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 1px rgba(150,150,150,.3)",
    backgroundColor: "$paLightGrey",
  },
  "*::-webkit-media-controls-panel": {
    display: "none!important",
    "-webkit-appearance": "none",
  },
  "@font-face": [
    {
      fontFamily: "Proxima Nova",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 400,
      src: `
      url('/fonts/Proxima-Nova-Regular.woff2') format('woff2'),
      url('/fonts/Proxima-Nova-Regular.woff') format('woff');
    `,
    },
    {
      fontFamily: "Proxima Nova",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 600,
      src: `
      url('/fonts/Proxima-Nova-Semibold.woff2') format('woff2'),
      url('/fonts/Proxima-Nova-Semibold.woff') format('woff');
    `,
    },
    {
      fontFamily: "Proxima Nova",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 200,
      src: `
      url('/fonts/Proxima-Nova-Light.woff2') format('woff2'),
      url('/fonts/Proxima-Nova-Light.woff') format('woff');
    `,
    },
    {
      fontFamily: "Proxima Nova",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 800,
      src: `
      url('/fonts/Proxima-Nova-Xbold.woff2') format('woff2'),
      url('/fonts/Proxima-Nova-Xbold.woff') format('woff');
    `,
    },
    {
      fontFamily: "Sawton Circular",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 700,
      src: `
        url('/fonts/Sawton-Circular-Bold.woff2') format('woff2'),
        url('/fonts/Sawton-Circular-Bold.woff') format('woff');     
      `,
    },
    {
      fontFamily: "Inter",
      fontStyle: "regular",
      fontDisplay: "swap",
      fontWeight: 400,
      src: `
        url('/fonts/Inter-Regular.woff2') format('woff2'),
        url('/fonts/Inter-Regular.woff') format('woff');     
      `,
    },
    {
      fontFamily: "Inter",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 700,
      src: `
        url('/fonts/Inter-Bold.woff2') format('woff2'),
        url('/fonts/Inter-Bold.woff') format('woff');     
      `,
    },
    {
      fontFamily: "Inter",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 900,
      src: `
        url('/fonts/Inter-ExtraBold.woff2') format('woff2'),
        url('/fonts/Inter-ExtraBold.woff') format('woff');     
      `,
    },
    {
      fontFamily: "Inter",
      fontStyle: "regular",
      fontDisplay: "swap",
      fontWeight: 100,
      src: `
        url('/fonts/Inter-ExtraLight.woff2') format('woff2'),
        url('/fonts/Inter-ExtraLight.woff') format('woff');     
      `,
    },
    {
      fontFamily: "Inter",
      fontStyle: "bold",
      fontDisplay: "swap",
      fontWeight: 600,
      src: `
        url('/fonts/Inter-SemiBold.woff2') format('woff2'),
        url('/fonts/Inter-SemiBold.woff') format('woff');     
      `,
    },
  ],
})

globalStyles()

export default stitches
