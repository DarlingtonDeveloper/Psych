import faunadb, { query as q } from "faunadb"
const userIndex = "pa_users_by_walletAddress"
const userCollection = "pa_users"
const psypointsTransactionHistoryCollection = "psypoints_transaction_history"
const psyPointsDailyProgressCollection = "psypoints_daily_script_progress"

type AUSGSTQuestionnaire = {
  userIsOriginalMinter: string
  userIsAUSTaxResident: string
  userInAUS: string
  userRegisteredAUSGST: string
  walletAddresses: string
  declareTruth: boolean
  userIsAUSTaxResOrigMintingPeriod?: string
  userLocAUSOrigMintingPeriod?: string
  userRegAUSGSTOrigMintingPeriod?: string
}

type AUSGSTEZUQuestionnaire = {
  userIsOGEZUMinter: string
  userIsAUSTaxResEZUMintingPeriod: string
  userLocAUSEZUMintingPeriod: string
  userRegAUSGSTEZUMintingPeriod: string
  walletAddresses: string
  declareTruth: boolean
  userIsAUSTaxResOrigMintingPeriod?: string
  userLocAUSOrigMintingPeriod?: string
  userRegAUSGSTOrigMintingPeriod?: string
}

export interface User {
  walletAddress: string
  nonce: string
  progress: number
  attempts?: number
  updatedAt?: number
  claimedPoints?: number
  unclaimedPoints?: number
  questionnaire?: AUSGSTQuestionnaire
  ezuQuestionnaire?: AUSGSTEZUQuestionnaire
  ip?: string
  psyPointsUpdatedAt?: number
  ref?: faunadb.values.Ref
}

export type PsyPointsDailyProgress = {
  date: string
  startTime: number
  success: boolean
  endTime: number
}

export type UserFaunaRef = User & { ref: faunadb.values.Ref }
type GetAllPsyOfHoldersRes = {
  data: UserFaunaRef[]
  after?: faunadb.Expr[]
}
type GetFaunaType = {
  data: Array<{
    data: User
  }>
}

type GetAllWalletAddressesType = {
  data: string[]
  after?: faunadb.Expr[]
}

type GetAllUnclaimedPointsType = {
  data: User[]
  after?: faunadb.Expr[]
}

type GetAllUserPaginated = {
  data: Array<{
    data: User
  }>
  after?: faunadb.Expr[]
}

type GetPsyPointsDailyProgressType = {
  data: Array<{
    data: PsyPointsDailyProgress
  }>
}

export type UpdatedUnclaimedPoints = {
  walletAddress: string
  unclaimedPoints: number
  ref?: faunadb.values.Ref
}[]

export type UserPointsSource = {
  tokens: number[]
  count: number
  points?: number
}

export type AuditLogPsypointsSource = {
  [type: string]: UserPointsSource
} & {
  TOTAL_POINTS: number
}

export type PointsDistribution = {
  [walletAddress: string]: AuditLogPsypointsSource
}

export interface AuditLog {
  walletAddress: string
  prevClaimedPoints: number
  prevUnclaimedPoints: number
  claimedPoints: number
  unclaimedPoints: number
  source: AuditLogPsypointsSource
}

export const getUser = async (walletAddress: string): Promise<User[]> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const response = await serverClient.query<GetFaunaType>(
    q.Map(q.Paginate(q.Match(q.Index(userIndex), walletAddress)), (ref) =>
      q.Get(ref)
    )
  )

  await serverClient.close()
  return response.data.length > 0 ? [response.data?.[0].data] : []
}

export const getAllUsersWalletAddress = async () => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  let after: faunadb.Expr[] | undefined
  const pageSize = 10000
  const result: string[] = []
  while (true) {
    const response: GetAllWalletAddressesType =
      await serverClient.query<GetAllWalletAddressesType>(
        q.Map(
          q.Paginate(q.Documents(q.Collection(userCollection)), {
            size: pageSize,
            after: after,
          }),
          q.Lambda(
            "items",
            q.Select(["data", "walletAddress"], q.Get(q.Var("items")))
          )
        )
      )
    const walletAddresses = response.data
    result.push(...walletAddresses)

    if (!response.after || response.after.length === 0) {
      break
    }

    after = response.after
  }
  return result
}

