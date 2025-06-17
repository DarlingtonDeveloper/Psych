import WEEK_DEADLINES from "./weekDeadlines.json"

export interface WeekMetadata {
  weekNo: number
  deadline: Date
}

export const chooseWeek = (now = new Date()): WeekMetadata | undefined => {
  for (let i = 0; i < WEEK_DEADLINES.length; i++) {
    const week = WEEK_DEADLINES[i]
    const deadline = new Date(week.deadline)
    if (now <= deadline) {
      return { weekNo: week.weekNo, deadline }
    }
  }

  return undefined
}
