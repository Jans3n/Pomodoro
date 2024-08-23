import React from 'react'
import SettingsIcon from '../icons/Settingsicon'
import './IconButton.css'

function IconButton({icon, onClick}) {
  return (
    <>
      {/* <div> */}
        <button onClick={onClick} className='IconButton'>
          {icon}
        </button>
      {/* </div> */}
    </>
  )
}
export default IconButton
