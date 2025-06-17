import faunadb, { query as q } from "faunadb"
import transactions from "./13857266-13888541-transactions.json"

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY as string,
  domain: "db.us.fauna.com",
})

const upsertPoints = async (
  walletAddress: string,
  points: number
): Promise<void> => {
  await serverClient.query(
    q.Let(
      {
        matchResult: q.Match(
          q.Index("psypoints_points_by_wallet_address"),
          walletAddress.toLowerCase()
        ),
      },
      q.If(
        q.Not(q.IsEmpty(q.Var("matchResult"))),
        q.Update(q.Select(["ref"], q.Get(q.Var("matchResult"))), {
          data: {
            unclaimedPoints: q.Add(
              q.Select(
                ["data", "unclaimedPoints"],
                q.Get(q.Var("matchResult"))
              ),
              points
            ),
            updatedAt: Date.now(),
          },
        }),
        q.Create(q.Collection("psypoints-user-points"), {
          data: {
            walletAddress: walletAddress.toLowerCase(),
            claimedPoints: 0,
            unclaimedPoints: points,
            updatedAt: Date.now(),
          },
        })
      )
    )
  )
}

// Genesis = 500 points
// C1 = 300 Points
// Metaverse Pass = 300 Points
// IRL Pass = 300 Points

const run = async () => {
  const walletAddresses = Object.keys(transactions)

  for (let i = 0; i < walletAddresses.length; i++) {
    const currentWallet = walletAddresses[i] as keyof typeof transactions
    const currentRecord = transactions[currentWallet]

    await upsertPoints(
      currentWallet,
      currentRecord.genesis * 500 +
        currentRecord.c1 * 300 +
        currentRecord.meta * 300 +
        currentRecord.irl * 300
    )
  }

  await serverClient.close()
}

run()
