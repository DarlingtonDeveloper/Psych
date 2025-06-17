const ATO_TOKEN_NAME = "ATO_DASHBOARD_TOKEN"

export const setATOLocalStorage = (accessToken: string) => {
  localStorage.setItem(ATO_TOKEN_NAME, accessToken)
}

export const getATOLocalStorage = () => {
  return localStorage?.getItem(ATO_TOKEN_NAME)
}

export const removeATOLocalStorage = () => {
  localStorage.removeItem(ATO_TOKEN_NAME)
}
