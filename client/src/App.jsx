import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import './bootstrap.min.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<App/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
