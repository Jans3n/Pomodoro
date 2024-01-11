import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import TaskItem from './TaskItem';

function Tasks() {

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
  const [taskText, setTaskText] = useState('');

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask])
    setTaskText('')
  }

  return (
    <>
      <div>
        <h1 class="title">Tasks</h1>
        <CustomButton name="Add Task" onClick={() => addTask(taskText)}/>
        <input type="text" onChange={(e) => setTaskText(e.target.value)}/>
        <div>
          {tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </div>
    </>
  )

}

export default Tasks;