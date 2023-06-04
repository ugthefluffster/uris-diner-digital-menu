import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage({ categories }) {
  if (!categories) {
    return (
      <div className="progress w-50 position-absolute start-50 translate-middle" style={{ top: "30vh" }} >
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" style={{ width: `100%` }}></div>
      </div>
    )
  }
  return (
    <div className='text-center'>
      <div>This is a welcome page. I'm not finished with it yet.</div>
      <Link to={"/menu/" + categories[0].id}>To the menu</Link>
    </div>
  )
}

export default WelcomePage