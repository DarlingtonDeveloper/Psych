import tokens from "./psilocybinfinaltraits.json"

const run = async () => {
  const result = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.attributes[1]?.value === "Heroic") {
      result.push(token.tokenId)
    }
  }

  console.log(JSON.stringify(result))
}

run()
