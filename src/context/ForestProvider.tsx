import React, { createContext, useContext, useState } from "react"

type SessionData = {
  progress: number
  isAuthenticated: boolean
}

const initialState = {
  progress: 0,
  isAuthenticated: false,
}

export const ForestStateContext = createContext<
  [SessionData, React.Dispatch<React.SetStateAction<SessionData>>]
>([initialState, () => {}])

const ForestStateProvider: React.FC = ({ children }) => {
  const forestState = useState<SessionData>(initialState)

  return (
    <ForestStateContext.Provider value={forestState}>
      {children}
    </ForestStateContext.Provider>
  )
}

export const useForestStateContext = () => useContext(ForestStateContext)

export default ForestStateProvider