export const getPsyOfHolders = async (walletAddresses: string[]) => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  const result: UserFaunaRef[] = []
  const pageSize = 500

  const sets = walletAddresses.map((walletAddress) =>
    q.Match(q.Index(userIndex), walletAddress)
  )

  const response: GetAllPsyOfHoldersRes =
    await serverClient.query<GetAllPsyOfHoldersRes>(
      q.Map(
        q.Paginate(q.Union(sets), { size: pageSize }),
        q.Lambda("item", {
          walletAddress: q.Select(
            ["data", "walletAddress"],
            q.Get(q.Var("item"))
          ),
          unclaimedPoints: q.Select(
            ["data", "unclaimedPoints"],
            q.Get(q.Var("item"))
          ),
          claimedPoints: q.Select(
            ["data", "claimedPoints"],
            q.Get(q.Var("item"))
          ),
          ref: q.Select("ref", q.Get(q.Var("item"))),
        })
      )
    )

  result.push(...response.data)

  await serverClient.close()
  return result
}

export const getAllUserUnclaimedPoints = async () => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  let after: faunadb.Expr[] | undefined
  const pageSize = 10000
  const result = []
  while (true) {
    const response: GetAllUnclaimedPointsType =
      await serverClient.query<GetAllUnclaimedPointsType>(
        q.Map(
          q.Paginate(q.Documents(q.Collection(userCollection)), {
            size: pageSize,
            after: after,
          }),
          q.Lambda("items", {
            walletAddress: q.Select(
              ["data", "walletAddress"],
              q.Get(q.Var("items"))
            ),
            unclaimedPoints: q.Select(
              ["data", "unclaimedPoints"],
              q.Get(q.Var("items"))
            ),
            claimedPoints: q.Select(
              ["data", "claimedPoints"],
              q.Get(q.Var("items"))
            ),
            ref: q.Select("ref", q.Get(q.Var("items"))),
          })
        )
      )
    result.push(...response.data)

    if (!response.after || response.after.length === 0) {
      break
    }

    after = response.after
  }
  await serverClient.close()
  return result
}

export const getDEMPHoldersPsyPoints = async (walletAddresses: string[]) => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  let after: faunadb.Expr[] | undefined
  const pageSize = 5000
  const result = []
  while (true) {
    const response: GetAllUnclaimedPointsType =
      await serverClient.query<GetAllUnclaimedPointsType>(
        q.Map(
          q.Filter(
            q.Paginate(q.Documents(q.Collection(userCollection)), {
              size: pageSize,
              after,
            }),
            q.Lambda(
              "item",
              q.ContainsValue(
                q.Select(["data", "walletAddress"], q.Get(q.Var("item"))),
                walletAddresses
              )
            )
          ),
          q.Lambda("item", {
            walletAddress: q.Select(
              ["data", "walletAddress"],
              q.Get(q.Var("item"))
            ),
            unclaimedPoints: q.Select(
              ["data", "unclaimedPoints"],
              q.Get(q.Var("item"))
            ),
            claimedPoints: q.Select(
              ["data", "claimedPoints"],
              q.Get(q.Var("item"))
            ),
            ref: q.Select("ref", q.Get(q.Var("item"))),
          })
        )
      )
    result.push(...response.data)

    if (!response.after || response.after.length === 0) {
      break
    }

    after = response.after
  }
  await serverClient.close()
  return result
}

export const getAllUsers = async () => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  let after: faunadb.Expr[] | undefined
  const pageSize = 5000
  const result = []
  while (true) {
    const response: GetAllUserPaginated =
      await serverClient.query<GetAllUserPaginated>(
        q.Map(
          q.Paginate(q.Documents(q.Collection(userCollection)), {
            size: pageSize,
            after: after,
          }),
          q.Lambda("items", q.Get(q.Var("items")))
        )
      )
    const resMini = response.data.map((res) => res.data)
    result.push(...resMini)

    if (!response.after || response.after.length === 0) {
      break
    }

    after = response.after
  }
  await serverClient.close()
  return result
}

