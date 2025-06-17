import add from "date-fns/add"
import isBefore from "date-fns/isBefore"
import isEqual from "date-fns/isEqual"
import set from "date-fns/set"
import { query as q } from "faunadb"
import ENTRIES from "../../src/components/Burn/entries.json"

export const FIRST_END_DATE = "2022-11-06T21:59:59.000Z"
export const BURN_ADDRESS = "0x000000000000000000000000000000000000dEAD"

export const CONTRACTS_DATA: Record<
  string,
  { address: String; numEntries: number }
> = Object.fromEntries(
  ENTRIES.map(({ key, quantity, address }) => [
    key,
    {
      address,
      numEntries: quantity,
    },
  ])
)

export const multiUpsert = (arrData, week, contractName) => {
  return q.Map(
    arrData,
    q.Lambda(
      ["d"],
      q.Let(
        {
          dRef: q.Match(
            q.Index(`burned-wallet-address-week-${week}`),
            q.Select(["walletAddress"], q.Var("d"))
          ),
        },
        q.If(
          q.Exists(q.Var("dRef")),
          q.Replace(q.Select("ref", q.Get(q.Var("dRef"))), {
            data: q.Merge(q.Select(["data"], q.Get(q.Var("dRef"))), {
              [contractName]: q.Add(
                q.Select([contractName], q.Var("d")),
                q.Select(["data", contractName], q.Get(q.Var("dRef")))
              ),
            }),
          }),
          q.Create(q.Collection(`burn-the-ego-snapshots-week-${week}`), {
            data: q.Merge(
              Object.fromEntries(
                Object.keys(CONTRACTS_DATA).map((cname) => [cname, 0])
              ),
              q.Var("d")
            ),
          })
        )
      )
    )
  )
}

export const getWeekDetails = (timestamp: number) => {
  let endDate = new Date(FIRST_END_DATE).getTime()
  let week = 0

  while (timestamp > endDate) {
    week += 1
    endDate = add(endDate, { days: 7 }).getTime()
  }

  return {
    week: week + 1,
    startDate: add(endDate, { days: -7, seconds: 1 }),
  }
}

export const isBurnAddress = (address: string) =>
  address.toLowerCase() === BURN_ADDRESS.toLowerCase()

const snapshotInterval = [
  {
    start: {
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    },
    end: {
      minutes: 14,
      seconds: 59,
      milliseconds: 999,
    },
  },
  {
    start: {
      minutes: 15,
      seconds: 0,
      milliseconds: 0,
    },
    end: {
      minutes: 29,
      seconds: 59,
      milliseconds: 999,
    },
  },
  {
    start: {
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    },
    end: {
      minutes: 44,
      seconds: 59,
      milliseconds: 999,
    },
  },
  {
    start: {
      minutes: 45,
      seconds: 0,
      milliseconds: 0,
    },
    end: {
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    },
  },
]

export const getSnapshotDuration = (time: Date) => {
  let i = 0
  let compTime

  do {
    compTime = set(time, snapshotInterval[i].end)

    if (isBefore(time, compTime) || isEqual(time, compTime)) {
      return {
        start: set(time, snapshotInterval[i].start),
        end: set(time, snapshotInterval[i].end),
      }
    }

    i += 1
  } while (i < snapshotInterval.length - 1)
}
