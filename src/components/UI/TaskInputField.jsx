import React from 'react'
import './TaskInputField.css'
import AddIcon from '../icons/AddIcon';
import TaskMenu from './TaskMenu';

function TaskInputField({addTask, handleTaskMenuToggle, isTaskMenuOpen}) {

  return (
    <>
      <div className='ModifyTaskContainer'>
        {
          isTaskMenuOpen ? (
            <TaskMenu onClose={handleTaskMenuToggle} addTask={addTask}/>
          ) : (
            <button 
              onClick={handleTaskMenuToggle} 
              className='addTaskButton'> <AddIcon></AddIcon> Add Task
            </button>
          )
        }
      </div>
        


    </>
  )
}
export default TaskInputField