import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import Box from "../common/Box"
import VerticalGrid from "../common/VerticalGrid"
import EthereumIcon from "./EthereumIcon"

type OpenSeaResult = {
  floorPrice: number
}

interface OpenSeaStatistics {
  genesisStats: OpenSeaResult
}

const Container = stitches.styled("div", {
  padding: "$rg",
  backgroundColor: "$paMoonLight",
  color: "$paMid",
  width: "fit-content",
  borderRadius: "10px",
})

const FloorPrizeBox = () => {
  const osQuery = useQuery("os-statistics", async () => {
    const request = await axios.get<OpenSeaStatistics>(
      process.env.NEXT_PUBLIC_OS_STATISTICS_ENDPOINT as string
    )
    return request.data
  })

  return (
    <Container css={{ margin: "0 auto", "@bp3": { margin: 0 } }}>
      <VerticalGrid css={{ gridGap: "$xs" }}>
        <Box
          css={{
            textTransform: "uppercase",
            fontSize: "$sm",
            textAlign: "center",
          }}
        >
          Floor Prize Pool
        </Box>
        <Box
          css={{ display: "flex", alignItems: "center", width: "max-content" }}
        >
          <EthereumIcon />
          <Box css={{ marginLeft: "$xs" }}>
            {osQuery.isLoading ? (
              <ScaleLoader
                color={stitches.theme.colors.paMidnight.value}
                height={15}
              />
            ) : (
              <Box css={{ fontWeight: "bold", fontSize: "$md" }}>
                {((osQuery.data?.genesisStats.floorPrice || 0) * 4).toFixed(2)}{" "}
                ETH
              </Box>
            )}
          </Box>
        </Box>
      </VerticalGrid>
    </Container>
  )
}

export default FloorPrizeBox
