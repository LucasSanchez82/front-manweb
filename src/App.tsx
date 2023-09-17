// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MangasPage from './pages/MangasPage'
import NavbarComponent from './components/NavbarComponent'
import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ConfirmEmail from './pages/ConfirmEmail'
import React, { createContext } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TestPage from './pages/TestPage'
import { QueryCache } from '@tanstack/react-query'

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
  onSettled: (data, error) => {
    console.log(data, error)
  },
})
console.log(queryCache.findAll());

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
          <Route path='/test' element={<TestPage />} />
          <Route path='/confirm/:idUtilisateur/:token' element={<ConfirmEmail />} />
        </Routes>
      </div>
      <ReactQueryDevtools />
    </BrowserRouter>
  )
}

export default App
