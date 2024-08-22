import React from 'react'
import './TimerModeButton.css'

function TimerButton({label, onClick, active}) {

  const buttonClassName = `TimerModeButton ${active ? 'active' : ''}`;

  return (
    <>
      <div>
        <button className={buttonClassName} onClick={onClick}>
          {label}
        </button>
      </div>
    </>
  )
}
export default TimerButton;
