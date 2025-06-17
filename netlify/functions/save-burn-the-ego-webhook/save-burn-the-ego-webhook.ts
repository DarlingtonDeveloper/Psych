import { Handler } from "@netlify/functions"
import faunadb, { query as q } from "faunadb"
import { isBurnAddress, multiUpsert } from "../../lib/burn-the-ego"
import moralis from "moralis"
import { chooseWeek } from "../../../src/components/Burn/utils"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const setupClient = async () => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
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
    console.log(err.message)
  }

  return serverClient
}

type Data = {
  confirmed: boolean
  txs: {
    fromAddress: string
    toAddress: string
  }[]
  nftTransfers: {
    from: string
    to: string
    tokenId: string
  }[]
  block: {
    number: string
    hash: string
    timestamp: string
  }
}

export const handler: Handler = async (event) => {
  try {
    moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })

    moralis.Streams.verifySignature({
      body: JSON.parse((event.body || {}) as string),
      signature: event.headers["x-signature"] as string,
    })
  } catch (err) {
    console.error(err)
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ message: "Something went wrong." }),
    }
  }

  try {
    const contractName = event.path.replace(
      "/.netlify/functions/save-burn-the-ego-webhook/",
      ""
    )

    console.log("Received block data")
    console.log(JSON.parse(event.body || "{}"))

    const {
      confirmed,
      nftTransfers: transactions,
      block,
    }: Data = JSON.parse((event.body || "{}") as string)

    if (!confirmed) {
      console.log("Block not yet confirmed.")
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Block not yet confirmed.",
        }),
      }
    }

    const currTime = +block.timestamp * 1000
    const currWeek = chooseWeek(new Date(currTime))
    const week = currWeek?.weekNo

    if (!transactions?.length) {
      console.log("No transactions found.")
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "No transactions found.",
        }),
      }
    }

    console.log(`[${currTime}] Found ${transactions.length} transactions`)

    const filteredTransactions = transactions.filter(({ to }) =>
      isBurnAddress(to)
    )

    if (!filteredTransactions?.length) {
      console.log(`[${currTime}] No burn transactions found.`)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "No burn transactions found.",
        }),
      }
    }

    console.log(
      `[${currTime}] Found ${filteredTransactions.length} burn transactions`
    )
    console.log(filteredTransactions)

    const groupedTransactions = filteredTransactions.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.from]: (prev[curr.from] || 0) + 1,
      }),
      {} as Record<string, number>
    )

    const arr = Object.entries(groupedTransactions).map(
      ([walletAddress, count]) => ({
        walletAddress,
        [contractName]: count,
      })
    )

    console.log(
      `[${currTime}] ${arr?.length} wallets found with burn transactions`
    )

    const serverClient = await setupClient()

    try {
      await serverClient.query(multiUpsert(arr, week, contractName))
    } catch (err) {
      console.error(err)
    }

    const message = `[${currTime}] ${filteredTransactions?.length} transactions from ${arr?.length} wallets saved.`

    console.log(message)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message,
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Something went wrong." }),
    }
  }
}
