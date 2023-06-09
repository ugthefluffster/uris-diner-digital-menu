import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='text-center'>
      An error has occured
      <div>
        <Link to="/">Back to the start...</Link>
      </div>
    </div>
  )
}

export default ErrorPage