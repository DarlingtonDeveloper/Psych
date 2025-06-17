const ITEM_NAME = "PSYCHEDELICS_GAME_TOKEN"

const setSession = (accessToken: string) => {
  sessionStorage.setItem(ITEM_NAME, accessToken)
}

const getSession = () => {
  return sessionStorage?.getItem(ITEM_NAME)
}

const removeSession = () => {
  sessionStorage.removeItem(ITEM_NAME)
}

export const sessionHandler = {
  setSession,
  getSession,
  removeSession,
}
