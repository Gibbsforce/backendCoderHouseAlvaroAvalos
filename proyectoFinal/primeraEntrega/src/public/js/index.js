const get = async () => {
    const url = "http://localhost:8080/api/products";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

const renderGet = async () => {
    const { products } = await get();
    // console.log(products);
    const addToCart = id => `cartPost(${id})`;
    const containerHead =
        `
            <div class="card-container">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, id }) => {
        return(
            `
                <div id="${code}" class="id-card">
                    <div class="title-card">
                        <span>${title}</span>
                    </div>
                    <div class="thumbnail-card">
                        <img class="url-img" src="${thumbnail}" alt="${code}">
                    </div>
                    <div class="description-card">
                        <span>${description}</span>
                    </div>
                    <div class="price-card">
                        <b>$ ${price}</b>
                    </div>
                    <div class="stock-card">
                        <span>Stock: ${stock}</span>
                    </div>
                    <div class="btn-card">
                        <button onclick="${addToCart(id)}">Add to Cart</button>
                    </div>
                </div>
            `
        );
    }).join("");
    const containerFoot =
        `
            </div>
        `;
    const container = `${containerHead}${content}${containerFoot}`;
    // console.log(container);
    const productsContainer = document.querySelector(".products-container");
    if (productsContainer !== null) return productsContainer.innerHTML = container;
    else return "";
}

renderGet();

const cartPost = async (product) => {
    const { products } = await get();
    const data = products.find(({ id }) => id === product);
    const url = "http://localhost:8080/api/cart/1/products";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    // console.log(response.status);
    if (response.status === 204) return alert(`Item ${product} ya ha sido agregado, ver carrito`);
    await response.json();
    return window.location.href = "http://localhost:8080/cart";
}

const getItemsCart = async () => {
    const url = "http://localhost:8080/api/cart/1/products";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

const renderCart = async () => {
    const { products } = await getItemsCart();
    let count = 1;
    let total = 0;
    const deleteProductBy = id => `deleteProductFromCart(${id})`;
    const containerHead =
        `
            <div class="cart-products">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, id }) => {
        total += price * count;
        return (
            `
                <div id=${code} class="cart-product">
                    <div class="column">
                        <div class="thumbnail-cart">
                            <img class="url-img" src="${thumbnail}" alt="${code}" />
                        </div>
                    </div>
                    <div class="column">
                        <div class="dsc-cart">
                            <div class="title-cart">
                                <span>${title}</span>
                            </div>
                            <div class="description-cart">
                                <span>${description}</span>
                            </div>
                            <div class="price-cart">
                                <b>$${price}</b>
                            </div>
                            <div class="quantity-cart">
                                <span>Cantidad: ${count}</span>
                            </div>
                        </div>
                        <div class="btns">
                            <!--<div class="add-cart">
                                <button onclick="" class="add-cart-e">+</button>
                            </div>
                            <div class="remove-cart" onclick="">
                                <button>-</button>
                            </div>-->
                            <div class="delete-cart">
                                <button onclick="${deleteProductBy(id)}">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
    }).join("");
    const containerFoot =
        `
            </div>
            <div class="total-cart">
                Total: $${total}
            </div>
        `;
    const container = `${containerHead}${content}${containerFoot}`;
    // console.log(container);
    const cartContainer = document.querySelector(".cart-container");
    if (cartContainer !== null) return cartContainer.innerHTML = container;
    else return "";
}

renderCart();

const deleteProductFromCart = async (productId) => {
    const url = `http://localhost:8080/api/cart/1/products/${productId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await response.json();
    window.location.href = "http://localhost:8080/cart";
}

const createProduct = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

const addProduct = async event => {
    event.preventDefault();
    const url = "http://localhost:8080/api/products";
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        thumbnail: document.getElementById("thumbnail").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value
    }
    await createProduct(url, data);
    window.location.href = "http://localhost:8080/products";
}
const addingProduct = () => {
    const formData = document.getElementById("admin");
    if (formData !== null) formData.addEventListener("submit", addProduct);
}

addingProduct();

const editingProduct = async () => {
    const { products } = await get();
    // console.log(products);
    // const gettingProductById = id => `renderGetId(${id})`;
    const editingProduct = id => `editProduct(${id})`;
    const deletingProduct = id => `deleteProduct(${id})`;
    const containerHead =
        `
            <div class="card-container">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, id }) => {
        return(
            `
                <div id="${code}" class="id-card">
                    <div class="title-card">
                        <span>${title}</span>
                    </div>
                    <div class="thumbnail-card">
                        <img class="url-img" src="${thumbnail}" alt="${code}">
                    </div>
                    <div class="description-card">
                        <span>${description}</span>
                    </div>
                    <div class="price-card">
                        <b>$ ${price}</b>
                    </div>
                    <div class="stock-card">
                        <span>Stock: ${stock}</span>
                    </div>
                    <div class="btn-card">
                        <button onclick="${editingProduct(id)}">Edit Product</button>
                    </div>
                    <div class="btn-card">
                        <button onclick="${deletingProduct(id)}">Delete Product</button>
                    </div>
                </div>
            `
        );
    }).join("");
    const containerFoot =
        `
            </div>
        `;
    const container = `${containerHead}${content}${containerFoot}`;
    // console.log(container);
    const productsContainer = document.querySelector(".edit-products-container");
    if (productsContainer !== null) return productsContainer.innerHTML = container;
    else return "";
}

editingProduct();

const editProduct = async (product) => {
    const data = {
        title: document.getElementById("edit-title").value,
        description: document.getElementById("edit-description").value,
        code: document.getElementById("edit-code").value,
        thumbnail: document.getElementById("edit-thumbnail").value,
        price: document.getElementById("edit-price").value,
        stock: document.getElementById("edit-stock").value
    }
    const url = `http://localhost:8080/api/products/${product}`;
    if (data.title === "") return alert("Please, fill title");
    if (data.description === "") return alert("Please, fill description");
    if (data.code === "") return alert("Please, fill code");
    if (data.thumbnail === "") return alert("Please, fill thumbnail");
    if (data.price === "") return alert("Please, fill price");
    if (data.stock === "") return alert("Please, fill stock");
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    await response.json();
    return window.location.href = "http://localhost:8080/edit";
}

const deleteProduct = async (productId) => {
    const url = `http://localhost:8080/api/products/${productId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await response.json();
    window.location.href = "http://localhost:8080/edit";
}