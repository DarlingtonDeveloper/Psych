import { PAGE } from "../../utils/pages"
import { HFVariant } from "./types"
import { GrowthbookFeatures } from "../../context/GrowthBookProvider"

export const getHFVariantFromRoute = (
  route: string,
  features: Record<keyof typeof GrowthbookFeatures, boolean>,
  type?: "header" | "footer"
): HFVariant => {
  if (
    features?.newStaking &&
    [PAGE.STAKING, PAGE.STAKING_DASHBOARD].includes(route as PAGE)
  ) {
    // introduce better pattern later
    if (type === "footer") {
      return PAGE.STAKING === route ? "transparent" : "lupineTransparent"
    }

    switch (route) {
      case PAGE.STAKING:
      case PAGE.STAKING_DASHBOARD:
        return "transparent"
    }
  }

  switch (route) {
    case PAGE.BURN:
    case PAGE.FOREST_BETWEEN_THE_BLOSSOMS:
    case PAGE.FOREST_BEYOND_THE_PIXELS:
    case PAGE.FOREST:
    case PAGE.FOREST_ENTER:
    case PAGE.FOREST_CHAPTER_ONE:
    case PAGE.FOREST_CHAPTER_TWO:
    case PAGE.FOREST_CHAPTER_THREE:
    case PAGE.FOREST_CHAPTER_FOUR:
    case PAGE.FOREST_CHAPTER_FIVE:
    case PAGE.FOREST_BONE_MACHINE:
    case PAGE.FOREST_CRYSTAL_SPEARS:
    case PAGE.FOREST_EMERALD_FLAMES:
    case PAGE.FOREST_ENTITIES:
    case PAGE.FOREST_FLAMES_OF_DESTINY:
    case PAGE.FOREST_FOREST:
    case PAGE.FOREST_INEXPLICABLE_CALM:
    case PAGE.FOREST_MACHINES:
    case PAGE.FOREST_MIDNIGHT_MASS:
    case PAGE.FOREST_NOCTURNE_EMBRACE:
    case PAGE.FOREST_PALISADES_OF_REALITY:
    case PAGE.FOREST_SYMMETRY:
    case PAGE.FOREST_TWO:
    case PAGE.FOREST_VEIL_PROTECTION:
    case PAGE.FOREST_ZERO_HOUR:
    case PAGE.IRL_CLAIM:
    case PAGE.IRL_CLAIM_FORM:
    case PAGE.IRL_CLAIM_SUCCESS:
    case PAGE.PSY_POINTS:
    case PAGE.PSY_PACKS:
      return "transparent"
    case PAGE.FOREST_ASCENSION:
      return "forestTransparent"
    case PAGE.LIGHT:
    case PAGE.ORDINALS:
    case PAGE.FOREST_THE_LIGHT:
      return "midnightTransparent"
    case PAGE.STAKING:
    case PAGE.STAKING_DASHBOARD:
      return "lgTransparent"
    case PAGE.ATO_LOGIN:
    case PAGE.ATO_DASHBOARD:
      return "lupineTransparent"
    case PAGE.STAKING_V1:
    case PAGE.STAKING_V1_DASHBOARD:
      return "lgTransparent"
    case PAGE.PRIVACY_POLICY:
    case PAGE.TERMS:
    case PAGE.NFT_LICENSE:
      return "greyYellow"
    default:
      if (route.startsWith(`${PAGE.PSY_PACKS_SUCCESS}?packs=`)) {
        return "transparent"
      } else {
        return "dark"
      }
  }
}
