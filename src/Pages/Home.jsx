import React from "react";
import Timer from "../components/Timer/Timer";
import TaskList from "../components/Tasks/TaskList";
import NavigationBar from "../components/UI/NavigationBar";
import { TaskProvider } from "../components/Contexts/TaskContext";
import './Home.css'

function Home(){
  return (
    <>
    <TaskProvider>
    <div className='Pomodoro'>
    <NavigationBar />
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

export default Home;