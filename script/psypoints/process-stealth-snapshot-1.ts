import faunadb, { query as q } from "faunadb"
import entries from "./stealth-snapshot-1.json"

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY as string,
  domain: "db.us.fauna.com",
})

const upsertPoints = async (
  walletAddress: string,
  points: number
): Promise<void> => {
  console.log("Processing ", walletAddress, " ", points)
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

// 1 x Full Set = 2,000 Points

const run = async () => {
  for (let i = 0; i < entries.length; i++) {
    const noOfSets = entries[i].numSets
    const currentWallet = entries[i].address
    await upsertPoints(currentWallet, 2000 * noOfSets)
  }

  await serverClient.close()
}

run()
