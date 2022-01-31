import { useState } from "react"
// Routers
import { useNavigate } from "react-router-dom"
// API
import API from "../../API"
// Components
import Button from "../../components/Button"
import Spinner from "../../components/Spinner"
// Styles
import { Wrapper, Content } from "./Login.styles"
const Login = () => {
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(Boolean)
    const [errorMessage, setErrorMessage] = useState(String)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserLogin({
            ...userLogin,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            const toLogin = await API.fetchLogin(userLogin)
            const { message, user } = toLogin
            setLoading(false)
            if (message === "OK") {
                localStorage.setItem("userDataLocal", JSON.stringify(user))
                navigate("/cart")
            }
        } catch (error) {
            setLoading(false)
            setErrorMessage(error.message)
        }
    }
    return (
        <Wrapper>
            <Content>
                    {
                        errorMessage.length > 0 ? <p>{errorMessage}</p> : <p>Login</p>
                    }
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} type="email" className="form-control" id="email" placeholder="Email" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} type="password" className="form-control" id="password" placeholder="Password" name="password" required/>
                    </div>
                    <Button text="login" callback={handleSubmit} />
                    {
                        loading && <Spinner />
                    }
            </Content>
        </Wrapper>
    )
}
export default Login