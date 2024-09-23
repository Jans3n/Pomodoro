import React, { useEffect, useState } from 'react'
import './TaskInputField.css'
import AddIcon from '../icons/AddIcon';
import TaskMenu from './TaskMenu';

function TaskInputField({addTask}) {

  const [taskText, setTaskText] = useState('');
  const [openedTaskMenu, setOpenedTaskMenu] = useState(false)

  const handleTaskMenu = () => {
    setOpenedTaskMenu(!openedTaskMenu)
  }

  return (
    <>
        {
          openedTaskMenu ? (
            <TaskMenu onClose={handleTaskMenu} addTask={addTask}/>
          ) : (
            <button 
              onClick={handleTaskMenu} 
              className='addTaskButton'> <AddIcon></AddIcon> Add Task
            </button>
          )
        }


    </>
  )
}
export default TaskInputField