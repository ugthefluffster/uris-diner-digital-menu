import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage({ categories }) {

  return (
    <div className='text-center'>
      <div>This is a welcome page. I'm not finished with it yet.</div>
      <Link to={"/menu/" + categories[0].id}>To the menu</Link>
    </div>
  )
}

export default WelcomePage