// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MangasPage from './pages/MangasPage'
import NavbarComponent from './components/NavbarComponent'
import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ConfirmEmail from './pages/ConfirmEmail'

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
          <Route path='/confirm/:idUtilisateur/:token' element={<ConfirmEmail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
