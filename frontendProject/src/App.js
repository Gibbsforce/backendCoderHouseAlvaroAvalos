import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// Pages
import CreateProduct from "./pages/CreateProduct"
import Products from "./pages/Products"
import Test from "./pages/Test"
import Cart from "./pages/Cart"
import Messages from "./pages/Messages"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
// Contexts
import UserProvider from "./contexts/UserContext"
// Components
import Header from "./components/Header"
// Styles
import { GlobalStyles } from "./GlobalStyles"
const App = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/create" element={<CreateProduct />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/test" element={<Test />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/messages" element={<Messages />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
        <GlobalStyles />
        </UserProvider>
    </Router>
  )
}
export default App;
