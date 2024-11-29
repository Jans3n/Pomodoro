import React, { useEffect, useState, useContext } from 'react'
import TaskItem from './TaskItem';
import './TaskList.css'
import TaskInputField from '../UI/TaskInputField';
import { TaskContext } from '../Contexts/TaskContext';
import axios from 'axios';

function Tasks({}) {

  const [taskText, setTaskText] = useState('');
  const {tasks, setTasks, fetchTasksData } = useContext(TaskContext);

  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [openTaskItemId, setOpenTaskItemId] = useState(null);
  
  const addTask = async (text, pomodoros) => {
    const newTask = {
      taskDescription: text,
      pomodoros: pomodoros,
      pomodorosPassed: 0,
      isCompleted: false
    };
    await axios.post(`https://localhost:7044/api/tasks/`, newTask)
    .then(res => {
      // setTasks([newTask, ...tasks])
      fetchTasksData()
      setTaskText('')
      console.log('====================================');
      console.log(tasks);
      console.log('====================================');
    })
  }

  const toggleCompleted = async (id, isComplete) => {
    const patchIsCompleteObject = [
      {
        op: "replace",
        path: "/iscomplete",
        value: !isComplete
      }
    ]
    await axios.patch(`https://localhost:7044/api/tasks/` + id, patchIsCompleteObject)
    .then(res => {
      setTasks(tasks.map(task => {
        if (task.id == id){
          return {...task, isComplete: !task.isComplete}
        } else {
          return task
        }
      }))
    })
  }

  const editTask = async (oldTaskData, newTaskDescription, newPomodoros) => {
    const taskObject = {
      id: oldTaskData.id,
      taskDescription: newTaskDescription,
      pomodoros: newPomodoros,
      pomodorosPassed: oldTaskData.pomodorosPassed,
      isComplete: oldTaskData.isComplete,
    }
    await axios.put(`https://localhost:7044/api/tasks/` + oldTaskData.id, taskObject)
    .then(res => {
      setTasks(tasks.map(task => {
            if (task.id === oldTaskData.id) {
              return { ...task, taskDescription: newTaskDescription, pomodoros: newPomodoros };
            }
            return task;
          }));
    })
    console.log(taskObject)
    
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