import { useCallback, useState } from "react"

interface ModalControls {
  close: () => void
  open: () => void
}

type ModalHookReturn = [boolean, ModalControls]

const useModal = (): ModalHookReturn => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const close = useCallback(() => {
    setModalIsOpen(false)
  }, [setModalIsOpen])

  const open = useCallback(() => {
    setModalIsOpen(true)
  }, [setModalIsOpen])

  const controls = { close, open }

  return [modalIsOpen, controls]
}

export default useModal
