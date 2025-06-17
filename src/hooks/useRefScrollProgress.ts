import { useState, useLayoutEffect, RefObject } from "react"

interface ScrollProgress {
  start: number
  end: number
}

const useRefScrollProgress = (
  ref: RefObject<HTMLDivElement>
): ScrollProgress => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const offsetTop = rect.top + scrollTop
    setStart(offsetTop / document.body.clientHeight)
    setEnd((offsetTop + rect.height) / document.body.clientHeight)
  }, [setStart, setEnd, ref])
  return { start, end }
}

export default useRefScrollProgress
