import React from 'react'
import CustomButton from './components/UI/CustomButton'
import Timer from './components/Timer/Timer'
import TaskList from './components/Tasks/TaskList'
import './App.css'

function App() {
  return (
    <>
    <div className='Pomodoro'>
      <div className='BackgroundImage'></div>
      <div className='Top'></div>
      <div className='AppContainer'>
        <Timer />
        {/* <TaskList /> */}
      </div>
      <div className='Bottom'></div>
    </div>
      
      
    </>
  )
}

export default App
