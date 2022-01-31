import { useState, useEffect } from "react"
// API
import API from "../../API"
// Components
import Spinner from "../../components/Spinner"
import Button from "../../components/Button"
// Styles
import { Wrapper, Content } from "./Products.styles"
const Products = () => {
    const [products, setProducts] = useState(Array)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(Boolean)
    const [loadingUpdate, setLoadingUpdate] = useState(Boolean)
    const [updateMessage, setUpdateMessage] = useState(Array)

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setError(false)
                const allProducts = await API.fetchAllProducts()
                const { message, products } = allProducts
                if (message === "Error") {
                    setLoading(false)
                    return setError(true)
                }
                if (message === "OK") {
                    setLoading(false)
                    return setProducts(products)
                }
            } catch (error) {
                setError(true)
            }
        }
        fetchAllProducts()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateMessage("")
        products.map((product, key) => {
            if (name === `title-${key}`) {
                product.title = value
                setProducts([...products])
            }
            if (name === `description-${key}`) {
                product.description = value
                setProducts([...products])
            }
            if (name === `code-${key}`) {
                product.code = value
                setProducts([...products])
            }
            if (name === `thumbnail-${key}`) {
                product.thumbnail = value
                setProducts([...products])
            }
            if (name === `price-${key}`) {
                product.price = value
                setProducts([...products])
            }
            if (name === `stock-${key}`) {
                product.stock = value
                setProducts([...products])
            }
            return setProducts([...products])
        })
    }

    const handleSubmit = async (id) => {
        try {
            setLoadingUpdate(true)
            const toUpdate = products.find(({ _id }) => _id === id)
            const updateProduct = await API.fetchUpdateProduct(id, toUpdate)
            const { message, updated, error } = updateProduct
            setLoadingUpdate(false)
            if (message === "Error") {
                return setUpdateMessage(error)
            }
            if (message === "OK") {
                setUpdateMessage(`Product ${updated._id} updated successfully`)
            }
        } catch (error) {
            setLoadingUpdate(false)
            setUpdateMessage(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoadingUpdate(true)
            const toDelete = products.find(({ _id }) => _id === id)
            const deleteProduct = await API.fetchDeleteProduct(id)
            const { message, error } = deleteProduct
            setLoadingUpdate(false)
            if (message === "Error") {
                return setUpdateMessage(error)
            }
            if (message === "OK") {
                setProducts(prev => prev.filter(({ _id }) => _id !== toDelete._id))
                setUpdateMessage(`Product ${toDelete._id} deleted successfully`)
            }
        } catch (error) {
            setLoadingUpdate(false)
            setUpdateMessage(error)
        }
    }

    if (error) return <div>Oops, something went wrong...</div>

    return (
        <>
            {
                loading
                    ?
                    <Spinner />
                    :
                   <Wrapper>
                        <Content>
                            {
                                updateMessage.length > 0 ? <p>{updateMessage}</p> : <p>Select on the fields to update</p>
                            }
                            {
                                loadingUpdate && <Spinner />
                            }
                            <div className="products-container">
                                <div className="cart-container">
                                    {
                                        products.map(({ _id, title, description, code, thumbnail, price, stock }, key) => {
                                            return (
                                                <div key={key} className="id-card">
                                                    <div className="title-card">
                                                        <input onChange={handleChange} value={title} name={`title-${key}`}/>
                                                    </div>
                                                    <div className="thumbnail-card">
                                                        <img className="url-img" src={thumbnail} alt={code}/>
                                                        <input onChange={handleChange} value={thumbnail} name={`thumbnail-${key}`}/>
                                                    </div>
                                                    <div className="description-card">
                                                        <input onChange={handleChange} value={description} name={`description-${key}`}/>
                                                    </div>
                                                    <div className="price-card">
                                                        <b>$<input onChange={handleChange} value={price} name={`price-${key}`}/></b>
                                                    </div>
                                                    <div className="stock-card">
                                                        <span>Stock:<input onChange={handleChange} value={stock} name={`stock-${key}`} /></span>
                                                    </div>
                                                    <div className="btn-card">
                                                        <Button text="Update" callback={() => handleSubmit(_id)}/>
                                                        <div className="delete-btn">
                                                            <button onClick={() => handleDelete(_id)}>
                                                                <span className="cart-item-delete">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Content>
                    </Wrapper>

            }) 
        </>
    )
}
export default Products