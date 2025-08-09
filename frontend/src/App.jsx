import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import Footer from './component/Footer'
import MovieDetailWraper from './helper/MovieDetailwraper'
import Movies from './pages/movies'
import ShowBookingPage from './pages/ShowBookingPage'
import MyBookingsPage from './pages/MyBookingPages'
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import ProfilePage from './pages/ProfilePage'

function App() {
  
  const location = useLocation()
  const applyPadding = location.pathname !== '/';

  return (
    <div >
      <Navbar />
      <div className={applyPadding ? "px-[10%]" : ""}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/mybooking' element={<MyBookingsPage  />} />
        <Route path='/movies/:id' element={<MovieDetailWraper />} />
        <Route path='/movies/:id/:date' element={<ShowBookingPage />} />
      </Routes>
      </div>
      <Routes>
        <Route path='/profilePage' element={<ProfilePage />} />
        <Route path='/loginForm' element={<LoginForm  />} />
        <Route path='/signupForm' element={<SignupForm  />} />
      </Routes>
      <Footer />
    </div>
  )

}
export default App
