import api from "./api.js"
const cartContainer = document.querySelector(".cart-container")
const { message, products } = await api.fetchAllProducts()
if (message === "OK") {
    cartContainer.innerHTML = products.map(({ _id, title, description, code, thumbnail, price, stock }, key) => `
    <div class="id-card">
        <div class="title-card">
            <input value="${title}" name="title-${_id}"/>
        </div>
        <div class="thumbnail-card">
            <img class="url-img" src="${thumbnail}" alt="${code}"/>
            <input value="${thumbnail}" name="thumbnail-${_id}"/>
        </div>
        <div class="description-card">
            <input value="${description}" name="description-${_id}"/>
        </div>
        <div class="price-card">
            <b>$<input value="${price}" name="price-${_id}"/></b>
        </div>
        <div class="stock-card">
            <span>Stock:<input value="${stock}" name="stock-${_id}" /></span>
        </div>
        <div class="btn-card">
            <button id="update-${_id}" class="submit-btn">update</button>
            <div class="delete-btn">
                <button id="delete-${_id}">
                    <span class="cart-item-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
    `).join("")
}
products.map(({ _id }) => {
    const deleteBtn = document.getElementById(`delete-${_id}`)
    const updateBtn = document.getElementById(`update-${_id}`)
    deleteBtn.addEventListener("click", async () => {
        const { message } = await api.fetchDeleteProduct(_id)
        if (message === "OK") {
            window.location.reload()
        }
    })
    updateBtn.addEventListener("click", async () => {
        const { message } = await api.fetchUpdateProduct(_id, {
            title: document.querySelector(`input[name="title-${_id}"]`).value,
            description: document.querySelector(`input[name="description-${_id}"]`).value,
            thumbnail: document.querySelector(`input[name="thumbnail-${_id}"]`).value,
            price: document.querySelector(`input[name="price-${_id}"]`).value,
            stock: document.querySelector(`input[name="stock-${_id}"]`).value
        })
        if (message === "OK") {
            window.location.reload()
        }
    })
})