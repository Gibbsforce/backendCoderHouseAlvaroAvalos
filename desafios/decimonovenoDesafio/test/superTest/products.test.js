import { PORT } from "../../src/utils/globalConstants.js"
import supertest from "supertest"
import { expect } from "chai"

// API
const API_URL = `http://localhost:${PORT}/`
const API_PRODUCTS = `${API_URL}api/products`

// Request
const request = supertest(API_PRODUCTS)

// Variables for testing
let PRODUCT_ID
const PRODUCT_THUMB = "https://e476rzxxeua.exactdn.com/wp-content/uploads/2015/07/test-automation.jpg?strip=all&lossy=1"
const PRODUCT_THUMB_UPDATED = "https://i0.wp.com/testautomationresources.com/wp-content/uploads/2018/01/software-testing.jpg?ssl=1"

// Test suite
describe("TEST SUIT for products with supertest", () => {
    describe("GET /api/products", () => {
        it("Should return a list or an array of products and return a status 200", async () => {
            const response = await request.get("/")
            expect(response.status).to.be.equal(200)
            expect(Array.isArray(response.body.products)).to.be.equal(true)
        })
    })
    describe("POST /api/products", () => {
        it("Should create a new product, return the id as an integer or as a string (mongo) and return a status 201", async () => {
            const response = await request.post("/").send({
                title: "test",
                description: "test",
                code: "test",
                thumbnail: PRODUCT_THUMB,
                price: 200,
                stock: 50
            })
            expect(response.status).to.be.equal(201)
            expect(response.body.product.title).to.be.equal("test")
            expect(response.body.product.description).to.be.equal("test")
            expect(response.body.product.code).to.be.equal("test")
            expect(response.body.product.thumbnail).to.be.equal(PRODUCT_THUMB)
            expect(response.body.product.price).to.be.equal(200)
            expect(response.body.product.stock).to.be.equal(50)
            expect(typeof String(response.body.created)).to.be.equal("string")
            PRODUCT_ID = response.body.created
        })
    })
    describe("GET /api/products/:id", () => {
        it("Should return a product by its id and return a status 200", async () => {
            const response = await request.get(`/${PRODUCT_ID}`)
            expect(response.status).to.be.equal(200)
            expect(response.body.product.title).to.be.equal("test")
            expect(response.body.product.description).to.be.equal("test")
            expect(response.body.product.code).to.be.equal("test")
            expect(response.body.product.thumbnail).to.be.equal(PRODUCT_THUMB)
            expect(response.body.product.price).to.be.equal(200)
            expect(response.body.product.stock).to.be.equal(50)
        })
    })
    describe("PUT /api/products/:id", () => {
        it("Should update a product by its id and return a status 200", async () => {
            const response = await request.put(`/${PRODUCT_ID}`).send({
                title: "testUpdated",
                description: "testUpdated",
                code: "testUpdated",
                thumbnail: PRODUCT_THUMB_UPDATED,
                price: 150,
                stock: 40
            })
            expect(response.status).to.be.equal(200)
            expect(response.body.updated.title).to.be.equal("testUpdated")
            expect(response.body.updated.description).to.be.equal("testUpdated")
            expect(response.body.updated.code).to.be.equal("testUpdated")
            expect(response.body.updated.thumbnail).to.be.equal(PRODUCT_THUMB_UPDATED)
            expect(response.body.updated.price).to.be.equal(150)
            expect(response.body.updated.stock).to.be.equal(40)
        })
    })
    describe("DELETE /api/products/:id", () => {
        it("Should delete a product by its id and return a status 200", async () => {
            const response = await request.delete(`/${PRODUCT_ID}`)
            expect(response.status).to.be.equal(200)
            expect(response.body.id).to.be.equal(String(PRODUCT_ID))
        })
    })
})