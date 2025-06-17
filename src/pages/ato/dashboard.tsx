import React, { useEffect, useState } from "react"
import MetaHead from "../../components/common/MetaHead"
import { useQuery } from "react-query"
import {
  Container,
  Header,
  DescriptionWrapper,
  Text,
} from "../../components/ATO/styles"
import axios from "axios"
import { ATOWallet } from "../../components/ATO/ATOWallet"
import { ATODashboard } from "../../components/ATO/Dashboard"
import { BarLoader } from "react-spinners"
import {
  getATOLocalStorage,
  removeATOLocalStorage,
} from "../../utils/localStorage"
import { useRouter } from "next/router"
import { PAGE } from "../../utils/pages"

interface ATOResponse {
  total: number
  australian: number
  international: number
  awaiting: number
  updatedAt: string
}

const ATODashboardPage = () => {
  const [webNavigator, setNavigator] = useState<Navigator>()
  const router = useRouter()

  const { data, isLoading } = useQuery(
    ["ato-summary"],
    async () => {
      const response = await axios.get<ATOResponse>(
        "/.netlify/functions/get-ato-summary",
        {
          headers: {
            authorization: `Bearer ${getATOLocalStorage()}`,
          },
        }
      )

      return response.data
    },
    {
      onError: () => {
        removeATOLocalStorage()
        router.push(PAGE.ATO_LOGIN)
      },
    }
  )

  const total = data?.total

  const wallets = [
    { id: "australian", value: data?.australian || 0 },
    { id: "awaiting", value: data?.awaiting || 0 },
    { id: "international", value: data?.international || 0 },
  ]

  useEffect(() => {
    if (navigator) {
      setNavigator(navigator)
    }
  }, [])

  return (
    <Container>
      <MetaHead
        title="Psychedelics Anonymous | ATO Login"
        // NEED DESCRIPTION FOR META HEAD
        description="Enter the Mycelia to unlock rewards and gain access to new items as you complete the cycles."
        link="/ato"
      />
      <Header>Mint Wallets</Header>
      <DescriptionWrapper>
        <Text>
          Wallets that minted Psychedelics Anonymous NFTs during the period from
          23rd - 27th December 2021.
        </Text>
        {!!data?.updatedAt && (
          <Text italic fontWeight={400}>
            Last updated: {data?.updatedAt}
          </Text>
        )}
      </DescriptionWrapper>
      {isLoading ? (
        <BarLoader />
      ) : (
        <>
          <ATOWallet wallets={wallets} webNavigator={webNavigator} />
          <ATODashboard
            wallets={wallets}
            webNavigator={webNavigator}
            total={total || 0}
          />
        </>
      )}
    </Container>
  )
}

export default ATODashboardPage
