import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import TaskItem from './TaskItem';
import TaskHeader from './TaskHeader';
import './TaskList.css'
import TaskInputField from '../UI/TaskInputField';

function Tasks() {

  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: "This is the first Task", pomodoros: 1, completed: false },
    { id: 2, text: "This is the second Task", pomodoros: 2, completed: true },
    { id: 3, text: "This is the third Task", pomodoros: 4, completed: false }
  ])
  
  const addTask = (text, pomodoros) => {
    const newTask = {
      id: Date.now(),
      text: text,
      pomodoros,
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

  const editTask = (id, newText, newPomodoros) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText, pomodoros: newPomodoros };
      }
      return task;
    }));
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  return (
    <>
      <div className='TaskContainer'>
        <TaskInputField 
          addTask = {addTask}
        />
        <div className='TaskItemsContainer'>
          {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            editTask={editTask}
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