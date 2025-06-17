import { useState } from "react"
import { HFVariant } from "../components/common/types"

const useOverrideVariant = () => {
  const [variant, setVariant] = useState<HFVariant>()

  const overrideHFVariant = (value: HFVariant) => {
    if (value) {
      setVariant(value)
    }
  }

  return {
    clientVariant: variant,
    overrideHFVariant,
  }
}

export default useOverrideVariant
