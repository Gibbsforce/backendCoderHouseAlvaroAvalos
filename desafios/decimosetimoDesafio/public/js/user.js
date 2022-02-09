import { userData } from "./redirects/isLogged.js"
const user = await userData()
if (!user) window.location.href = "/login"
const userProfile = document.querySelector(".user-profile")
userProfile.innerHTML = `
    <div class="user-profile-port">
        <h1>Welcome <small>${user.name}</small></h1>
        <img src="${user.avatar}" alt="${user.name}"/>
    </div>
    <div class="user-profile-content">
        <h2>Here your data:</h2>
        <h2><span class="label label-default">Name</span></h2>
        <span>${user.name}</span>
        <h2><span class="label label-default">Last Name</span></h2>
        <span>${user.lastname}</span>
        <h2><span class="label label-default">Email</span></h2>
        <span>${user.username}</span>
        <h2><span class="label label-default">Address</span></h2>
        <span>${user.address}</span>
        <h2><span class="label label-default">Phone</span></h2>
        <span>+${user.phone}</span>
        <h2><span class="label label-default">Age</span></h2>
        <span>${user.age}</span>
    </div>
`
