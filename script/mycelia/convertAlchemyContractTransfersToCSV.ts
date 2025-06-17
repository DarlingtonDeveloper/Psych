// This script is for data forensic.

import * as fs from "fs"
import path from "path"

interface TokenType {
  [address: string]: {
    tokens: string[]
    count: number
  }
}

interface Data {
  genesis: TokenType
  psilocybin: TokenType
  c1: TokenType
}

const jsonData: Data = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "./alchemy_contract_transfers_prod/tallyByType_Investigate_c1.json"
    ),
    "utf8"
  )
)

const convertAndSaveCSV = (typeData: TokenType, typeName: string) => {
  const headers = ["ownerAddress", "arrayOfTokenIds", "numberOfTokens"]
  const csvContent = [
    headers.join(","),
    ...Object.entries(typeData).map(([ownerAddress, data]) => {
      const arrayOfTokenIds = data.tokens.join(";")
      const numberOfTokens = data.count
      return `${ownerAddress},${arrayOfTokenIds},${numberOfTokens}`
    }),
  ].join("\n")

  fs.writeFileSync(
    path.join(__dirname, `./alchemy_contract_transfers_prod/${typeName}.csv`),
    csvContent,
    "utf8"
  )
}

;["c1"].forEach((typeName) => {
  const typeData = jsonData[typeName as "genesis" | "psilocybin" | "c1"]
  if (typeData) {
    convertAndSaveCSV(typeData, typeName)
  } else {
    console.warn(`No data for ${typeName}, skipping CSV creation.`)
  }
})
