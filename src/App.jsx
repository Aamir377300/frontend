import Signup from './Signup/Signup'
import Login from './Login/Login'
import Productpage from './Productpage/Productpage'
import Cartpage from './Cartpage/Cartpage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productpage' element={<Productpage />} />
          <Route path='/cartpage' element={<Cartpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
