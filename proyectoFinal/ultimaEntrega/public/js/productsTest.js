import api from "./api.js"
const { message, products } = await api.fetchAllProductsTest()
const cartContainer = document.querySelector(".cart-container")
if (message === "OK") {
  cartContainer.innerHTML = products
    .map(
      ({ _id, title, description, code, thumbnail, price, stock }, key) => `
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
        </div>
    `
    )
    .join("")
}
