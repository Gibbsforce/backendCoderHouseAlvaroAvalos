import { PORT } from "../../src/utils/globalConstants.js"
import { strict as assert } from "assert"
import axios from "axios"

// API
const API_URL = `http://localhost:${PORT}/`
const API_PRODUCTS = `${API_URL}api/products`

// Variables for testing
let PRODUCT_ID
const PRODUCT_THUMB =
  "https://e476rzxxeua.exactdn.com/wp-content/uploads/2015/07/test-automation.jpg?strip=all&lossy=1"
const PRODUCT_THUMB_UPDATED =
  "https://i0.wp.com/testautomationresources.com/wp-content/uploads/2018/01/software-testing.jpg?ssl=1"

// Test suite
describe("TEST SUIT for products with axios", () => {
  describe("GET /api/products", () => {
    it("Should return a list or an array of products and return a status 200", async () => {
      const response = await axios.get(API_PRODUCTS)
      assert.deepEqual(response.status, 200)
      assert.deepEqual(Array.isArray(response.data.products), true)
    })
  })
  describe("POST /api/products", () => {
    it("Should create a new product, return the id as an integer or as a string (mongo) and return a status 201", async () => {
      const response = await axios.post(API_PRODUCTS, {
        title: "test",
        description: "test",
        code: "test",
        thumbnail: PRODUCT_THUMB,
        price: 200,
        stock: 50,
      })
      assert.deepEqual(response.status, 201)
      assert.deepEqual(response.data.product.title, "test")
      assert.deepEqual(response.data.product.description, "test")
      assert.deepEqual(response.data.product.code, "test")
      assert.deepEqual(response.data.product.thumbnail, PRODUCT_THUMB)
      assert.deepEqual(response.data.product.price, 200)
      assert.deepEqual(response.data.product.stock, 50)
      assert.deepEqual(
        Number.isInteger(response.data.created) ||
          typeof response.data.created === "string",
        true
      )
      PRODUCT_ID = response.data.created
    })
  })
  describe("GET /api/products/:id", () => {
    it("Should return a product by its id and return a status 200", async () => {
      const response = await axios.get(`${API_PRODUCTS}/${PRODUCT_ID}`)
      assert.deepEqual(response.status, 200)
      assert.deepEqual(response.data.product.title, "test")
      assert.deepEqual(response.data.product.description, "test")
      assert.deepEqual(response.data.product.code, "test")
      assert.deepEqual(response.data.product.thumbnail, PRODUCT_THUMB)
      assert.deepEqual(response.data.product.price, 200)
      assert.deepEqual(response.data.product.stock, 50)
    })
  })
  describe("PUT /api/products/:id", () => {
    it("Should update a product by its id and return a status 200", async () => {
      const response = await axios.put(`${API_PRODUCTS}/${PRODUCT_ID}`, {
        title: "testUpdated",
        description: "testUpdated",
        code: "testUpdated",
        thumbnail: PRODUCT_THUMB_UPDATED,
        price: 150,
        stock: 40,
      })
      assert.deepEqual(response.status, 200)
      assert.deepEqual(response.data.updated.title, "testUpdated")
      assert.deepEqual(response.data.updated.description, "testUpdated")
      assert.deepEqual(response.data.updated.code, "testUpdated")
      assert.deepEqual(response.data.updated.thumbnail, PRODUCT_THUMB_UPDATED)
      assert.deepEqual(response.data.updated.price, 150)
      assert.deepEqual(response.data.updated.stock, 40)
    })
  })
  describe("DELETE /api/products/:id", () => {
    it("Should delete a product by its id and return a status 200", async () => {
      const response = await axios.delete(`${API_PRODUCTS}/${PRODUCT_ID}`)
      assert.deepEqual(response.status, 200)
      assert.deepEqual(
        Number(response.data.id) || String(response.data.id),
        PRODUCT_ID
      )
    })
  })
})
