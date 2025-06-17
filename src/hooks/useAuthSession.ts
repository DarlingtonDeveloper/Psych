import { sessionHandler } from "../utils/sessionStorage"
import jwt from "jsonwebtoken"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { ForestStateContext } from "../context/ForestProvider"
import { useGlobalConnectContext } from "../context/GlobalConnectProvider"
import { PAGE } from "../utils/pages"

export const useAuthSession = () => {
  const router = useRouter()
  const { globalConnectControls } = useGlobalConnectContext()
  const [sessionData, setSessionData] = useContext(ForestStateContext)

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const session = sessionHandler.getSession()

      if (!session) {
        globalConnectControls.disconnect()
        router.push(PAGE.FOREST)
        return
      }

      const { progress } = jwt.decode(session) as {
        progress: number
      }

      // no state set yet.
      if (sessionData.progress === 0) {
        setSessionData({ progress, isAuthenticated: true })
      }
    }
  }, [router, globalConnectControls, sessionData, setSessionData])

  return { sessionData, setSessionData }
}
