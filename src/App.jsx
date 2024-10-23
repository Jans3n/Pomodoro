import React, { useEffect, useState } from 'react'
import CustomButton from './components/UI/CustomButton'
import Timer from './components/Timer/Timer'
import TaskList from './components/Tasks/TaskList'
import './App.css'
import { TaskProvider } from './components/Contexts/TaskContext'

function App() {
  
  return (
    <>
      <TaskProvider>
    <div className='Pomodoro'>
      <div className='BackgroundImage'></div>
      <div className='Top'></div>
        <div className='AppContainer'>
          <div className='Timer'>
            <Timer />
          </div>
          <div className='TaskList'>
            <TaskList />
          </div>
        </div>
      <div className='Bottom'></div>
    </div>
      
      </TaskProvider>
      
    </>
  )
}

export default App
