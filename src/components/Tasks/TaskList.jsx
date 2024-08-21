import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import TaskItem from './TaskItem';
import TaskHeader from './TaskHeader';
import './TaskList.css'

function Tasks() {

  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "This is the first Task",
      completed: false,
    },
    {
      id: 2,
      text: "This is the second Task",
      completed: true,
    }
  ])
  
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask])
    setTaskText('')
  }

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => {
      if (task.id == id){
        return {...task, completed: !task.completed}
      } else {
        return task
      }
    }))
  }

  const editTask = (id) => {
    
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  return (
    <>
      <div className='TaskContainer'>
        {/* <h1 className="title">Tasks</h1> */}
        <TaskHeader />
        <CustomButton name="Add Task" onClick={() => addTask(taskText)}/>
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)}/>
        <div>
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </div>
      </div>
    </>
  )

}

export default Tasks;