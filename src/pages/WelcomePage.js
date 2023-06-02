import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage({ categories }) {

  return (
    <div>
      <Link to={"/menu/" + categories[0].id}>To the menu</Link>
    </div>
  )
}

export default WelcomePage