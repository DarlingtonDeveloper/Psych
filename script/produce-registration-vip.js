const faunadb = require("faunadb")
const { parse } = require("json2csv")
const fs = require("fs-extra")
const path = require("path")
const q = faunadb.query

const fields = [
  "emailAddress",
  "twitterHandle",
  "firstName",
  "lastName",
  "token",
  "signature",
  "address",
  "code",
]

async function getRegistrations() {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  const result = await serverClient.query(
    q.Map(
      q.Paginate(
        q.Documents(q.Collection("la-popup-event-registrations-vip")),
        {
          size: 500,
        }
      ),
      q.Lambda("registration", q.Get(q.Var("registration")))
    )
  )

  return result.data.map((res) => res.data)
}

async function saveCSV(csv) {
  const outDir = path.join(process.cwd(), "script_out")
  await fs.ensureDir(outDir)
  await fs.writeFile(path.join(outDir, "vip.csv"), csv)
}

async function run() {
  try {
    const registrations = await getRegistrations()
    const csv = parse(
      registrations.map(
        (reg) => ({
          ...reg,
          code: reg.uniqueCode,
        }),
        { fields }
      )
    )
    await saveCSV(csv)
  } catch (error) {
    console.error(error)
  }
}

run()
