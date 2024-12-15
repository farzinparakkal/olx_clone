import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import VerifyEmail from "./components/VerifyEmail"
import Profile from './components/Profile'
import SellPost from "./components/SellPost"
import ViewUserPost from "./components/ViewUserPost"
import EditPost from "./components/EditPost"
import AddUserData from './components/AddUserData'
import EditUserData from "./components/EditUserData"
import ViewPost from "./components/ViewPost"
import EnqPost from "./components/EnqPost"
import EnqPage from "./components/EnqPage"

function App() {
  const [user, setUser] = useState("")
  const [filter,setFilter]=useState("")
  const [name,setName]=useState("")
  return(
    <BrowserRouter>
    {user&& <Nav user={user} setFilter={setFilter} filter={filter} setName={setName}/>}
    <Routes>
    <Route path="/" element={<Home setUser={setUser} filter={filter} name={name}/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verifyEmail" element={<VerifyEmail />}></Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/addUserData" element={<AddUserData />}></Route>
    <Route path="/editUserData" element={<EditUserData />}></Route>
    <Route path="/sellPost" element={<SellPost />}></Route>
    <Route path="/viewUserPost/:id" element={<ViewUserPost />}></Route>
    <Route path="/viewPost/:id" element={<ViewPost />}></Route>
    <Route path="/enqPost" element={<EnqPost />}></Route>
    <Route path="/enqPage" element={<EnqPage />}></Route>
    <Route path="/editPost/:id" element={<EditPost />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
