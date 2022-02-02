import { toRedirect } from "./redirects/isLogged.js"
toRedirect()
import { isMobilePhone } from "./utils/isMobilePhone.js"
document.querySelector(".submit-btn").addEventListener("click", () => {
    const inputPhone = document.getElementById("phone")
    if (!isMobilePhone(`+${inputPhone.value}`, false)) {
        alert("Please enter a valid phone number")
    }
})