import { useContext } from "react"
import { ToastContext, ToastProviderReturn } from "../context/ToastProvider"

function useToast(): ToastProviderReturn {
  return useContext<ToastProviderReturn>(ToastContext)
}

export default useToast
