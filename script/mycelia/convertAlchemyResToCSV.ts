// This script is for data forensic.

import * as fs from "fs"
import path from "path"

interface TokenBalance {
  tokenId: string
  balance: number
}

interface OwnerAddress {
  ownerAddress: string
  tokenBalances: TokenBalance[]
}

interface Addresses {
  ownerAddresses: OwnerAddress[]
}

const convertToCSV = (data: Addresses): string => {
  const csvRows: string[] = []

  csvRows.push("ownerAddress,arrayOfTokenIds,numberOfTokens")

  data.ownerAddresses.forEach((owner) => {
    const arrayOfTokenIds = owner.tokenBalances
      .map((tb) => +tb.tokenId)
      .join(";")
    const numberOfTokens = owner.tokenBalances.reduce(
      (acc, tb) => acc + tb.balance,
      0
    )
    csvRows.push(`${owner.ownerAddress},${arrayOfTokenIds},${numberOfTokens}`)
  })

  return csvRows.join("\n")
}

const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./alchemy_prod/genesis.json"), "utf8")
)

const csvData = convertToCSV(jsonData)

fs.writeFileSync(path.join(__dirname, "./alchemy_prod/genesis.csv"), csvData)
