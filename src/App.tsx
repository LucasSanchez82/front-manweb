// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import MangasPage from './pages/MangasPage'
import NavbarComponent from './components/NavbarComponent'
import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <BrowserRouter>
        <NavbarComponent />
        <div id="content">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mangas' element={<MangasPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/login' element={<LoginPage />} />

      </Routes>

        </div>
    </BrowserRouter>
  )
}

export default App
