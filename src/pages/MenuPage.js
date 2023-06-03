import React from 'react'
import { apiUrl } from '../config'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function MenuPage({ categories }) {
  const [dishes, setDishes] = React.useState([{ id: 0 }])
  const [progress, setProgress] = React.useState(0)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [elementsLoaded, setelementsLoaded] = React.useState(0)
  const params = useParams()
  const shownCategory = categories.find(category => category.id === parseInt(params.id))
  let elementsToLoad = dishes.length
  

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/dishes?category_id=${params.id}`)
      .then(response => setDishes(response.data));
  }, [params, categories])

  React.useEffect(() => {
    setProgress(100 / (elementsToLoad - elementsLoaded))
    console.log(100 / (elementsToLoad - elementsLoaded))
    elementsLoaded === elementsToLoad && console.log("done")
    setIsLoaded(elementsLoaded === elementsToLoad)
  }, [categories, dishes, elementsToLoad, elementsLoaded])

  function handleLoaded() {
    setelementsLoaded(elementsLoaded + 1)
  }

  return (
    <div>
      <div className="progress w-50 position-absolute top-50 start-50 translate-middle" hidden={isLoaded}>
        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%` }}></div>
      </div>

      <nav className="navbar fixed-top bg-primary justify-content-center">
        <button className='d-md-none btn position-absolute start-0' data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive">Categories▾</button>
        <Link to="/" className="navbar-brand" ><h1>Uris diner</h1></Link>
      </nav>

      <div className='container-xxl' hidden={!isLoaded}>
        <div className='row'>

          <div className='col-md-3 bg-white'>
            <div className='offcanvas-md offcanvas-start p-3' tabIndex="-1" id="offcanvasResponsive">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Categories</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive"></button>
              </div>
              {categories.map(category =>
                <div className='text-center mb-3' key={category.id}>
                  <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive">
                    <Link className='text-decoration-none link-dark' to={"/menu/" + category.id}>
                      <div className='mb-2'><img className='rounded-1 object-fit-cover cat-image' src={category.image_src} alt="" /></div>
                      <h5>{category.name}</h5>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='col'>
            <div className='row text-center'>
              <h2>{shownCategory && shownCategory.name}</h2>
            </div>
            <div className='row'>
              {dishes.map(dish =>
                <div className='col-6 p-2 text-center d-flex flex-column justify-content-between' key={dish.id}>
                  <div><img onLoad={handleLoaded} className='rounded-1 object-fit-cover dish-image mb-3' src={dish.image_src} alt="" /></div>
                  <div ><h5 className='mb-1'>{dish.name}</h5></div>
                  <div className='mb-1'><small>{dish.description}</small></div>
                  <div><h4>{dish.price}₪</h4></div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MenuPage