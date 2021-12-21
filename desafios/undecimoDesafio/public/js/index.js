// URL
const API_URL = "http://localhost:8080/";
// Get user data from API
const userDataGet = async () => {
    const user = await fetch(`${API_URL}home`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (user.url === `${API_URL}logged`) return { userData: user.url }
    return await user.json();

}
// Rendering user data on the page
const renderUserData = async () => {
    const { userData } = await userDataGet();
    if (userData === `${API_URL}logged`) {
        window.location.href = `${API_URL}logged`;
    } else {
        const { username, email } = userData;
        const data = document.getElementById("user-data");
        data.innerHTML = `<p>Welcome: ${username}</p>
        <p>This is your email: ${email}</p>`;
    }
}
// Rendering error on the page
try {
    renderUserData();
} catch (error) {
    console.log(error);
}