import faunadb, { query as q } from "faunadb"

const riddleIndex = "riddle-by-id"

interface Riddle {
  id: number
  riddle: string
  answer: string
  icon: string
}

type GetFaunaType = {
  data: Array<{
    data: Riddle
  }>
}
export const getRiddle = async (id: number): Promise<Riddle[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetFaunaType>(
    q.Map(q.Paginate(q.Match(q.Index(riddleIndex), id)), (ref) => q.Get(ref))
  )

  await serverClient.close()
  return response.data.length > 0 ? [response.data?.[0].data] : []
}
