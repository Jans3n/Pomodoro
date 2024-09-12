import React, { useEffect, useState } from 'react'
import './TaskInputField.css'

function TaskInputField({name, onClick}) {

  const [taskText, setTaskText] = useState('');
  return (
    <>
        <input 
          type="text" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)}/>
        <button onClick={onClick} className='inputButton'>{name}</button>
    </>
  )
}
export default TaskInputField