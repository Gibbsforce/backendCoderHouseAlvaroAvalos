const get = async () => {
    const url = "http://localhost:8080/api/products-test";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

const renderGet = async () => {
    const products = await get();
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
                    <!--<div class="btn-card">
                        <button onclick="${addToCart(_id)}">Add to Cart</button>
                    </div>-->
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