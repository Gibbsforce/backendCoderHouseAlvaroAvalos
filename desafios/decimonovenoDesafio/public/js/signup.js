import { toRedirect } from "./redirects/isLogged.js"
toRedirect()
import { isMobilePhone, locales } from "./utils/isMobilePhone.js"

const localesOrdered = locales.sort((a, b) => {
    let textA = a.substring(3,5).toUpperCase()
    let textB = b.substring(3,5).toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
})

const selectThePhone = document.getElementById("international-prefixes")
selectThePhone.innerHTML = localesOrdered.map((locale) => `<option value="${locale}">${locale.substring(3,5)}</option>`).join("")

document.querySelector(".submit-btn").addEventListener("click", () => {
    const inputPhone = document.getElementById("phone")
    if (!isMobilePhone(`+${inputPhone.value}`, false)) {
        alert("Please enter a valid phone number")
    }
})