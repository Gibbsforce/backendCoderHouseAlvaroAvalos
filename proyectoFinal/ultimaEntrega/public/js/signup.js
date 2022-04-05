import { toRedirect } from "./redirects/isLogged.js"

toRedirect()

import { isMobilePhone, locales } from "./utils/isMobilePhone.js"

const localesOrdered = locales.sort((a, b) => {
  let textA = a.substring(3, 5).toUpperCase()
  let textB = b.substring(3, 5).toUpperCase()
  return textA < textB ? -1 : textA > textB ? 1 : 0
})

const selectThePhone = document.getElementById("international-prefixes")

selectThePhone.innerHTML = localesOrdered
  .map(
    (locale) => `<option value="${locale}">${locale.substring(3, 5)}</option>`
  )
  .join("")

document.querySelector(".submit-btn").addEventListener("click", () => {
  const inputPhone = document.getElementById("phone")
  const inputPassword = document.getElementById("password")
  const inputConfirmPassword = document.getElementById("confirm-password")
  if (!isMobilePhone(`+${inputPhone.value}`, false)) {
    inputPhone.setCustomValidity(
      "Please enter a valid phone number, e.g. +546546546546"
    )
  } else if (inputPassword.value !== inputConfirmPassword.value) {
    inputConfirmPassword.setCustomValidity("Passwords don't match")
  } else {
    inputPhone.setCustomValidity("")
    inputPassword.setCustomValidity("")
    inputConfirmPassword.setCustomValidity("")
  }
})
