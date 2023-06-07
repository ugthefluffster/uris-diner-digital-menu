import React from 'react'
import { Link } from 'react-router-dom'

function OneCategory({ category, handleClick }) {
  return (
    <div className='text-center mb-4'>
      <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive">
        <Link onClick={() => handleClick(category.id)} className='text-decoration-none link-dark' to={"/menu/" + category.id}>
          <div className='mb-1'><img className='rounded-1 object-fit-cover cat-image' src={category.image_src} alt="" /></div>
          <h5>{category.name}</h5>
        </Link>
      </div>
    </div>
  )
}

export default OneCategory