export const addUser = async (
  walletAddress: string,
  nonce: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Create(q.Collection(userCollection), {
      data: {
        walletAddress: walletAddress,
        nonce: nonce,
        progress: 1,
        attempts: 0,
        claimedPoints: 0,
        unclaimedPoints: 0,
      },
    })
  )
  await serverClient.close()
  return true
}

export const addUserGST = async (
  walletAddress: string,
  questionnaire: AUSGSTQuestionnaire,
  ip: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
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

export const createUser = async (
  walletAddress: string,
  nonce: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Create(q.Collection(userCollection), {
      data: {
        walletAddress: walletAddress,
        nonce: nonce,
        progress: 1,
      },
    })
  )

  await serverClient.close()
  return true
}

export const updateUser = async (
  walletAddress: string,
  nonce: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          nonce: nonce,
        },
      }
    )
  )
  await serverClient.close()
  return true
}

export const updateUserGST = async (
  walletAddress: string,
  questionnaire: AUSGSTQuestionnaire,
  ip: string
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          walletAddress: walletAddress,
          questionnaire: questionnaire,
          ip: ip,
        },
      }
    )
  )
  await serverClient.close()
  return true
}

export const updateUserGSTEZU = async (
  walletAddress: string,
  ezuQuestionnaire: AUSGSTEZUQuestionnaire
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          walletAddress: walletAddress,
          ezuQuestionnaire: ezuQuestionnaire,
        },
      }
    )
  )
  await serverClient.close()
  return true
}

export const updateUserProgress = async (
  walletAddress: string,
  progress?: number
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          progress: progress,
          updatedAt: Date.now(),
          attempts: 0,
        },
      }
    )
  )
  await serverClient.close()
  return true
}

export const updateUserAttempt = async (
  walletAddress: string,
  attempt: number
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          updatedAt: Date.now(),
          attempts: attempt,
        },
      }
    )
  )
  await serverClient.close()
  return true
}

export const recordTransactionHistory = async (
  timestamp: number,
  walletAddress: string,
  prevClaimedPoints: number,
  prevUnclaimedPoints: number,
  claimedPoints: number,
  unclaimedPoints: number,
  action: "claimed" | "daily-accrued" | "psypack",
  source?: AuditLogPsypointsSource
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })

  await serverClient.query<GetFaunaType>(
    q.Create(q.Collection(psypointsTransactionHistoryCollection), {
      data: {
        timestamp,
        walletAddress,
        prevClaimedPoints,
        prevUnclaimedPoints,
        claimedPoints,
        unclaimedPoints,
        action,
        ...(source && { source }),
      },
    })
  )
  await serverClient.close()
  return true
}

export const transactPsypay = async (
  walletAddress: string,
  currClaimedPoints: number,
  currUnclaimedPoints: number,
  price: number,
  item: string,
  psypayTransactionId: number
): Promise<any> => {
  try {
    const serverClient = new faunadb.Client({
      secret: process.env.FAUNA_DB_SECRET_KEY as string,
      domain: "db.us.fauna.com",
    })
    const psyPointsUpdatedAt = Date.now()
    await serverClient.query<GetFaunaType>(
      q.Update(
        q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
        {
          data: {
            claimedPoints: currClaimedPoints - price,
            psyPointsUpdatedAt: psyPointsUpdatedAt,
          },
        }
      )
    )
    await recordTransactionHistory(
      psyPointsUpdatedAt,
      walletAddress,
      currClaimedPoints!, // prev claim
      currUnclaimedPoints!, // prev uncl
      currClaimedPoints - price, // new claimed
      currUnclaimedPoints,
      "psypack"
    )
    await serverClient.close()

    return {
      psypayTransactionId,
      timestamp: psyPointsUpdatedAt,
      walletAddress,
      item,
      success: true,
      price,
    }
  } catch (error: any) {
    console.log("error: ", error)
    throw error
  }
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
  const psyPointsUpdatedAt = Date.now()
  await serverClient.query<GetFaunaType>(
    q.Update(
      q.Select("ref", q.Get(q.Match(q.Index(userIndex), walletAddress))),
      {
        data: {
          claimedPoints: currClaimedPoints + currUnclaimedPoints,
          unclaimedPoints: 0,
          psyPointsUpdatedAt: psyPointsUpdatedAt,
        },
      }
    )
  )
  await recordTransactionHistory(
    psyPointsUpdatedAt,
    walletAddress,
    currClaimedPoints!, // prev claim
    currUnclaimedPoints!, // prev uncl
    currClaimedPoints + currUnclaimedPoints, // new claimed
    0,
    "claimed"
  )
  await serverClient.close()
  return true
}

