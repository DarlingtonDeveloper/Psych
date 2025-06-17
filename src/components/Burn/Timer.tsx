import { differenceInSeconds } from "date-fns"
import React, { useEffect, useState } from "react"
import stitches from "../../stitches"
import Box from "../common/Box"
import VerticalGrid from "../common/VerticalGrid"
import ClockIcon from "./ClockIcon"

interface TimerProps {
  weekNo: number
  deadline: Date
}

const Container = stitches.styled(VerticalGrid, {
  gridGap: "$sm",
  textAlign: "center",
  "@bp3": { textAlign: "left" },
})

const TimerContainer = stitches.styled("div", {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "$md",
  "> svg": { marginRight: "$xs" },
  "@bp3": {
    justifyContent: "flex-start",
  },
})

const ONE_HOUR = 60 * 60
const ONE_MINUTE = 60

const Timer = ({ weekNo, deadline }: TimerProps) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())
  const diffInSeconds = differenceInSeconds(deadline, currentTime)

  const getCoundown = () => {
    if (diffInSeconds <= 1) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    const hours = Math.floor(diffInSeconds / ONE_HOUR)
    const minutes = Math.floor((diffInSeconds - hours * ONE_HOUR) / ONE_MINUTE)
    const seconds = diffInSeconds - hours * ONE_HOUR - minutes * ONE_MINUTE
    return {
      hours,
      minutes,
      seconds,
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      setCurrentTime(now)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const timer = getCoundown()

  return (
    <Container>
      <Box css={{ fontSize: "$sm" }}>WEEK {weekNo}</Box>
      <TimerContainer>
        <ClockIcon />
        <Box>
          {`${timer.hours}`.padStart(2, "0") +
            ":" +
            `${timer.minutes}`.padStart(2, "0") +
            ":" +
            `${timer.seconds}`.padStart(2, "0")}
        </Box>
      </TimerContainer>
    </Container>
  )
}

export default Timer
