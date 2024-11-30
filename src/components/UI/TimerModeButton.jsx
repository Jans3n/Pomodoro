import React from 'react'
import './TimerModeButton.css'

function TimerButton({label, onClick, active}) {

  const buttonClassName = `TimerModeButton ${active ? 'active' : ''}`;

  return (
    <>
        <button className={buttonClassName} onClick={onClick}>
          {label}
        </button>
    </>
  )
}
export default TimerButton;
