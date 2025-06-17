import React, { Ref } from "react"
import { StakedTokenType } from "../../../../components/Staking/types"
import { NFTCard } from "../Card"
import { Grid, ToolbarWrapper } from "./styles"
import { NoTokens } from "../NoTokens"
import { ClipLoader } from "react-spinners"
import stitches from "../../../../stitches"
import { SelectComponent } from "../../../../components/Select"

interface Props {
  tokenType?: StakedTokenType
  setTokenType: (val: StakedTokenType) => void
  data?: Array<{ preview: string; tokenId: number; tokenType: string }>
  isLoading: boolean
  isFetchingNextPage: boolean
  ref: Ref<HTMLDivElement>
}

const LoaderWrapper = stitches.styled("div", {
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
})

const FetchLoader = stitches.styled("div", {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: "24px 0",
})

const options = [
  { value: "", label: "All" },
  { value: "c1", label: "C1" },
  { value: "genesis", label: "Genesis" },
  { value: "psilocybin", label: "Psilocybin" },
]

export const StakingBody = React.forwardRef<HTMLDivElement, Props>(
  ({ tokenType, setTokenType, data, isLoading, isFetchingNextPage }, ref) => {
    return (
      <section>
        <ToolbarWrapper>
          <SelectComponent
            value={tokenType}
            onChange={(val) => setTokenType(val as StakedTokenType)}
            placeholder="Select NFT type"
            items={options}
          />
        </ToolbarWrapper>
        <Grid>
          {isLoading ? (
            <LoaderWrapper>
              <ClipLoader />
            </LoaderWrapper>
          ) : (
            <>
              {(!data || data?.length === 0) && (
                <NoTokens tokenType={tokenType} />
              )}
              {(data || []).map((val, index, arr) => {
                return (
                  <NFTCard
                    title={`${val.tokenId}`}
                    subheading={val.tokenType.toUpperCase()}
                    img={val.preview}
                    key={`${val.tokenId}`}
                    id={val.tokenId}
                    ref={arr.length - 5 === index ? ref : undefined}
                  />
                )
              })}
            </>
          )}
        </Grid>
        {isFetchingNextPage ? (
          <FetchLoader>
            <ClipLoader />
          </FetchLoader>
        ) : null}
      </section>
    )
  }
)

StakingBody.displayName = "StakingBody"
