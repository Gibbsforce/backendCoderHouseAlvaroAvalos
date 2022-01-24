const PROTOCOL = window.location.protocol;
const HOST = window.location.hostname;
const API_URL = `${PROTOCOL}//${HOST}/`;
const getTheCart = async () => {
    const url = `${API_URL}api/cart`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}
const createCart = async () => {
    const url = `${API_URL}api/cart`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}
const checkIfCartExists = async () => {
    const { cart } = await getTheCart();
    if (cart === null) {
        await createCart();
        location.reload();
    } else if (cart.length === 0) {
        await createCart();
        location.reload();
    } else {
        return await cart[0]._id;
    }
}

checkIfCartExists();

const get = async () => {
    const url = `${API_URL}api/products`;
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
    const addToCart = id => `cartPost('${id}')`;
    const containerHead =
        `
            <div class="card-container">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, _id }) => {
        return (
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
                        <button onclick="${addToCart(_id)}">Add to Cart</button>
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
    const data = products.find(({ _id }) => _id == product);
    const idCart = await checkIfCartExists();
    const url = `${API_URL}api/cart/${idCart}/products`;
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
    return window.location.href = `${API_URL}cart`;
}

const deleteProductFromCart = async (productId) => {
    const url = `${API_URL}api/cart/1/products/${productId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await response.json();
    window.location.href = `${API_URL}cart`;
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
    const url = `${API_URL}api/products`;
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        thumbnail: document.getElementById("thumbnail").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value
    }
    await createProduct(url, data);
    window.location.href = `${API_URL}products`;
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
    const editingProduct = id => `editProduct('${id}')`;
    const deletingProduct = id => `deleteProduct('${id}')`;
    const containerHead =
        `
            <div class="card-container">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, _id }) => {
        return (
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
                        <button onclick="${editingProduct(_id)}">Edit Product</button>
                    </div>
                    <div class="btn-card">
                        <button onclick="${deletingProduct(_id)}">Delete Product</button>
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
    const url = `${API_URL}api/products/${product}`;
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
    return window.location.href = `${API_URL}edit`;
}

const deleteProduct = async (productId) => {
    const url = `${API_URL}api/products/${productId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await response.json();
    window.location.href = `${API_URL}edit`;
}