function buildBulkAuditLogOps(
  auditLogs: AuditLog[],
  psyPointsUpdatedAt: number
) {
  const updateOperations = []

  for (const log of auditLogs) {
    updateOperations.push(
      q.Create(q.Collection(psypointsTransactionHistoryCollection), {
        data: {
          timestamp: psyPointsUpdatedAt,
          walletAddress: log.walletAddress,
          prevClaimedPoints: log.prevClaimedPoints,
          prevUnclaimedPoints: log.prevUnclaimedPoints,
          claimedPoints: log.claimedPoints,
          unclaimedPoints: log.unclaimedPoints,
          action: "daily-accrued",
          source: log.source,
        },
      })
    )
  }

  return updateOperations
}

function buildBulkPsypointsUpdateOps(
  records: UpdatedUnclaimedPoints,
  psyPointsUpdatedAt: number
) {
  const updateOperations = []

  for (const record of records) {
    updateOperations.push(
      q.Update(q.Ref(q.Collection(userCollection), record.ref!.id), {
        data: {
          unclaimedPoints: record.unclaimedPoints,
          psyPointsUpdatedAt: psyPointsUpdatedAt,
        },
      })
    )
  }

  return updateOperations
}
export const bulkGivePoints = async (
  calculatedUpdatedPoints: UpdatedUnclaimedPoints,
  auditLogs: AuditLog[]
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  try {
    const psyPointsUpdatedAt = Date.now()
    const psyPointsUpdateOperations = buildBulkPsypointsUpdateOps(
      calculatedUpdatedPoints,
      psyPointsUpdatedAt
    )
    console.log(`\nStart time: ${new Date()} psyPointsUpdateOperations`)
    await serverClient.query(
      q.Map(
        psyPointsUpdateOperations,
        q.Lambda("operation", q.Do(q.Var("operation")))
      )
    )
    console.log(`End time: ${new Date()} psyPointsUpdateOperations`)

    const auditLogsWriteOperations = buildBulkAuditLogOps(
      auditLogs,
      psyPointsUpdatedAt
    )
    console.log(`\nStart time: ${new Date()} auditLogsWriteOperations`)
    await serverClient.query(
      q.Map(
        auditLogsWriteOperations,
        q.Lambda("operation", q.Do(q.Var("operation")))
      )
    )
    console.log(`End time: ${new Date()} auditLogsWriteOperations`)
    await serverClient.close()
    return true
  } catch (error) {
    console.log("Error in bulkGivePoints:\n", error)
    await serverClient.close()
    return false
  }
}

export const getPsyPointsDailyProgress =
  async (): Promise<PsyPointsDailyProgress> => {
    const serverClient = new faunadb.Client({
      secret: process.env.FAUNA_DB_SECRET_KEY as string,
      domain: "db.us.fauna.com",
    })

    const response = await serverClient.query<GetPsyPointsDailyProgressType>(
      q.Map(
        q.Paginate(
          q.Documents(q.Collection(psyPointsDailyProgressCollection)),
          {
            size: 1,
          }
        ),
        q.Lambda("ref", q.Get(q.Var("ref")))
      )
    )

    if (response.data.length === 0) {
      throw new Error(`Collection ${psyPointsDailyProgressCollection} is empty`)
    }
    const document = response.data?.[0].data

    await serverClient.close()
    return document
  }

export const updatePsyPointsDailyProgress = async (
  date: string,
  startTime: number,
  success: boolean,
  endTime: number
): Promise<boolean> => {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET_KEY as string,
    domain: "db.us.fauna.com",
  })
  try {
    await serverClient.query<GetFaunaType>(
      q.Map(
        q.Paginate(
          q.Documents(q.Collection(psyPointsDailyProgressCollection)),
          {
            size: 1,
          }
        ),
        q.Lambda(
          "ref",
          q.Update(q.Var("ref"), {
            data: {
              date,
              startTime,
              success,
              endTime,
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
