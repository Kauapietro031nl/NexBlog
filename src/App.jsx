import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { onAuthStateChanged } from 'firebase/auth'


//hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
//context
import { AuthProvider } from "./context/authContext"

//Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


//Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'




function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  const loadingUser = user === undefined

  if (loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <>
      <div className='App'>
        <AuthProvider value={{ user }}>
          <BrowserRouter>

            <Navbar />



            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />
                <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />


              </Routes>
            </div>

            <Footer></Footer>
          </BrowserRouter>
        </AuthProvider>
      </div>

    </>
  )
}

export default App
