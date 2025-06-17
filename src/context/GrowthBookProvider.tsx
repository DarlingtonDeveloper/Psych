import {
  GrowthBook,
  GrowthBookProvider as Provider,
} from "@growthbook/growthbook-react"
import React, { FC, PropsWithChildren, useEffect } from "react"

export const GrowthbookFeatures = {
  newStaking: "new-staking",
}

export const growthbook = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY
  ? new GrowthBook({
      apiHost: "https://cdn.growthbook.io",
      clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    })
  : ({
      loadFeatures: () => {},
      // on development, always show features
      isOn: () => true,
    } as unknown as GrowthBook)

const GrowthBookProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    growthbook.loadFeatures()
  }, [])

  return <Provider growthbook={growthbook}>{children}</Provider>
}

export default GrowthBookProvider
