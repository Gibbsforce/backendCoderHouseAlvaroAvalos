// Getting the endpoints
import {
    PRODUCTS_URL,
    PRODUCTS_TEST_URL,
    CART_URL,
    AUTH_URL
} from "./config.js"
// Default config POST
const defaultConfigPost = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}
// Default config PUT
const defaultConfigPut = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    }
}
// Default config DELETE
const defaultConfigDelete = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
}
// GraphQL
const graphQL = true
import { stringifyGQL } from "./utils/stringifyGQL.js"
// Setting the API
const apiSettings = {
    fetchAllProductsTest: async () => {
        const endpoint = PRODUCTS_TEST_URL
        return await (await fetch(endpoint)).json()
    },
    fetchAllProducts: async () => {
        const endpoint = PRODUCTS_URL
        if(graphQL === true) {
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: "{ getProducts { message error products { _id title description code thumbnail price stock timestamp } } }",
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { getProducts } = await data
            const result = await getProducts[0]
            return await result
        } else {
            return await (await fetch(endpoint)).json()
        }
    },
    fetchProductById: async (id) => {
        const endpoint = `${PRODUCTS_URL}/${id}`
        if (graphQL === true) {
            const endpoint = `${PRODUCTS_URL}`
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: `{ getProductById(id: ${JSON.stringify(id)}) { message error product { _id title description code thumbnail price stock timestamp } } }`
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { getProductById } = await data
            const result = await getProductById[0]
            return await result
        } else {
            return await (await fetch(endpoint)).json()
        }
    },
    fetchProducsLocalPrice: async () => {
        const endpoint = `${PRODUCTS_URL}/localprice/products`
        if(graphQL === true) {
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: "{ getProductsLocalPrice { message error product { price stock localPrice } } }",
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { getProductsLocalPrice } = await data
            const result = await getProductsLocalPrice[0]
            return await result
        } else {
            return await (await fetch(endpoint)).json()
        }
    },
    fetchCreateProduct: async (product) => {
        const endpoint = PRODUCTS_URL
        const config = {
            ...defaultConfigPost,
            body: JSON.stringify(product)
        }
        if (graphQL === true) {
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: `mutation { createProduct(data: ${stringifyGQL(product)}) { message created error product { _id title description code thumbnail price stock timestamp } } }`
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { createProduct } = await data
            const result = await createProduct[0]
            return await result
        } else {
            return await (await fetch(endpoint, config)).json()
        }
    },
    fetchUpdateProduct: async (id, product) => {
        const endpoint = `${PRODUCTS_URL}/${id}`
        const config = {
            ...defaultConfigPut,
            body: JSON.stringify(product)
        }
        if (graphQL === true) {
            const endpoint = `${PRODUCTS_URL}`
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: `mutation { updateProductById(id: ${JSON.stringify(id)}, data: ${stringifyGQL(product)}) { message error updated { _id title description code thumbnail price stock timestamp } } }`
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { updateProductById } = await data
            const result = await updateProductById[0]
            return result
        } else {
            return await (await fetch(endpoint, config)).json()
        }
    },
    fetchDeleteProduct: async (id) => {
        const endpoint = `${PRODUCTS_URL}/${id}`
        const config = {
            ...defaultConfigDelete
        }
        if (graphQL === true) {
            const endpoint = `${PRODUCTS_URL}`
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: `mutation { deleteProductById(id: ${JSON.stringify(id)}) { message error deleted id } }`
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { deleteProductById } = await data
            const result = await deleteProductById[0]
            return result
        } else {
            return await (await fetch(endpoint, config)).json()
        }
    },
    fetchDeleteAllProducts: async () => {
        const endpoint = PRODUCTS_URL
        const config = {
            ...defaultConfigDelete
        }
        if (graphQL === true) {
            const config = {
                ...defaultConfigPost,
                body: JSON.stringify({
                    query: `mutation { deleteProducts { message error deleteAll } }`
                })
            }
            const { data } = await (await fetch(endpoint, config)).json()
            const { deleteProducts } = await data
            const result = await deleteProducts[0]
            return result
        } else {
            return await (await fetch(endpoint, config)).json()
        }
    },
    fetchCreateCart: async (cart) => {
        const endpoint = CART_URL
        const config = {
            ...defaultConfigPost,
            body: JSON.stringify(cart)
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchDeleteCart: async (id) => {
        const endpoint = `${CART_URL}/${id}`
        const config = {
            ...defaultConfigDelete
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchGetCarts: async () => {
        const endpoint = CART_URL
        return await (await fetch(endpoint)).json()
    },
    fetchGetCartById: async (id) => {
        const endpoint = `${CART_URL}/${id}/products`
        return await (await fetch(endpoint)).json()
    },
    fetchAddProductToCart: async (id, product) => {
        const endpoint = `${CART_URL}/${id}/products`
        const config = {
            ...defaultConfigPost,
            body: JSON.stringify(product)
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchDeleteProductFromCart: async (id, productId) => {
        const endpoint = `${CART_URL}/${id}/products/${productId}`
        const config = {
            ...defaultConfigDelete
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchCartComplete: async (id) => {
        const endpoint = `${CART_URL}/${id}/complete`
        const config = {
            ...defaultConfigPost
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchFindLogin: async () => {
        const endpoint = `${AUTH_URL}/login`
        return await (await fetch(endpoint)).json()
    },
    fetchLogOut: async () => {
        const endpoint = `${AUTH_URL}/logout`
        return await (await fetch(endpoint)).json()
    },
    fetchLoginFail: async () => {
        const endpoint = `${AUTH_URL}/loginfail`
        return await (await fetch(endpoint)).json()
    },
    fetchSignUpFail: async () => {
        const endpoint = `${AUTH_URL}/signupfail`
        return await (await fetch(endpoint)).json()
    },
    fetchLogin: async (user) => {
        const endpoint = `${AUTH_URL}/local/login`
        const config = {
            ...defaultConfigPost,
            body: JSON.stringify(user)
        }
        return await (await fetch(endpoint, config)).json()
    },
    fetchSignUp: async (user) => {
        const endpoint = `${AUTH_URL}/local/signup`
        const config = {
            method: "POST",
            body: user
        }
        return await (await fetch(endpoint, config)).json()
    }
}
export default apiSettings