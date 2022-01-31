import { useState } from "react"
import { useNavigate } from "react-router-dom"
// API
import API from "../../API"
// Components
import Button from "../../components/Button"
import Spinner from "../../components/Spinner"
// Styles
import { Wrapper, Content } from "./CreateProduct.styles"
const CreateProduct = () => {

    const [product, setProduct] = useState({
        title: "",
        description: "",
        code: "",
        thumbnail: "",
        price: 0,
        stock: 0
    })

    const [error, setError] = useState(Boolean)
    const [errorMessage, setErrorMessage] = useState(String)
    const [loading, setLoading] = useState(Boolean)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setError(false)
            const createProduct = await API.fetchCreateProduct(product)
            const { message, error } = createProduct
            setLoading(false)
            if (message === "Error") {
                setError(true)
                return setErrorMessage(error)
            }
            if (message === "OK") {
                return navigate("/products")
            }
        } catch (error) {
            setLoading(false)
            setError(true)
            setErrorMessage(error)
        }
    }

    return (
        <Wrapper>
            <Content>
                <div className="form-group">
                    <label htmlFor="title">Product Name</label>
                    <input onChange={handleChange} type="text" className="form-control" id="title" placeholder="Name" name="title" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input onChange={handleChange} type="text" className="form-control" id="description" placeholder="Description" name="description" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input onChange={handleChange} type="text" className="form-control" id="code" placeholder="Code" name="code" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="thumb">Thumbnail URL</label>
                    <input onChange={handleChange} type="text" className="form-control" id="thumb" placeholder="URL" name="thumbnail" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input onChange={handleChange} type="number" className="form-control" id="price" placeholder="$ Price" name="price" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input onChange={handleChange} type="number" className="form-control" id="stock" placeholder="Stock" name="stock" required/>
                </div>
                {
                    loading && <Spinner />
                }
                {
                    error && <p>{errorMessage}</p>
                }
                <Button text="Create Product" callback={handleSubmit}/>
            </Content>
        </Wrapper>
    )
}
export default CreateProduct