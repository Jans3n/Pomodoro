import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
