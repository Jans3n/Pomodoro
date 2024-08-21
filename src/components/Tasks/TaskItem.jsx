import React, { useEffect, useState } from 'react'
import CustomButton from '../UI/CustomButton';
import './TaskItem.css'

function TaskItem({task, toggleCompleted, editTask, deleteTask}) {

  const handleCompletedTaskChange = () => {
    toggleCompleted(task.id)
  }

  return(
    <>
      <div className='TaskItem'>
        <input className='TaskCheckbox' type="checkbox" checked={task.completed} onChange={handleCompletedTaskChange}/>
        <p className='TaskText'>{task.text}</p>
        <CustomButton className='RemoveTaskButton' name="Remove" onClick={() => deleteTask(task.id)} />
      </div>
    </>
  )
}

export default TaskItem;