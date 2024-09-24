import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import './TaskItem.css'
import IconButton from '../UI/IconButton';
import CheckIcon from '../icons/CheckIcon';
import EditIcon from '../icons/EditIcon';

function TaskItem({task, toggleCompleted, editTask, deleteTask}) {

  const [PomodorosPassed, setPomodorosPassed] = useState(0)

  const handleCompletedTaskChange = () => {
    toggleCompleted(task.id)
  }

  const handleOpenTaskMenu = () => {

  }

  const buttonStyle = {
    textAlign: 'center',
    opacity: '0.9',
    color: 'rgb(85, 85, 85)',
  }


  return(
    <>
      <div className='TaskItem'>
        <div className='LeftSideTask'>
          <IconButton
            icon={<CheckIcon/>}
            onClick={() => handleCompletedTaskChange()} 
            shouldSpin={false} 
            style={buttonStyle}/>
          <div className='TaskText'>
            {task.text}
          </div>
        </div>
        <div className='RightSideTask'>
          <div className='Pomodoros'>{PomodorosPassed}/{task.pomodoros}</div>
          <IconButton
            icon={<EditIcon/>}
            onClick={() => handleOpenTaskMenu()} 
            shouldSpin={false} 
            style={buttonStyle}/>
        </div>
      </div>
        
    </>
  )
}

export default TaskItem;