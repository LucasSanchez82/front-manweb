// import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate  } from 'react-router-dom'
import './App.css'
import MangasPage from './pages/MangasPage'
import NavbarComponent from './components/NavbarComponent'
import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'

function App() {

  return (
    <BrowserRouter>
      <NavbarComponent />
      <div id="content">
        <Routes>
          <Route path='/' element={<MangasPage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
