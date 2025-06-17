const faunadb = require("faunadb")
const { parse } = require("json2csv")
const fs = require("fs-extra")
const path = require("path")
const q = faunadb.query

const DOCUMENT_NAME = "ezu-registrations"

async function getItems() {
  const serverClient = new faunadb.Client({
    secret: "fnAEfKEfmWAAR1ru2LGTfs2Dq77GqacJZCgvdZiD",
    domain: "db.us.fauna.com",
  })

  const result = await serverClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection(DOCUMENT_NAME)), {
        size: 10000,
      }),
      q.Lambda("items", q.Get(q.Var("items")))
    )
  )

  return result.data.map((res) => res.data)
}

async function saveCSV(csv) {
  const outDir = path.join(process.cwd(), "script_out")
  await fs.ensureDir(outDir)
  await fs.writeFile(path.join(outDir, `${DOCUMENT_NAME}.csv`), csv)
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
