import faunadb, { query as q } from "faunadb"
const ATOCollection = "ato-summary"

export type ATOSummary = {
  total: number
  australian: number
  international: number
  awaiting: number
  updatedAt: string
}

type GetATOSummaryType = {
  data: Array<{
    data: ATOSummary
  }>
}

function getFormattedDate(): string {
  const now = new Date()
  const options: any = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Australia/Sydney",
    timeZoneName: "short",
  }

  const formattedDate = now
    .toLocaleString("en-AU", options)
    .replace("\u202F", " ")
    .toUpperCase()

  return formattedDate
}


export const getATOSummary = async (): Promise<ATOSummary> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetATOSummaryType>(
    q.Map(
      q.Paginate(q.Documents(q.Collection(ATOCollection)), {
        size: 1,
      }),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  )

  if (response.data.length === 0) {
    throw new Error(`Collection ${ATOCollection} is empty`)
  }
  const document = response.data?.[0].data

  await serverClient.close()
  return document
}

export const updateATOSummary = async (
  total: number,
  australian: number,
  international: number,
  awaiting: number
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  try {
    await serverClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(ATOCollection)), {
          size: 1,
        }),
        q.Lambda(
          "ref",
          q.Update(q.Var("ref"), {
            data: {
              total,
              australian,
              international,
              awaiting,
              updatedAt: getFormattedDate(),
            },
          })
        )
      )
    )

    await serverClient.close()
    return true
  } catch (error) {
    console.log(`Error in updatePsyPointsDailyProgress:\n${error}`)
    await serverClient.close()
    throw error
  }
}