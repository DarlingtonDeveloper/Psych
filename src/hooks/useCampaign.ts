import { useState, useEffect } from "react"
import axios from "axios"
import { Campaign, Pack } from "../utils/psypay"
import { CampaignContextType } from "../context/CampaignProvider"

export const useCampaign = (campaignId: number): CampaignContextType => {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [pack, setPack] = useState<Pack | null>(null)
  try {
    useEffect(() => {
      async function getCampaignData() {
        const response = await axios.get(
          "/.netlify/functions/get-psypack-campaigns",
          {
            params: {
              campaignId: campaignId,
            },
          }
        )
        setCampaign(response.data.campaign as Campaign)
        setPack(response.data.campaign.packs[0])
      }

      getCampaignData()
    }, [campaignId, setCampaign, setPack])
  } catch (err) {
    console.log(err)
  }
  return {
    campaign,
    pack,
  }
}
