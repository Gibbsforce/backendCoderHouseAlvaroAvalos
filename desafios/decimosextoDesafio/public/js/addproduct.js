import api from "./api.js"
const addProduct = document.querySelector(".add-product")
addProduct.addEventListener("submit", async (e) => {
    e.preventDefault()
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        thumbnail: document.getElementById("thumb").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value
    }
    const { message } = await api.fetchCreateProduct(product)
    if (message === "OK") {
        window.location.href = "/products"
    }
})