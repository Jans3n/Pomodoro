import React from 'react'

function CustomButton({name, onClick}) {
  return (
    <>
      <div>
        <button onClick={onClick}>{name}</button>
      </div>
    </>
  )
}
export default CustomButton
