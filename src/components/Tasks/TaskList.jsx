import React, { useState, useContext } from 'react'
import TaskItem from './TaskItem';
import './TaskList.css'
import TaskInputField from '../UI/TaskInputField';
import { TaskContext } from '../Contexts/TaskContext';

function Tasks({}) {

  const {tasks } = useContext(TaskContext);

  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [openTaskItemId, setOpenTaskItemId] = useState(null);

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
          isTaskMenuOpen={isTaskMenuOpen}
          handleTaskMenuToggle={handleTaskMenuToggle}
        />
        <div className='TaskItemsContainer'>
          {tasks.length === 0 ?
            (
              <div className="EmptyTasksList">No task available</div>
            )
            :
            (tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              handleTaskItemToggle={() => handleTaskItemToggle(task.id)}
              isTaskItemOpen={openTaskItemId === task.id}
            />
            )))
          }
          
        </div>
        
      </div>
    </>
  )

}

export default Tasks;