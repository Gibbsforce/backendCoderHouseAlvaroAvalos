import api from "./api.js"

const cartContainer = document.querySelector(".cart-container")
const { message, products } = await api.fetchAllProducts()
const productLocalPrice = await api.fetchProducsLocalPrice()
const categoryList = document.querySelector(".category-list")

if (message === "OK") {
  let html = ``

  const categories = products.reduce((acc, { category }) => {
    if (!acc.includes(category)) {
      acc.push(category)
    }
    return acc
  }, [])

  let allProducts = products
    .map(
      (
        { _id, title, description, code, thumbnail, price, stock, category },
        key
      ) => {
        return `
          <div class="id-card" data-toggle="tooltip" title="Local Price: $ ${productLocalPrice.product[
            key
          ].localPrice.toFixed(2)}">
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
              <div class="category-card">
                <select name="category-${_id}">
                  <option value="${category}">${category}</option>
                  ${categories.map((cat) => {
                    if (cat && !cat.includes(category)) {
                      return `<option value="${cat}">${cat}</option>`
                    }
                  })}
                </select>
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
      `
      }
    )
    .join("")
  html += allProducts
  cartContainer.innerHTML = html

  categoryList.innerHTML = `
    <div class="category-card">
      <button id="reload-btn" class="submit-btn">all</button>
      <select class="cat">
        <option selected disabled>Category</option>
        ${categories
          .map((cat) => `<option value="${cat}">${cat}</option>`)
          .join("")}
      </select>
    </div>`

  const categorySelect = document.querySelector(".cat")
  categorySelect.addEventListener("change", async () => {
    const { message, products } = await api.fetchProductByCategory(
      categorySelect.value
    )
    if (message === "OK") {
      const productsByCategory = products
        .map(
          (
            {
              _id,
              title,
              description,
              code,
              thumbnail,
              price,
              stock,
              category,
            },
            key
          ) => {
            return `
              <div class="id-card" data-toggle="tooltip" title="Local Price: $ ${productLocalPrice.product[
                key
              ].localPrice.toFixed(2)}">
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
                  <div class="category-card">
                    <select name="category-${_id}">
                      <option value="${category}">${category}</option>
                      ${categories.map((cat) => {
                        if (!cat.includes(category)) {
                          return `<option value="${cat}">${cat}</option>`
                        }
                      })}
                    </select>
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
          `
          }
        )
        .join("")
      html = ``
      html += productsByCategory
      cartContainer.innerHTML = html
    }
    products.map(({ _id, code }) => {
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
          description: document.querySelector(
            `input[name="description-${_id}"]`
          ).value,
          thumbnail: document.querySelector(`input[name="thumbnail-${_id}"]`)
            .value,
          price: Number(
            document.querySelector(`input[name="price-${_id}"]`).value
          ),
          stock: Number(
            document.querySelector(`input[name="stock-${_id}"]`).value
          ),
          code: code,
          category: document.querySelector(`select[name="category-${_id}"]`)
            .value,
        })
        if (message === "OK") {
          window.location.reload()
        }
      })
    })
  })
}
products.map(({ _id, code }) => {
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
      description: document.querySelector(`input[name="description-${_id}"]`)
        .value,
      thumbnail: document.querySelector(`input[name="thumbnail-${_id}"]`).value,
      price: Number(document.querySelector(`input[name="price-${_id}"]`).value),
      stock: Number(document.querySelector(`input[name="stock-${_id}"]`).value),
      code: code,
      category: document.querySelector(`select[name="category-${_id}"]`).value,
    })
    if (message === "OK") {
      window.location.reload()
    }
  })
})

document.getElementById("reload-btn").addEventListener("click", () => {
  window.location.reload()
})
