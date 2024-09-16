import React, { useEffect, useState } from 'react'
import './TaskInputField.css'
import AddIcon from '../icons/AddIcon';

function TaskInputField({name, onClick}) {

  const [taskText, setTaskText] = useState('');
  const [openedTaskMenu, setOpenedTaskMenu] = useState(false)

  const handleTaskMenu = () => {
    setOpenedTaskMenu(!openedTaskMenu)
  }

  return (
    <>
        {/* <input 
          type="text" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)}
          className='inputField'/>
        <button onClick={onClick} className='inputButton'>{name}</button> */}
        {
          openedTaskMenu ? (
          <input 
            type="text" 
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
            className='inputField'/>
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