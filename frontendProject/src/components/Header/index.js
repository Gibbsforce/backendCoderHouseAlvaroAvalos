import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
// API
import API from "../../API"
// Contexts
import { UserContext } from "../../contexts/UserContext"
// Styles
import { Wrapper } from "./Header.styles"
const Header = () => {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const logOut = await API.fetchLogOut()
        const { message } = logOut
        if (message === "OK") {
            localStorage.removeItem("userDataLocal")
            navigate("/login")
        }
    }
    return (
        <Wrapper>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink className="navbar-brand" to="/products">Tercera Entrega</NavLink>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><NavLink activeclassname="active" to="/create">Create Product</NavLink></li>
                        <li><NavLink activeclassname="active" to="/products">Products</NavLink></li>
                        <li><NavLink activeclassname="active" to="/cart">Cart</NavLink></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {
                            !user ?
                            <>
                                <li><NavLink to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</NavLink></li>
                                <li><NavLink to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li>
                            </>
                            :
                            <li><button onClick={handleSubmit}><span className="glyphicon glyphicon-log-in"></span> Log Out</button></li>   
                        }
                    </ul>
                </div>
            </nav>
        </Wrapper>
    )
}
export default Header