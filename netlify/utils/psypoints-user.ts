import faunadb, { query as q } from "faunadb"

const userCollection = "psypoints-users"
const userIndex = "psypoints_users_by_wallet_address"
const userPointsIndex = "psypoints_points_by_wallet_address"

type AUSGSTQuestionnaire = {
  userIsOriginalMinter: boolean
  userIsAUSTaxResident: boolean
  userInAUS: boolean
  userRegisteredAUSGST: boolean
  walletAddresses: string
  declareTruth: boolean
  userIsAUSTaxResOrigMintingPeriod?: boolean
  userLocAUSOrigMintingPeriod?: boolean
  userRegAUSGSTOrigMintingPeriod?: boolean
}

interface User {
  walletAddress: string
  questionnaire: AUSGSTQuestionnaire
  ip: string
}
interface UserPoints {
  walletAddress: string
  claimedPoints: number
  unclaimedPoints: number
}

type GetUserFaunaType = {
  data: Array<{
    data: User
  }>
}

type GetUserPointsFaunaType = {
  data: Array<{
    data: UserPoints
  }>
}

export const addUser = async (
  walletAddress: string,
  questionnaire: AUSGSTQuestionnaire,
  ip: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetUserFaunaType>(
    q.Create(q.Collection(userCollection), {
      data: {
        walletAddress: walletAddress,
        questionnaire: questionnaire,
        ip: ip,
      },
    })
  )
  await serverClient.close()
  return true
}

export const getUser = async (walletAddress: string): Promise<User[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetUserFaunaType>(
    q.Map(q.Paginate(q.Match(q.Index(userIndex), walletAddress)), (ref) =>
      q.Get(ref)
    )
  )

  await serverClient.close()
  return response.data.length > 0 ? [response.data?.[0].data] : []
}

export const getUserPoints = async (
  walletAddress: string
): Promise<UserPoints[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetUserPointsFaunaType>(
    q.Map(q.Paginate(q.Match(q.Index(userPointsIndex), walletAddress)), (ref) =>
      q.Get(ref)
    )
  )

  await serverClient.close()
  return response.data.length > 0 ? [response.data?.[0].data] : []
}

export const claimPoints = async (
  walletAddress: string,
  currClaimedPoints: number,
  currUnclaimedPoints: number
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetUserFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userPointsIndex), walletAddress))),
      {
        data: {
          claimedPoints: currClaimedPoints + currUnclaimedPoints,
          unclaimedPoints: 0,
          updatedAt: Date.now(),
        },
      }
    )
  )
  await serverClient.close()
  return true
}
