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
    if (cart.length === 0) {
        await createCart();
        location.reload();
    } else {
        return await cart[0]._id;
    }
}
checkIfCartExists();
const getItemsCart = async () => {
    const idCart = await checkIfCartExists();
    const url = `${API_URL}api/cart/${idCart}/products`;
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
    const deleteProductBy = id => `deleteProductFromCart('${id}')`;
    const containerHead =
        `
            <div class="cart-products">
        `;
    const content = await products.map(({ title, description, code, thumbnail, price, stock, _id }) => {
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
                                <button onclick="${deleteProductBy(_id)}">Delete</button>
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
    const idCart = await checkIfCartExists();
    const url = `${API_URL}api/cart/${idCart}/products/${productId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    await response.json();
    window.location.href = `${API_URL}cart`;
}