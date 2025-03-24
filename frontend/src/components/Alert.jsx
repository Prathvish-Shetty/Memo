import React from 'react'

function Alert({text}) {
  return (
    <div className="toast z-50">
    <div className="alert alert-success">
      <span>{text}</span>
    </div>
  </div>
  )
}

export default Alert