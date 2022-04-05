import api from "../api.js"
const redirectIfFail = async () => {
  try {
    const getError = await api.fetchSignUpFail()
    const { message, description } = getError
    if (message === "OK" && description === "User logged in") {
      window.location.href = "/user"
    }
    if (message === "Unauthorized" && description === "Fail") {
      window.location.href = "/signup"
    }
  } catch (error) {
    console.log(error)
  }
}
redirectIfFail()
