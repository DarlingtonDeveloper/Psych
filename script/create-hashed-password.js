const bcrypt = require("bcrypt")
const base64 = require("js-base64")

async function generateHashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

async function run() {
  console.log(base64.encode(await generateHashPassword("silver collective")))
  console.log(base64.encode(await generateHashPassword("golden key")))
  console.log(base64.encode(await generateHashPassword("amethyst dragon")))
  console.log(base64.encode(await generateHashPassword("reptillian tiger")))
  console.log(base64.encode(await generateHashPassword("the gathering")))
}

run()
