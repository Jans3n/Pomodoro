import React from 'react'
import CustomButton from './components/UI/CustomButton'
import Timer from './components/Timer/Timer'
import TaskList from './components/Tasks/TaskList'
import './App.css'

function App() {
  return (
    <>
      <div>
        <Timer />
        <TaskList />
      </div>
    </>
  )
}

export default App
