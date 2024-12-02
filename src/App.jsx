import React, { useEffect, useState } from 'react'
import CustomButton from './components/UI/CustomButton'
import Timer from './components/Timer/Timer'
import TaskList from './components/Tasks/TaskList'
import './App.css'
import { TaskProvider } from './components/Contexts/TaskContext'
import NavigationBar from './components/UI/NavigationBar'
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
