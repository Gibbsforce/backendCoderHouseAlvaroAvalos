import { isLogged, userData } from "./redirects/isLogged.js"
const element = document.querySelector(".user-bar-container")
const isLog = isLogged()
if (isLog) {
    const { name } = userData()
    element.innerHTML = `
        <ul class="nav navbar-nav navbar-right">
            <li><a href="/user"><span class="glyphicon glyphicon-user"></span> ${name}</a></li>
            <button class="submit-btn" onclick='window.location.href = "/api/auth/logout"'>Log Out</button>
        </ul>
    `
} else {
    element.innerHTML = `
        <ul class="nav navbar-nav navbar-right">
            <li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
    `
}