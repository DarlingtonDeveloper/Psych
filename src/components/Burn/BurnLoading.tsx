import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import VerticalGrid from "../common/VerticalGrid"

const ContentContainer = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  minHeight: "calc(100vh - 16rem)",
  color: "$paMoonLight",
  fontFamily: "$inter",
  fontWeight: "bold",
})

const LoadingText = stitches.styled("div", {
  maxWidth: "22rem",
  textAlign: "center",
  margin: "0 auto",
  lineHeight: 1.75,
})

const BurnLoading = () => {
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setShowSecond((s) => !s), 5000)
    return () => {
      clearInterval(interval)
    }
  }, [setShowSecond])

  return (
    <ContentContainer>
      <VerticalGrid>
        {showSecond ? (
          <LoadingText>
            We ascend through the fibreglass roughness of our imposed reality.
          </LoadingText>
        ) : (
          <LoadingText>
            Painting the constellations of heartbeats in hurricanes and phoenix
            ashes.
          </LoadingText>
        )}
        <LoadingText css={{ fontWeight: 400 }}>
          Please wait for the transaction to complete and the success page to
          display.
        </LoadingText>
      </VerticalGrid>
    </ContentContainer>
  )
}

export default BurnLoading
