import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import {
    getProducts,
    getProductById,
    getProductsLocalPrice,
    createProduct,
    updateProductById,
    deleteProductById,
    deleteProducts
} from "./productController.js"

const productSchema = buildSchema(`
    type getProducts {
        message: String
        products: [Product]
        error: String
    }
    type getProductById {
        message: String
        product: Product
        error: String
    }
    type getProductsLocalPrice {
        message: String
        product: [ProductLocalPrice]
        error: String
    }
    type createProduct {
        message: String
        created: String
        product: Product
        error: String
    }
    type updateProductById {
        message: String
        updated: Product
        error: String
    }
    type deleteProductById {
        message: String
        deleted: Boolean
        id: String
        error: String
    }
    type deleteProducts {
        message: String
        deletedAll: Boolean
        error: String
    }
    input ProductInput {
        title: String!
        price: Float!
        stock: Int!
        description: String!
        thumbnail: String!
        code: String!
    }
    type Product {
        _id: ID!
        title: String!
        price: Float!
        stock: Int!
        description: String!
        thumbnail: String!
        code: String!
        timestamp: String!
    }
    type ProductLocalPrice {
        price: Float!
        stock: Int!
        localPrice: Float!
    }
    type Query {
        getProducts: [getProducts]
        getProductById(id: ID!): [getProductById]
        getProductsLocalPrice: [getProductsLocalPrice]
    }
    type Mutation {
        createProduct(data: ProductInput): [createProduct]
        updateProductById(id: ID!, data: ProductInput): [updateProductById]
        deleteProductById(id: ID!): [deleteProductById]
        deleteProducts: [deleteProducts]
    }
`)

const productGraphQL = graphqlHTTP({
    schema: productSchema,
    rootValue: {
        getProducts,
        getProductById,
        getProductsLocalPrice,
        createProduct,
        updateProductById,
        deleteProductById,
        deleteProducts
    },
    graphiql: true
})

export default productGraphQL