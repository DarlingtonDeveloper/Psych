import faunadb, { query as q } from "faunadb"
import entries from "./c1-staking-snapshot.json"

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY as string,
  domain: "db.us.fauna.com",
})

const levelLogic = [0, 10, 32, 55, 85, 145, 205, 275]

const getLevel = (daysStaked: number) => {
  return levelLogic.filter((dc) => daysStaked >= dc).length
}

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

// Staking:
// Each Level accumulated 1,500 Points per Genesis
// Each Level Accumulated 500 Points per C1 <
// Each Level Accumulated 750 Points per Psilocybin

const run = async () => {
  for (let i = 0; i < entries.length; i++) {
    const level = getLevel(entries[i].daysStaked)
    const currentWallet = entries[i].owner
    await upsertPoints(currentWallet, 500 * level)
  }

  await serverClient.close()
}

run()
