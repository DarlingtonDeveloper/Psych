const csvtojson = require("csvtojson")
const path = require("path")
const fs = require("fs-extra")

const codeJSON = {}

async function run() {
  try {
    const registrants = await csvtojson().fromFile(
      path.join(process.cwd(), "script_out/registrations.csv")
    )

    for (let i = 0; i < registrants.length; i++) {
      codeJSON[registrants[i].code] = registrants[i].address
    }
    await fs.writeJSON(
      path.join(process.cwd(), "script_out/uniqueCode.json"),
      codeJSON
    )
  } catch (error) {
    console.error(error)
  }
}

run()
