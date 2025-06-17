import React from "react"
import { useFeatureIsOn } from "@growthbook/growthbook-react"
import { GrowthbookFeatures } from "../../context/GrowthBookProvider"
import { StakingDashboardV2 } from "../../v3/Staking/Dashboard"

const StakingDashboardPage = () => {
  const isNewStaking = useFeatureIsOn(GrowthbookFeatures.newStaking)

  if (isNewStaking) {
    return <StakingDashboardV2 />
  }
}

export default StakingDashboardPage
