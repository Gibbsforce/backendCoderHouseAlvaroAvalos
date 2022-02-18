# Desafio Dieciocho

## 1. Start

```
npm start file
```

`or`

```
npm start mongodb
```

## 2. Testing

### Testing with axios

```
npm run test
```

### Testing with supertest

```
npm run superTest
```

## 3. Responses and Data Base

`Comment: describe("DELETE /api/products/:id"... from test files`

## 4. Suit Test Report

### With axios

```
TEST SUIT for products with axios
    GET /api/products
      ✔ Should return a list or an array of products and return a status 200
    POST /api/products
      ✔ Should create a new product, return the id as an integer or as an array (mongo) and return a status 201
    GET /api/products/:id
      ✔ Should return a product by its id and return a status 200
    PUT /api/products/:id
      ✔ Should update a product by its id and return a status 200
    DELETE /api/products/:id
      ✔ Should delete a product by its id and return a status 200


  5 passing (42ms)
```

### With supertest

```
TEST SUIT for products with supertest
    GET /api/products
      ✔ Should return a list or an array of products and return a status 200
    POST /api/products
      ✔ Should create a new product, return the id as an integer or as an array (mongo) and return a status 201
    GET /api/products/:id
      ✔ Should return a product by its id and return a status 200
    PUT /api/products/:id
      ✔ Should update a product by its id and return a status 200
    DELETE /api/products/:id
      ✔ Should delete a product by its id and return a status 200


  5 passing (39ms)
```
