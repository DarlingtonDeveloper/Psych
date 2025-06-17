import React, { createContext, useContext } from "react"
import { Pack, Campaign } from "../utils/psypay"
import { useCampaign } from "../hooks/useCampaign"

export interface CampaignContextType {
  campaign: Campaign | null
  pack: Pack | null
}

const CampaignContext = createContext<CampaignContextType>({
  campaign: null,
  pack: null,
})

export const CampaignProvider: React.FC = ({ children }) => {
  const campaignId = process.env.NEXT_PUBLIC_PSYPACK_CAMPAIGN_ID
  const campaignHook = useCampaign(Number(campaignId))

  return (
    <CampaignContext.Provider value={campaignHook}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useCampaignContext = () => useContext(CampaignContext)

export default CampaignProvider
