import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import GenesisHeader from "../common/GenesisHeader"
import { Typewriter } from "react-simple-typewriter"

interface ATMConnectProps {
  connectWallet: () => void
}

const ATMContainer = stitches.styled("div", {
  display: "flex",
  paddingTop: "9rem",
  overflow: "hidden",
  margin: "0 auto",
  minHeight: "100vh",
})

const appear = stitches.keyframes({
  "0%": {
    opacity: 0,
    top: 20,
  },
  "100%": {
    opacity: 1,
    top: 0,
  },
})

const ATM = stitches.styled("div", {
  marginTop: "auto",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  backgroundImage: `url(${require("../../images/papp-terminal.png?url")})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top",
  width: "320px",
  height: "610px",
  paddingTop: "30px",
  "@bp2": {
    paddingTop: "60px",
    width: "500px",
    height: "800px",
  },
  "@bp3": {
    paddingTop: "100px",
    width: "600px",
    height: "900px",
  },
  animation: `${appear} ease-in 0.3s`,
})

const ATMBox = stitches.styled("div", {
  position: "absolute",
  width: "100%",
  height: "225px",
  padding: "10px 20px 10px 20px",
  "@bp2": {
    padding: "40px 60px 40px 60px",
    height: "340px",
  },
  "@bp3": {
    padding: "10px 100px 10px 100px",
    height: "320px",
  },
})

const ATMDetail = stitches.styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  color: "$paIce",
  fontSize: "$sm",
  fontWeight: "200",
  padding: "2rem 2.5rem 3rem 2.5rem",
})

const ATMConnectWallet = stitches.styled("button", {
  border: "1px solid $paLightGrey",
  boxShadow: "none",
  backgroundColor: "transparent",
  textTransform: "uppercase",
  padding: "$sm",
  "@bp2": {
    padding: "$rg",
  },
  width: "100%",
  fontFamily: "inherit",
  fontWeight: "inherit",
  color: "inherit",
  "&:hover": {
    cursor: "pointer",
    color: "$paDark",
    backgroundColor: "$paLightGrey",
  },
  transition: "color,background-color ease-in 0.3s",
})

const Placeholder = stitches.styled("div", {
  width: "320px",
  height: "610px",
  paddingTop: "30px",
  "@bp2": {
    paddingTop: "60px",
    width: "500px",
    height: "800px",
  },
  "@bp3": {
    paddingTop: "100px",
    width: "600px",
    height: "900px",
  },
})

const preloadImages = [require("../../images/papp-terminal.png?url")]

const ATMConnect = ({ connectWallet }: ATMConnectProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(0)

  useEffect(() => {
    preloadImages.forEach((pi) => {
      const image = new Image()
      image.src = pi
      image.onload = () => {
        setAssetsLoaded((a) => a + 1)
      }
    })
  }, [])

  return (
    <ATMContainer>
      {assetsLoaded === 1 ? (
        <ATM>
          <ATMBox>
            <ATMDetail>
              <GenesisHeader
                css={{
                  fontSize: "$sm",
                  "&:before": { color: "$paLightGrey", marginRight: "$xs" },
                }}
              >
                c3 claim
              </GenesisHeader>
              <p>
                <Typewriter
                  words={[
                    "Component #3 is the third component required to participate in the Psychedelics Anonymous mini game experience.",
                  ]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={20}
                />
              </p>
              <ATMConnectWallet onClick={connectWallet}>
                Connect Wallet
              </ATMConnectWallet>
            </ATMDetail>
          </ATMBox>
        </ATM>
      ) : (
        <Placeholder />
      )}
    </ATMContainer>
  )
}

export default ATMConnect
