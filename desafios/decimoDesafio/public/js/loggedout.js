const { search } = window.location;
const query = new URLSearchParams(search);
const theName = query.get("name");
if (!theName) window.location.href = "./login";
let count = 3;
document.querySelector(".loggedout").innerHTML = `Goodbye ${theName}. You will be redirected to the login page in ${count} seconds`;
let interval = setInterval(() => {
    count--;
    if (count === 0) {
        clearInterval(interval);
        window.location.href = "/login";
    }
    document.querySelector(".loggedout").innerHTML = `Goodbye ${theName}. You will be redirected to the login page in ${count} seconds`;
}, 1000);