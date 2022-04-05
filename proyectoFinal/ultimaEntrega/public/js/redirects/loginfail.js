import api from "../api.js"
const redirectIfFail = async () => {
  try {
    const getError = await api.fetchLoginFail()
    const { message, description } = getError
    if (message === "OK" && description === "User logged in") {
      window.location.href = "/user"
    }
    if (
      message === "Unauthorized" &&
      description === "Invalid username or password"
    ) {
      window.location.href = "/login"
    }
  } catch (error) {
    console.log(error)
  }
}
redirectIfFail()
