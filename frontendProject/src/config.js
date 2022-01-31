// const API_URL = `${window.location.protocol}//${window.location.host}/api/`
const API_URL = `${window.location.protocol}//${window.location.hostname}:8080/api/`
// Products
const PRODUCTS_URL = `${API_URL}products`
// Products-test
const PRODUCTS_TEST_URL = `${API_URL}products-test`
// Cart
const CART_URL = `${API_URL}cart`
// Authentication
const AUTH_URL = `${API_URL}auth`
// Exporting
export {
    PRODUCTS_URL,
    PRODUCTS_TEST_URL,
    CART_URL,
    AUTH_URL
}
