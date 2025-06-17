const faunadb = require("faunadb")
const { parse } = require("json2csv")
const fs = require("fs-extra")
const path = require("path")
const q = faunadb.query

const DOCUMENT_NAME = "burn-the-ego-snapshots-week-15"

const burnEntries = {
  irlPass: 1,
  metaPass: 1,
  papp: 2,
  psilocybin: 3,
  c1: 3,
  c2: 5,
  c3: 3,
}

async function getItems() {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
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
  await fs.writeFile(path.join(outDir, `${DOCUMENT_NAME}-wallets.csv`), csv)
}

async function run() {
  try {
    const items = await getItems()
    const finalWallets = items.reduce((acc, item) => {
      const noOfEntries = Object.keys(burnEntries).reduce(
        (acc, cur) => acc + item[cur] * burnEntries[cur],
        0
      )
      for (let i = 0; i < noOfEntries; i++) {
        acc = [...acc, { walletAddress: item.walletAddress }]
      }

      return acc
    }, [])

    const csv = parse(finalWallets)
    await saveCSV(csv)
  } catch (error) {
    console.error(error)
  }
}

run()
