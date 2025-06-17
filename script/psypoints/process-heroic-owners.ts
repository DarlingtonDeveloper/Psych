import faunadb, { query as q } from "faunadb"
import owners from "./psilocybin-holders.json"

const serverClient = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET_KEY as string,
  domain: "db.us.fauna.com",
})

const heroicTokenIds = new Set([
  9, 35, 110, 112, 120, 156, 157, 173, 182, 189, 191, 252, 269, 270, 276, 281,
  286, 310, 315, 317, 325, 332, 418, 427, 456, 472, 478, 513, 530, 545, 559,
  593, 609, 624, 626, 677, 680, 699, 737, 753, 759, 773, 775, 780, 783, 850,
  856, 867, 923, 930, 936, 964, 982, 1013, 1053, 1075, 1077, 1099, 1110, 1124,
  1146, 1158, 1167, 1218, 1228, 1235, 1249, 1292, 1319, 1321, 1333, 1372, 1423,
  1465, 1479, 1488, 1503, 1521, 1523, 1532, 1551, 1560, 1592, 1610, 1668, 1675,
  1678, 1680, 1682, 1696, 1702, 1706, 1721, 1750, 1768, 1810, 1818, 1862, 1887,
  1900, 1919, 1986, 2020, 2036, 2037, 2050, 2079, 2095, 2109, 2114, 2121, 2134,
  2172, 2193, 2210, 2233, 2263, 2290, 2317, 2324, 2336, 2343, 2347, 2357, 2380,
  2382, 2390, 2396, 2493, 2556, 2565, 2589, 2617, 2653, 2658, 2683, 2693, 2723,
  2766, 2781, 2784, 2817, 2820, 2838, 2855, 2895, 2903, 2914, 2926, 2966, 2976,
  2990, 3030, 3068, 3071, 3082, 3093, 3099, 3130, 3151, 3154, 3181, 3210, 3217,
  3227, 3255, 3272, 3293, 3305, 3321, 3323, 3330, 3345, 3348, 3358, 3411, 3423,
  3429, 3460, 3470, 3473, 3474, 3481, 3483, 3499, 3522, 3523, 3536, 3545, 3551,
  3566, 3593, 3609, 3709, 3729, 3747, 3775, 3784, 3858, 3864, 3873, 3874, 3886,
  3888, 3891, 3894, 3900, 3933, 3946, 3956, 3981, 4028, 4062, 4068, 4082, 4099,
  4118, 4121, 4144, 4185, 4187, 4203, 4220, 4224, 4267, 4318, 4331, 4336, 4337,
  4338, 4351, 4363, 4378, 4403, 4412, 4424, 4499, 4528, 4558, 4586, 4642, 4668,
  4676, 4679, 4689, 4716, 4718, 4744, 4752, 4759, 4812, 4878, 4898, 4933, 4942,
  4951, 5015, 5024, 5030, 5043, 5111, 5150, 5153, 5197, 5206, 5221, 5261, 5286,
  5297, 5300, 5357, 5380, 5416, 5516, 5548, 5566, 5589, 5622, 5649, 5673, 5675,
  5745, 5746, 5750, 5753, 5763, 5769, 5774, 5787, 5803, 5812, 5826, 5842, 5849,
  5867, 5904, 5909, 5914, 5924, 5952, 5955, 5966, 5979, 5989, 5997, 6000, 6010,
  6025, 6029, 6034, 6063, 6096, 6154, 6171, 6174, 6188, 6197, 6222, 6273, 6275,
  6276, 6307, 6310, 6357, 6369, 6374, 6404, 6418, 6442, 6447, 6502, 6510, 6544,
  6552, 6559, 6572, 6577, 6587, 6608, 6626, 6692, 6718, 6755, 6803, 6856, 6899,
  6914, 6919, 6935, 6939, 6955, 6979,
])

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

// Heroic Psilocybin (if they hold one at the time of PSY Point Claim) collect 15,000 points

const run = async () => {
  for (let i = 0; i < owners.length; i++) {
    if (heroicTokenIds.has(owners[i].tokenId)) {
      const currentWallet = owners[i].walletAddress
      await upsertPoints(currentWallet, 15000)
    }
  }

  await serverClient.close()
}

run()
