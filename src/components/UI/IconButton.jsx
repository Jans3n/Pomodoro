import React, { useEffect, useState } from 'react'
import SettingsIcon from '../icons/Settingsicon'
import './IconButton.css'

function IconButton({icon, onClick, shouldSpin, style}) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true); 
    onClick();

    setTimeout(() => {
      setIsSpinning(false);
    }, 1200); 
  };

  return (
    <>
      {shouldSpin ? 
        <button onClick={handleClick} className={`IconButton ${isSpinning ? 'spin' : ''}`}>
          {icon}
        </button>
        :
        <button onClick={handleClick} className='IconButton' style={style}>
          {icon}
        </button>
      }
        
      
    </>
  )
}
export default IconButton
