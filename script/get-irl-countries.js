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
    secret: "fnAEfKEfmWAAR1ru2LGTfs2Dq77GqacJZCgvdZiD",
    domain: "db.us.fauna.com",
  })

  const result = await serverClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("irl-claims")), {
        size: 10000,
      }),
      q.Lambda("registration", q.Get(q.Var("registration")))
    )
  )

  return result.data.map((res) => res.data)
}

async function saveCSV(csv) {
  const outDir = path.join(process.cwd(), "script_out")
  await fs.ensureDir(outDir)
  await fs.writeFile(path.join(outDir, "irl-claims.csv"), csv)
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
