const path = require("path")
const fs = require("fs")

const genesisDirectory = path.resolve(`D:\\PA 4k Genesis\\4K_GENESIS`)

const keys = [...Array(9595).keys()]
  .map((i) => i + 1)
  .filter(
    (id) => !fs.existsSync(path.join(genesisDirectory, `${id}-Enhanced.png`))
  )

console.log(keys)
