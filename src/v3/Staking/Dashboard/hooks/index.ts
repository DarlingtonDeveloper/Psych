import axios, { AxiosError } from "axios"
import { StakedTokenType } from "../../../../components/Staking/types"
import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query"

interface GetOwnedTokenResponse {
  projectedData: Array<{ preview: string; tokenId: number; tokenType: string }>
  totalCount: number
  pageKey: string
}

interface GetOwnedTokenParams {
  ownerAddress: string
  tokenType?: StakedTokenType
  pageSize: number
  pageKey?: string
}

export const useGetOwnedTokens = (
  variables: GetOwnedTokenParams,
  queryOptions: UseInfiniteQueryOptions<
    GetOwnedTokenResponse,
    AxiosError<{ message: string }>
  > = {}
) => {
  return useInfiniteQuery<
    GetOwnedTokenResponse,
    AxiosError<{ message: string }>
  >(
    [
      "getOwnedTokens",
      variables.ownerAddress,
      variables.pageSize,
      variables.tokenType,
    ],
    async ({ pageParam }) => {
      const response = await axios.get<GetOwnedTokenResponse>(
        "/.netlify/functions/get-owned-tokens",
        {
          params: {
            pageSize: variables.pageSize,
            ownerAddress: variables.ownerAddress,
            ...(pageParam ? { pageKey: pageParam } : {}),
            ...(variables.tokenType ? { tokenType: variables.tokenType } : {}),
          },
        }
      )

      return response.data
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage) => lastPage?.pageKey ?? undefined,
    }
  )
}
