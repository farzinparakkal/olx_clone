import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import VerifyEmail from "./components/VerifyEmail"
import Profile from './components/Profile'
import { useState } from "react"
import SellPost from "./components/SellPost"
import ViewUserPost from "./components/ViewUserPost"
import EditPost from "./components/EditPost"
import AddUserData from './components/AddUserData'
import EditUserData from "./components/EditUserData"

function App() {
  const [user, setUser] = useState("")
  return(
    <BrowserRouter>
    {user&& <Nav user={user}/>}
    <Routes>
    <Route path="/" element={<Home setUser={setUser}/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verifyEmail" element={<VerifyEmail />}></Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/addUserData" element={<AddUserData />}></Route>
    <Route path="/editUserData" element={<EditUserData />}></Route>
    <Route path="/sellPost" element={<SellPost />}></Route>
    <Route path="/viewUserPost/:id" element={<ViewUserPost />}></Route>
    <Route path="/editPost/:id" element={<EditPost />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
