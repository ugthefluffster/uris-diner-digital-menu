import React from 'react'
import { Link } from 'react-router-dom'
import dinerimage from './diner-food.jpg'

function WelcomePage({ categories }) {
  if (!categories) {
    return (
      <div className="progress w-50 position-absolute start-50 translate-middle" style={{ top: "30vh" }} >
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" style={{ width: `100%` }}></div>
      </div>
    )
  }
  return (
    <div style={{ height: "100vh" }} className='d-flex flex-column align-items-center justify-content-center'>
      <h1 class="text-shadow text-primary">Welcome to Uri's Diner</h1>
      <img className='m-3 rounded-5 d-none d-sm-block' style={{ maxWidth: "70vw", maxHeight: "60vh", objectFit: "cover" }} src={dinerimage} alt="" />
      <img className='m-5 d-sm-none d-block' style={{ maxWidth: "100vw", maxHeight: "60vh", objectFit: "cover" }} src={dinerimage} alt="" />
      <Link className='btn btn-secondary btn-lg text-white box-shadow' to={"/menu/" + categories[0].id}>To the menu</Link>
    </div>

  )
}

export default WelcomePage