import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Header from "./components/Header.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
const App = () => {
  const isUserSignedIn=!!localStorage.getItem("token")
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        {isUserSignedIn&&<Route path={"/home"} element={<Home/>}/>}
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/register"} element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App