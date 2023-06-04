import React from 'react'
import { apiUrl } from '../config'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { after } from 'underscore'

function MenuPage({ categories }) {
  const [dishes, setDishes] = React.useState([{ id: 0 }])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const params = useParams()
  const shownCategory = categories.find(category => category.id === parseInt(params.id))

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/dishes?category_id=${params.id}`)
      .then(response => {
        setDishes(response.data);
        setIsLoaded(true)
      })
  }, [params])

  function handleClick(id) {
    if (parseInt(params.id) !== id) {
      setIsLoaded(false);
    }
  }

  return (
    <div>
      <nav className="navbar fixed-top bg-primary justify-content-center">
        <button className='d-md-none btn position-absolute start-0' data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive">Categories▾</button>
        <Link to="/" className="navbar-brand" ><h3>Uris diner</h3></Link>
      </nav>

      <div className='container-xxl'>
        <div className='row'>

          <div className='col-md-3 bg-white shadow'>
            <div className='offcanvas-md offcanvas-start p-3' tabIndex="-1" id="offcanvasResponsive">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Categories</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive"></button>
              </div>
              <div style={{ overflowY: "auto" }}>
                {categories.map(category =>
                  <div className='text-center mb-4' key={category.id}>
                    <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive">
                      <Link onClick={() => handleClick(category.id)} className='text-decoration-none link-dark' to={"/menu/" + category.id}>
                        <div className='mb-1'><img className='rounded-1 object-fit-cover cat-image' src={category.image_src} alt="" /></div>
                        <h5>{category.name}</h5>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='col position-relative' >
            {!isLoaded ?
              <div className="progress w-50 position-absolute start-50 translate-middle" style={{ top: "30vh" }} >
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `100%` }}></div>
              </div>
              :
              <div>
                <div className='row text-center'>
                  <h1 className='mb-4'>{shownCategory && shownCategory.name}</h1>
                </div>
                <div className='row'>
                  {dishes.map(dish =>
                    <div className='col-6 p-2 text-center d-flex flex-column justify-content-between' key={dish.id}>
                      <div>
                        <div>
                          <img className='rounded-1 object-fit-cover dish-image mb-3' src={dish.image_src} alt="" />
                        </div>
                        <div className='d-flex justify-content-center flex-wrap'>
                          <h5 className='mb-1'>{dish.name}</h5>
                          <h5>
                            {dish.is_vegeterian && <span style={{ backgroundColor: "green" }} class="badge ms-1">V</span>}
                            {dish.is_gluten_free && <span style={{ backgroundColor: "orange" }} class="badge ms-1">G</span>}
                          </h5>
                        </div>
                      </div>
                      <div className='mb-1'><small>{dish.description}</small></div>
                      <div><h4>{dish.price}₪</h4></div>
                    </div>
                  )}
                </div>
                <div className='row mt-4'>
                  <p><span class="badge fs-6" style={{ backgroundColor: "green" }} >V</span> Vegeterian</p>
                  <p><span class="badge fs-6" style={{ backgroundColor: "orange" }}>G</span> Gluten Free</p>
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPage