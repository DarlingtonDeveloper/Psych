import React from "react"
import { TokenType } from "./types"
import { SelectComponent } from "../Select"

const items: TokenType[] = [
  "IRL Pass",
  "Metaverse Pass",
  "PAPP",
  "Psilocybin",
  "C1",
  "C2",
  "C3",
]

interface TokenTypeSelectProps {
  onChange: (value: TokenType) => void
  placeholder: string
}

const TokenTypeSelect = ({ onChange, placeholder }: TokenTypeSelectProps) => {
  const options = items.map((value) => ({ label: value, value }))
  return (
    <SelectComponent
      onChange={onChange}
      items={options}
      placeholder={placeholder}
    />
  )
}

export default TokenTypeSelect
