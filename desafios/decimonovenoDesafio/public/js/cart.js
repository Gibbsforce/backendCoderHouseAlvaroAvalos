import api from "./api.js"

const productosApi = {
    get: async () => {
        return await api.fetchAllProducts()
    }
}

const carritosApi = {
    crearCarrito: async () => {
        return await api.fetchCreateCart()
    },
    getIds: async () => {
        return await api.fetchGetCarts()
    },
    postProd: async (idCarrito, idProd) => {
        return await api.fetchAddProductToCart(idCarrito, idProd)
    },
    getProds: async (idCarrito) => {
        return await api.fetchGetCartById(idCarrito)
    },
    deleteProd: async (idCarrito, idProducto) => {
        return await api.fetchDeleteProductFromCart(idCarrito, idProducto)
    }
}

loadComboProductos()

loadComboCarrito()

document.getElementById('btnAgregarAlCarrito').addEventListener('click', async () => {
    const idCarrito = document.getElementById('comboCarritos').value
    const idProd = document.getElementById('comboProductos').value
    if (!idCarrito && !idProd) {
        return alert('You must choose a cart and a product')
    }
    const prod = await api.fetchProductById(idProd)
    const prods = await carritosApi.getProds(idCarrito)
    const { complete } = prods
    if (complete) return alert("This cart is complete")
    const { product } = prod
    if (idCarrito && idProd) {
        agregarAlCarrito(idCarrito, product)
    } else {
        alert('You must choose a cart and a product')
    }
})

document.getElementById('btnCrearCarrito').addEventListener('click', () => {
    carritosApi.crearCarrito()
        .then(({ cart }) => {
            loadComboCarrito().then(() => {
                const combo = document.getElementById('comboCarritos')
                combo.value = cart
                combo.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById("btnFinalizarCompra").addEventListener("click", async () => {
    const idCarrito = document.getElementById("comboCarritos").value
    if (!idCarrito) return alert("You must choose a cart")
    const { message, error, cart } = await api.fetchCartComplete(idCarrito)
    if (message === "Unauthorized") return alert("Please, login to complete the purchase")
    if (message === "Error") return alert(error)
    if (message === "OK") return alert(`Cart ${cart._id} has been finished, a message to your email and phone has been sent`)
})

document.getElementById('comboCarritos').addEventListener('change', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    actualizarListaCarrito(idCarrito)
})

async function agregarAlCarrito(idCarrito, idProducto) {
    return await carritosApi.postProd(idCarrito, idProducto).then(({ error }) => {
        if (error) return alert(error)
        actualizarListaCarrito(idCarrito)
    })
}

async function actualizarListaCarrito(idCarrito) {
    return await carritosApi.getProds(idCarrito)
        .then(({ products }) => makeHtmlTable(products))
        .then(html => {
            document.getElementById('carrito').innerHTML = html
        })
}

function makeHtmlTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <h2>Products List</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Photo</th>
                </tr>`
        for (const prod of productos) {
            html += `
                    <tr>
                    <td>${prod.title}</td>
                    <td>${prod.quantity}</td>
                    <td>$ ${(prod.price * prod.quantity).toFixed(2)}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td>
                        <div class="delete-btn">
                            <button calss="delete-btn-prod-from-cart" id="delete-${prod._id}" onclick="removeItemFromCart('${prod._id}')">
                                <span class="cart-item-delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    } else {
        html += `<br><h4>No Products</h2>`
    }
    return Promise.resolve(html)
}

function crearOpcionInicial(leyenda) {
    const defaultItem = document.createElement("option")
    defaultItem.value = ''
    defaultItem.text = leyenda
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

async function loadComboProductos() {
    return await productosApi.get()
        .then(productos => {
            const combo = document.getElementById('comboProductos')
            combo.appendChild(crearOpcionInicial('Choose a Product'))
            for (const prod of productos.products) {
                const comboItem = document.createElement("option")
                comboItem.value = prod._id
                comboItem.text = prod.title
                combo.appendChild(comboItem)
            }
        })
}

function vaciarCombo(combo) {
    while (combo.childElementCount > 0) {
        combo.remove(0)
    }
}

async function loadComboCarrito() {
    return await carritosApi.getIds()
        .then(({ cart }) => {
            const combo = document.getElementById('comboCarritos')
            vaciarCombo(combo)
            combo.appendChild(crearOpcionInicial('Choose a Cart'))
            let i = 0
            for (const id of cart) {
                const comboItem = document.createElement("option")
                comboItem.value = id._id
                comboItem.text = `Cart ${++i}`
                combo.appendChild(comboItem)
            }
        })
}

async function removeItemFromCart(idProduct){
    const idCart = document.getElementById("comboCarritos").value
    const { complete } = await api.fetchGetCartById(idCart)
    if (complete) return alert("This cart is complete")
    const { message } = await api.fetchDeleteProductFromCart(idCart, idProduct)
    if (message === "OK") {
        actualizarListaCarrito(idCart)
    }
}

// Global functions
window.removeItemFromCart = removeItemFromCart