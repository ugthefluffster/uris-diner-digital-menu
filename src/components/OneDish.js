import React from 'react'
import TagVegeterian from './TagVegeterian'
import TagGlutenFree from './TagGlutenFree'

function OneDish({ dish }) {
  return (
    <div className='col-6 col-xl-4 p-2 text-center d-flex flex-column justify-content-between'>
      <div>
        <div>
          <img className='rounded-1 object-fit-cover dish-image mb-3' src={dish.image_src} alt="" />
        </div>
        <div className='d-flex justify-content-center flex-wrap'>
          <h5 className='mb-1'>{dish.name}</h5>
          <h5>
            {dish.is_vegeterian && <TagVegeterian />}
            {dish.is_gluten_free && <TagGlutenFree />}
          </h5>
        </div>
        <div className='mb-1'><small>{dish.description}</small></div>
      </div>
      <div><h4>{dish.price}₪</h4></div>
    </div>
  )
}

export default OneDish