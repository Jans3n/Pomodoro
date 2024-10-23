import React, { useEffect, useState, useContext } from 'react'
import TaskItem from './TaskItem';
import './TaskList.css'
import TaskInputField from '../UI/TaskInputField';
import { TaskContext } from '../Contexts/TaskContext';

function Tasks({setIncrementPomodoros}) {

  const [taskText, setTaskText] = useState('');
  const { tasks, setTasks } = useContext(TaskContext);

  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [openTaskItemId, setOpenTaskItemId] = useState(null);
  
  const addTask = (text, pomodoros) => {
    const newTask = {
      id: Date.now(),
      text: text,
      pomodoros,
      completed: false
    };
    setTasks([newTask, ...tasks])
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

  const handleTaskMenuToggle = () => {
    if (openTaskItemId) {
      if (window.confirm("An menu to edit tasks is open. Do you want to close it and open the add task menu?")) {
        setOpenTaskItemId(null);
        setIsTaskMenuOpen(true);
      }
    } else {
      setIsTaskMenuOpen(!isTaskMenuOpen);
    }
  };

  // Handle opening/closing a TaskItem for editing
  const handleTaskItemToggle = (id) => {
    if (isTaskMenuOpen) {
      if (window.confirm("The menu to add tasks is open. Do you want to close it and edit this task?")) {
        setIsTaskMenuOpen(false);
        setOpenTaskItemId(id);
      }
    } else if (openTaskItemId === id) {
      setOpenTaskItemId(null);
    } else if (openTaskItemId !== null) {
      if (window.confirm("Another task is being edited. Do you want to close it and edit this task?")) {
        setOpenTaskItemId(id);e
      }
    } else {
      setOpenTaskItemId(id);
    }
  };

  return (
    <>
      <div className='TaskContainer'>
        <TaskInputField 
          addTask = {addTask}
          isTaskMenuOpen={isTaskMenuOpen}
          handleTaskMenuToggle={handleTaskMenuToggle}
        />
        <div className='TaskItemsContainer'>
          {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            handleTaskItemToggle={() => handleTaskItemToggle(task.id)}
            isTaskItemOpen={openTaskItemId === task.id}
          />
        ))}
        </div>
        
      </div>
    </>
  )

}

export default Tasks;