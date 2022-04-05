import api from "../api.js"
const login = await api.fetchFindLogin()
const { message, user } = login
export const isLogged = () => {
  if (message === "Found") {
    return true
  }
  return false
}
export const toRedirect = () => {
  if (message === "Found") {
    window.location.href = "/user"
  }
}
export const userData = () => {
  if (message === "Found") {
    return user
  }
}
