import React from 'react'
import './CustomButton.css'

function CustomButton({name, onClick}) {
  return (
    <>
      {/* <div> */}
        <button onClick={onClick} className='CustomButton'>{name}</button>
      {/* </div> */}
    </>
  )
}
export default CustomButton
