const { search } = window.location;
const query = new URLSearchParams(search);
const theName = query.get("name");
const home = document.querySelector(".home");
const tpl = document.createDocumentFragment();
const h2 = document.createElement("h2");
const btn = document.createElement("button");
if (theName) {
    h2.appendChild(document.createTextNode(`Welcome, ${theName}`))
    btn.appendChild(document.createTextNode("Logout"));
    btn.addEventListener("click", () => {
        window.location.href = "/logout";
    });
} else {
    h2.appendChild(document.createTextNode("Welcome"));
    btn.appendChild(document.createTextNode("Login"));
    btn.addEventListener("click", () => {
        window.location.href = "/login";
    });
}
tpl.appendChild(h2);
tpl.appendChild(btn);
home.appendChild(tpl);