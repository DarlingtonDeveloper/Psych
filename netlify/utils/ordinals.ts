import faunadb, { query as q } from "faunadb"
const COLLECTION_NAME = "ordinals"

type OrdinalsSignupData = {
  userIsAUSTaxResident: "yes" | "no"
  userInAUS: "yes" | "no"
  userRegAUSGST: "yes" | "no"
  userBTCWallet: string
  userEmailAddress: string
}
type GetOrdinalsFaunaType = {
  data: Array<{
    data: OrdinalsSignupData
  }>
}

export const submitSignup = async (
  data: OrdinalsSignupData,
  ip: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetOrdinalsFaunaType>(
    q.Create(q.Collection(COLLECTION_NAME), {
      data: {
        userIsAUSTaxResident: data.userIsAUSTaxResident,
        userInAUS: data.userInAUS,
        userRegAUSGST: data.userRegAUSGST,
        userBTCWallet: data.userBTCWallet,
        userEmailAddress: data.userEmailAddress,
        ip,
      },
    })
  )
  await serverClient.close()
  return true
}
