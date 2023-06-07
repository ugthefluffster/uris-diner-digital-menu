import React from 'react'

function LoadingBar() {
  return (
    <div className="progress w-50 position-absolute start-50 translate-middle" style={{ top: "50vh" }} >
      <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" style={{ width: "100%" }}></div>
    </div>
  )
}

export default LoadingBar