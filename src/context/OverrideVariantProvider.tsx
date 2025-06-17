import React, { createContext, useContext } from "react"
import { HFVariant } from "../components/common/types"
import useOverrideVariant from "../hooks/useOverrideVariant"

export type OverrideVariantHookReturn = {
  clientVariant?: HFVariant
  overrideHFVariant: (value: HFVariant) => void
}

export const OverrideVariantContext = createContext<OverrideVariantHookReturn>(
  {} as OverrideVariantHookReturn
)

const OverrideVariantProvider: React.FC = ({ children }) => {
  const overrideVariantHook = useOverrideVariant()

  return (
    <OverrideVariantContext.Provider value={overrideVariantHook}>
      {children}
    </OverrideVariantContext.Provider>
  )
}

export const useOverrideVariantContext = () =>
  useContext(OverrideVariantContext)

export default OverrideVariantProvider
