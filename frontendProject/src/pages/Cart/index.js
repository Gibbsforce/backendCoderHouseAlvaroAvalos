import { useState, useEffect, useContext } from "react"
// API
import API from "../../API"
// Contexts
import { UserContext } from "../../contexts/UserContext"
// Components
import Spinner from "../../components/Spinner"
import Button from "../../components/Button"
// Styles
import { Wrapper, Content, Profile, Carts } from "./Cart.styles"
const Cart = () => {
    const [cart, setCart] = useState(Array)
    const [cartId, setCartId] = useState(String)
    const [productsOfCart, setProductsOfCart] = useState(Array)
    console.log(productsOfCart)
    console.log(cartId)
    console.log(cart)
    const [products, setProducts] = useState(Array)
    const [productId, setProductId] = useState(String)
    console.log(productId)
    console.log(products)
    const [message, setMessage] = useState(String)
    const [loading, setLoading] = useState(Boolean)
    const [error, setError] = useState(Boolean)

    const [user] = useContext(UserContext)

    useEffect(() => {
        const fetchGetCarts = async () => {
            try {
                setError(false)
                const carts = await API.fetchGetCarts()
                const { message, cart } = carts
                if (message === "Error") {
                    return setError(true)
                }
                if (message === "OK") {
                    setCart(prev => [...prev, ...cart])
                }
            } catch (error) {
                setError(true)
                setMessage(error)
            }
        }
        fetchGetCarts()
    }, [])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setError(false)
                const allProducts = await API.fetchAllProducts()
                const { message, products } = allProducts
                if (message === "Error") {
                    return setError(true)
                }
                if (message === "OK") {
                    setProducts(products)
                }
            } catch (error) {
                setError(true)
                setMessage(error)
            }
        }
        fetchAllProducts()
    }, [])

    useEffect(() => {
        const fetchGetCartById = async () => {
            try {
                const aCart = await API.fetchGetCartById(cartId)
                const { message, products } = aCart
                if (message === "Error") {
                    setMessage(message)
                    return setError(true)
                }
                if (message === "OK") {
                    setProductsOfCart(products)
                }
            } catch (error) {
                setMessage(error)
            }
        }
        fetchGetCartById()
    }, [cartId])

    const handleChange = async (e) => {
        const { name, value } = e.target
        if (name === "cart") {
            setCartId(value)
        }
        if (name === "product") {
            setProductId(value)
        }
    }

    const fetchCreateCart = async () => {
        try {
            setLoading(true)
            setError(false)
            const createCart = await API.fetchCreateCart()
            const { message } = createCart
            setLoading(false)
            if (message === "Error") {
                setError(true)
            }
            if (message === "OK") {
                setMessage("Cart Created Succesfully")
                setCart(prev => [...prev, createCart.cart])
            }
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    const fetchAddProductToCart = async () => {
        try {
            setError(false)
            const findProduct = products.find(({ _id }) => _id === productId)
            const addProductToCart = await API.fetchAddProductToCart(cartId, findProduct)
            const { message } = addProductToCart
            if (message === "Error") {
                setError(true)
            }
            if (message === "OK") {
                setMessage("Product Added Succesfully")
            }
        } catch (error) {
            setMessage(error)
        }
    }

    const fetchDeleteProductFromCart = async (id) => {
        try {
            setError(false)
            const deleteProductFromCart = await API.fetchDeleteProductFromCart(cartId, id)
            const { message } = deleteProductFromCart
            if (message === "Error") {
                setError(true)
            }
            if (message === "OK") {
                setMessage("Product Deleted Succesfully")
            }
        } catch (error) {
            setMessage(error)
        }
    }

    const handleDeleteCart = async () => {
        try {
            setMessage("")
            const deleteCart = await API.fetchDeleteCart(cartId)
            const { message } = deleteCart
            if (message === "Error") {
                setError(true)
            }
            if (message === "OK") {
                setMessage("Cart Deleted Succesfully")
            }
        } catch (error) {
            setMessage(error)
        }
    }

    const handleFinishCart = async () => {
        try {
            setLoading(true)
            const fetchCartComplete = await API.fetchCartComplete(cartId)
            const { message, error } = fetchCartComplete
            setLoading(false)
            if (message === "Error") {
                setMessage(error)
            }
            if (message === "OK") {
                setMessage("Cart Completed, a message has been sent to the client")
            }
        } catch (error) {
            setLoading(false)
            setMessage(error)
        }
    }

    if (error) return <div>Oops, something went wrong...</div>
    return (
        <Wrapper>
                {
                    loading && <Spinner />
                }
                {
                    message.length > 0 && <h1>{message}</h1>
                }
            <Content>
                <Profile>
                    {
                        user &&
                            <>
                                <h1>Welcome: {user.name}</h1>
                                <p>Here are your personal data:</p>
                                <img src={user.avatar} alt={user.name}/>
                                <p>Name: {user.name}</p>
                                <p>Lastname: {user.lastname}</p>
                                <p>Email: {user.username}</p>
                                <p>Phone: +{user.phone}</p>
                                <p>Age: {user.age}</p>
                                <p>Address: {user.address}</p>
                            </>
                    }
                </Profile>
                <Carts>
                    <h1>My Carts</h1>
                    <Button text="Create New Cart" callback={fetchCreateCart}/>
                    <p>List of carts</p>
                    <select defaultValue="DEFAULT" name="cart" onChange={handleChange}>
                        <option value="DEFAULT" disabled>Choose a cart</option>
                        {
                            cart.map(({ _id }, key) => {
                                return (
                                    <option key={key} value={_id}>Cart: {key + 1}</option>
                                )
                            })
                        }
                    </select>
                    <p>Products to add</p>
                    <select defaultValue="DEFAULT" name="product" onChange={handleChange}>
                        <option value="DEFAULT" disabled>Choose a product</option>
                        {
                            products.map(({ _id, title }, key) => {
                                return (
                                    <option key={key} value={_id}>{title}</option>
                                )
                            })
                        }
                    </select>
                    <p>Add product to this cart</p>
                    <Button text="Add" callback={fetchAddProductToCart}/>
                    <h1>List of products of cart {cartId}</h1>
                    <div className="cart-products">
                        <div className="cart-container">
                            {
                                productsOfCart.map(({ _id, title, description, code, thumbnail, price, quantity }, key) => {
                                    return (
                                        <div key={key} className="cart-product">
                                            <div className="column">
                                                <div className="thumbnail-cart">
                                                    <img className="url-img" src={thumbnail} alt={code} />
                                                </div>
                                            </div>
                                            <div className="column">
                                                <div className="dsc-cart">
                                                    <div className="title-cart">
                                                        <span>{title}</span>
                                                    </div>
                                                    <div className="description-cart">
                                                        <span>{description}</span>
                                                    </div>
                                                    <div className="price-cart">
                                                        <b>$ {price}</b>
                                                    </div>
                                                    <div className="quantity-cart">
                                                        <span>Quantity: {quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="btns">
                                                    <div className="delete-cart">
                                                        <Button text="delete" callback={() => fetchDeleteProductFromCart(_id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <h1>Total: $ {productsOfCart.reduce((total, {price, quantity}) => total + price * quantity,0 ).toFixed(2)}</h1>
                    <h1>Delete this cart</h1>
                    <Button text="Delete" callback={handleDeleteCart}/>
                    <h1>Finish with this cart</h1>
                    <Button callback={handleFinishCart} text="Finish"/>
                </Carts>
            </Content>
        </Wrapper>
    )
}
export default Cart