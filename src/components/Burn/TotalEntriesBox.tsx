import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { ScaleLoader } from "react-spinners"
import stitches from "../../stitches"
import Box from "../common/Box"
import VerticalGrid from "../common/VerticalGrid"

interface WeekTotalEntriesReturn {
  total: number
}

interface TotalEntriesBoxProps {
  weekNo: number
}

const Container = stitches.styled("div", {
  padding: "$rg",
  backgroundColor: "transparent",
  color: "$paMoonLight",
  width: "fit-content",
  borderRadius: "10px",
  border: "1px solid $paMoonLight",
})

const TotalEntriesBox = ({ weekNo }: TotalEntriesBoxProps) => {
  const weekTotalQuery = useQuery(["week-total-entries", weekNo], async () => {
    const request = await axios.get<WeekTotalEntriesReturn>(
      process.env.NEXT_PUBLIC_WEEK_TOTAL_ENTRIES_ENDPOINT as string,
      {
        params: {
          weekNo,
        },
      }
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
          W{weekNo} Entries
        </Box>
        <Box css={{ textAlign: "center" }}>
          {weekTotalQuery.isLoading ? (
            <ScaleLoader
              color={stitches.theme.colors.paMoonLight.value}
              height={15}
            />
          ) : (
            <Box css={{ fontWeight: "bold", fontSize: "$md" }}>
              {weekTotalQuery.data?.total || 0}
            </Box>
          )}
        </Box>
      </VerticalGrid>
    </Container>
  )
}

export default TotalEntriesBox
