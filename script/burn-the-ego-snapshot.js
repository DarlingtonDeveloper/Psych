require("dotenv").config({
  path: __dirname + "./../.env",
})

const axios = require("axios")
const faunadb = require("faunadb")
const { query: q } = faunadb

// change this
const START_DATE = "2022-11-27T21:00:00.000Z"
const END_DATE = "2022-11-29T23:59:59.000Z"
const WEEK_NO = 5

const CONTRACTS_DATA = {
  irlPass: {
    address: "0x92AA4c9A4f54Fe95d0e799687D1Da12A7EBca538",
    numEntries: 1,
  },
  metaPass: {
    address: "0x22674fd4ce74765c211eec01698fda36f57a650a",
    numEntries: 1,
  },
  papp: {
    address: "0xC8E1de8Dc39a758C7a50F659b53F787e0F1398BD",
    numEntries: 2,
  },
  psilocybin: {
    address: "0x11ca9693156929EE2e7E1470C5E1A55b413e9007",
    numEntries: 3,
  },
  c1: { address: "0x5501024dDb740266Fa0d69d19809EC86dB5E3f8b", numEntries: 1 },
  c2: { address: "0xA7B6cb932EEcACd956454317d59c49AA317e3C57", numEntries: 1 },
  c3: { address: "0xc8Cc20febE260C62A9717534442D4E499F9DE741", numEntries: 1 },
}

const BURN_ADDRESS = "0x000000000000000000000000000000000000dead"

const getBlockByTimestamp = async (timestamp) => {
  const request = await axios.get("https://api.etherscan.io/api", {
    params: {
      module: "block",
      action: "getblocknobytime",
      timestamp: Math.floor(timestamp / 1000),
      closest: "before",
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  })

  if (request.data?.status !== "1") {
    throw new Error(request.data.result)
  }

  return request.data.result
}

const getTransactions = async ({
  contractaddress,
  startBlock,
  endBlock,
  page,
}) => {
  const offset = 100
  const params = {
    module: "account",
    action: "tokennfttx",
    contractaddress,
    startblock: startBlock,
    endblock: endBlock,
    sort: "desc",
    apikey: process.env.ETHERSCAN_API_KEY,
    page,
    offset,
  }

  const { data } = await axios.get("https://api.etherscan.io/api", {
    params,
  })
  if (data.status !== "1" && typeof data.result === "string") {
    throw new Error(data.result)
  }

  return {
    result: data.result,
    hasNextPage: data.result?.length === offset,
  }
}

const multiUpsert = (arrData, week, contractName) => {
  return q.Map(
    arrData,
    q.Lambda(
      ["d"],
      q.Let(
        {
          dRef: q.Match(
            q.Index(`burned-wallet-address-week-${week}`),
            q.Select(["walletAddress"], q.Var("d"))
          ),
        },
        q.If(
          q.Exists(q.Var("dRef")),
          q.Replace(q.Select("ref", q.Get(q.Var("dRef"))), {
            data: q.Merge(q.Select(["data"], q.Get(q.Var("dRef"))), {
              [contractName]: q.Add(
                q.Select([contractName], q.Var("d")),
                q.Select(["data", contractName], q.Get(q.Var("dRef")))
              ),
            }),
          }),
          q.Create(q.Collection(`burn-the-ego-snapshots-week-${week}`), {
            data: q.Merge(
              Object.fromEntries(
                Object.keys(CONTRACTS_DATA).map((cname) => [cname, 0])
              ),
              q.Var("d")
            ),
          })
        )
      )
    )
  )
}

const setupClient = async () => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY,
    domain: "db.us.fauna.com",
  })

  try {
    await serverClient.query(
      q.CreateFunction({
        name: "upsert",
        body: q.Query(
          q.Lambda(
            ["ref", "data"],
            q.If(
              q.Exists(q.Var("ref")),
              q.Update(q.Var("ref"), q.Var("data")),
              q.Create(q.Var("ref"), q.Var("data"))
            )
          )
        ),
      })
    )
  } catch (err) {
    console.error(err?.message)
  }

  return serverClient
}

const callFn = async (contractName) => {
  const start = new Date(START_DATE).getTime()
  const end = new Date(END_DATE).getTime()

  const startBlock = await getBlockByTimestamp(start)
  console.log("START BLOCK", startBlock)
  const endBlock = await getBlockByTimestamp(end)
  console.log("END BLOCK", endBlock)
  let transactions = []
  let hasNextPage = false
  let page = 1

  do {
    const res = await getTransactions({
      contractaddress: CONTRACTS_DATA[contractName].address,
      page,
      startBlock,
      endBlock,
    })

    console.log("GET TRANSACTION", page)

    hasNextPage = res.hasNextPage
    page += 1
    transactions = [...transactions, ...res.result]
  } while (hasNextPage)

  const groupedTransactions = transactions
    .filter(({ to, timeStamp }) => {
      const timestamp = +timeStamp * 1000
      const isWithinDuration = timestamp >= start && timestamp <= end
      const isBurnTxn = to === BURN_ADDRESS

      return isWithinDuration && isBurnTxn
    })
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr.from]: (prev[curr.from] || 0) + 1,
      }),
      {}
    )

  const arr = Object.entries(groupedTransactions).map(
    ([walletAddress, count]) => ({
      walletAddress,
      [contractName]: count,
    })
  )

  const serverClient = await setupClient()

  try {
    await serverClient.query(multiUpsert(arr, WEEK_NO, contractName))
  } catch (err) {
    console.error(err)
  }

  return arr
}

const run = async () => {
  try {
    await callFn("irlPass")
    await callFn("metaPass")
    await callFn("papp")
    await callFn("psilocybin")
    await callFn("c1")
    await callFn("c2")
    await callFn("c3")
  } catch (err) {
    console.log(err?.message)
  }
}

run()
