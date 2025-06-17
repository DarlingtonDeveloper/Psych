const faunadb = require("faunadb")
const { parse } = require("json2csv")
const fs = require("fs-extra")
const path = require("path")
const q = faunadb.query

const DOCUMENT_NAME = "demp_game_scores"
const FAUNA_KEY = {
  production: "fnAEfKEfmWAAR1ru2LGTfs2Dq77GqacJZCgvdZiD",
  staging: "fnAE1QJ3DRACS67XZiHVYE7iTAwEV-Qv6tQnMqub",
}
// CHANGE ME:
const MODE = "staging" // production | staging

async function getItems() {
  const serverClient = new faunadb.Client({
    secret: FAUNA_KEY[MODE],
    domain: "db.us.fauna.com",
  })

  let after = []
  const pageSize = 5000
  const result = []
  while (true) {
    const response = await serverClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(DOCUMENT_NAME)), {
          size: pageSize,
          after: after,
        }),
        q.Lambda("items", q.Get(q.Var("items")))
      )
    )
    const resMini = response.data.map((res) => res.data)
    result.push(...resMini)
    if (!response.after) {
      break
    }
    after = response.after
  }
  console.log("result_final: ", result)
  await serverClient.close()
  return result
}

async function saveCSV(csv) {
  const outDir = path.join(process.cwd(), "script_out")
  await fs.ensureDir(outDir)
  await fs.writeFile(
    path.join(outDir, `${DOCUMENT_NAME}_backup_${MODE}_${new Date()}.csv`),
    csv
  )
}

async function run() {
  try {
    const items = await getItems()
    const csv = parse(items)
    await saveCSV(csv)
  } catch (error) {
    console.error(error)
  }
}

run()
