import React from 'react'

function AddIcon({props}) {
  return (
    <>
      <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.3em"
      width="1.3em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
    </svg>
    </>
  )
}
export default AddIcon