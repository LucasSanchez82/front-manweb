// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MangasPage from './pages/MangasPage'
import NavbarComponent from './components/NavbarComponent'
import SignIn from './pages/SignIn'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import ConfirmEmail from './pages/ConfirmEmail'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import TestPage from './pages/TestPage'
import { apiGetUtilisateur } from './api/api'
import { useQuery } from '@tanstack/react-query'




function App() {

  const { data, isLoading, refetch } = useQuery(['getUtilisateur'], apiGetUtilisateur);
  return (

    <BrowserRouter>
      <NavbarComponent query={{data, isLoading, refetch}} />
      <div id="content">
        <Routes>
          <Route path='/' element={<LoginPage query={{data, isLoading, refetch}} />} />
          <Route path='/login' element={<LoginPage query={{data, isLoading, refetch}} />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/confirm/:idUtilisateur/:token' element={<ConfirmEmail />} />
          
          
          <Route path='/mangas' element={
            !isLoading && data.isLogin ?
            <MangasPage />
            : <h2 style={{textAlign: 'center'}}> Il faut être <strong>connecté</strong> pour acceder au contenu lié au <strong> compte</strong> 😊 </h2>
          } />

          {/* <Route path='/test' element={<TestPage />} /> */}
          <Route path='/:any' element={<h2>404 : page non trouvé</h2>} />
        </Routes>
      </div>
      <ReactQueryDevtools />
    </BrowserRouter>
  )
}

export default App
