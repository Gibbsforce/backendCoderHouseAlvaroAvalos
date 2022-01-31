import { useState } from "react"
// Routers
import { useNavigate } from "react-router-dom"
// Components
import Spinner from "../../components/Spinner"
import Button from "../../components/Button"
// Styles
import { Wrapper, Content } from "./SignUp.styles"
const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        username: "",
        password: "",
        avatar: null,
        selectedFile: null,
        address: "",
        age: "",
        phone: ""
    })
    console.log(user)

    const [isEmpty, setIsEmpty] = useState(true)
    const [isFileEmpty, setIsFileEmpty] = useState(true)
    console.log(isEmpty)
    console.log(isFileEmpty)
    const [error, setError] = useState(Boolean)
    const [loading, setLoading] = useState(Boolean)
    const [errorMessage, setErrorMessage] = useState(String)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (user.name === "" || user.lastname === "" || user.username === "" || user.password === "" || user.address === "" || user.age === "" || user.phone === "") {
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleChangeFile = (e) => {
 
        if (e.target.files[0] === undefined) {
            setIsFileEmpty(true)
        } else {
            setIsFileEmpty(false)
        }
        setUser({
            ...user,
            selectedFile: e.target.files[0],
            avatar: e.target.files[0].name
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("avatar", user.selectedFile)
        formData.append("name", user.name)
        formData.append("lastname", user.lastname)
        formData.append("username", user.username)
        formData.append("password", user.password)
        formData.append("address", user.address)
        formData.append("age", user.age)
        formData.append("phone", user.phone)
        setLoading(true)
        fetch("http://localhost:8080/api/auth/local/signup", {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(data => {
            setLoading(false)
            const { message, error, user } = data
            if (message === "Error") {
                setError(true)
                return setErrorMessage(error)
            }
            if (message === "OK") {
                console.log(user)
                localStorage.setItem("userDataLocal", JSON.stringify(user))
                return navigate("/cart")
            }
        }).catch(error => {
            setLoading(false)
            setError(true)
            setErrorMessage(error)
        })
    }
    return (
       <Wrapper>
           <Content>
                <form encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} type="text" className="form-control" id="name" placeholder="Name" name="name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input onChange={handleChange} type="text" className="form-control" id="lastname" placeholder="Lastname" name="lastname" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} type="email" className="form-control" id="email" placeholder="Email" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} type="password" className="form-control" id="password" placeholder="Password" name="password" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar</label>
                        <input onChange={handleChangeFile} type="file" className="form-control" id="avatar" placeholder="Avatar" name="avatar" accept="image/*" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input onChange={handleChange} type="text" className="form-control" id="address" placeholder="Address" name="address" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input onChange={handleChange} type="number" className="form-control" id="age" placeholder="Age" name="age" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input onChange={handleChange} type="number" className="form-control" id="phone" placeholder="Phone" name="phone" required/>
                    </div>
                </form>
                {
                    loading && <Spinner />
                }
                {
                    error && <p>{errorMessage}</p>
                }
                {
                    (isEmpty || isFileEmpty) ? <p>Please fill all the fields</p> : <Button text="Sign Up" callback={handleSubmit}/>
                }
           </Content>
       </Wrapper>
    )
}
export default SignUp