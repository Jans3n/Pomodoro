import React from 'react'
import './TimerModeButton.css'

function TimerButton({label, onClick, active}) {
  const buttonStyle = {
    background: active ? 'rgba(0, 0, 0, 0.15)' : 'none',
    fontSize: active ? '20px' : '18px',
  }

  return (
    <>
      <div>
        <button className='TimerModeButton' onClick={onClick} style={buttonStyle}>
          {label}
        </button>
      </div>
    </>
  )
}
export default TimerButton;
