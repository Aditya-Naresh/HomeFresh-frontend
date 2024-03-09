import 'tailwindcss/tailwind.css';
import Nav from './Components/Nav';
import Home from './pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Otp from './pages/Otp';
import ProductsList from './pages/ProductsList';

function App() {

 

  return (
    <Router>

      <Nav />
      <Routes>
        <Route path = "/"  element = {<Home />} />
        <Route path = "/login"  element = {<Login />} />
        <Route path = "/signup"  element = {<Signup />} />
        <Route path = "/otp"  element = {<Otp />} />
        <Route path = "/products"  element = {<ProductsList />} />

      </Routes>
    </Router>
  )
}

export default App
