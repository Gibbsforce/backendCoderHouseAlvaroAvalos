# Desafio Diecinueve

## 1. Start

`recomended:`

```
npm start file
```

`or`

```
npm start mongodb
```

## 2. GraphQL CRUD for PRODUCTS: Controller and routes

`Files of:`

```
/src/GraphQL/productController.js
```

```
/src/GraphQL/productGraphQL.js
```

## 3. Frontend

`File:`

```
/public/js/api.js
```

`URL by default /products`

## 4. GraphiQL

### Getting all products

```
{
  getProducts {
    message
    error
    products {
      _id
      title
      price
      stock
      description
      thumbnail
      code
      timestamp
    }
  }
}
```

### Getting local price products (DTOs)

```
{
  getProductsLocalPrice {
    message
    error
    products {
      price
      stock
      localPrice
    }
  }
}
```

### Getting a product by its id

```
{
  getProductById(id: "5") {
    message
    product {
      _id
      title
      price
      stock
      description
      thumbnail
      code
      timestamp
    }
    error
  }
}
```

### Creating a product

```
mutation {
  createProduct(data: {
    title: "Test"
    price: 99.9
    stock: 50
    description: "A Test"
    thumbnail: "url"
    code: "test"
  }) {
    message
    created
    product {
      _id
      title
      price
      stock
      description
      thumbnail
      code
      timestamp
    }
    error
  }
}
```

### Updating a product by its id

```
mutation {
  updateProductById(id: "7", data: {
    title: "Test Updated"
    price: 199.9
    stock: 5
    description: "A Test Updated"
    thumbnail: "https://cdn0.iconfinder.com/data/icons/devices-42/512/Normal_LCD-512.png"
    code: "testupdated"
  }) {
    message
    updated {
      _id
      title
      price
      stock
      description
      thumbnail
      code
      timestamp
    }
    error
  }
}
```

### Deleting a product by its id

```
mutation {
  deleteProductById(id: "7") {
    message
    deleted
    id
    error
  }
}
```

### Deleting all products

```
mutation {
  deleteProducts {
    message
    deletedAll
    error
  }
}
```

## 5. Extra

### Docs (GraphQL not supported - PRODUCTS)

`URL by default /docs`

### For deactivate GraphQL and make all project req/res http

`1. Comment line 4 and uncomment line 3 from the file:`

```
src/routers/index.js
```

`2. Set const GraphQL = false (Line 30) from the file:`

```
/public/js/api.js
```
