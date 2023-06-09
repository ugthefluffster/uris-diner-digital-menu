import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PreloadMedia, MediaType } from 'react-preload-media';
import OneDish from '../components/OneDish';
import LoadingBar from '../components/LoadingBar';
import TagVegeterian from '../components/TagVegeterian';
import TagGlutenFree from '../components/TagGlutenFree';
import { apiUrl } from '../config'
import icon from './icon.webp'

function MenuPage({ categories }) {
  const [dishes, setDishes] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const params = useParams()
  const navigate = useNavigate()
  let shownCategory = categories ? categories.find(category => category.id === parseInt(params.id)) : null
  const media = isLoading ? dishes.map(dish => ({ type: MediaType.Image, url: dish.image_src })) : []

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/dishes?category_id=${params.id}`)
      .then(response => {
        setDishes(response.data);
        setIsLoading(true);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data.message);
          navigate('/error')
        }
        else {
          console.log(error.message);
          navigate('/error')
        }
      });
  }, [params])

  function handleClick(id) {
    if (parseInt(params.id) !== id) {
      setIsLoaded(false);
    }
  }

  return (
    <div>
      <nav className="navbar fixed-top bg-primary justify-content-center shadow p-1">
        <button className='d-md-none btn btn-primary position-absolute start-0 fs-5 pe-4'
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasResponsive">
          More<span className='fs-5 position-absolute' style={{ top: "20%" }}>▾</span>
        </button>
        <Link to="/" className="navbar-brand text-white" >
          <h3 className='mb-0 fw-normal'>
            <img className='logo-icon me-3' src={icon} alt="" />
            Uri's Diner
          </h3>
        </Link>
      </nav>
      <div className='container-fluid' >
        <div className='row'>
          <div className='col-md-3 sidebar-container'>
            <div className='bg-white shadow' >
              <div className='offcanvas-md offcanvas-start p-3 sidebar' tabIndex="-1" id="offcanvasResponsive">
                <div className="offcanvas-header">
                  <div></div> {/* empty div for centering */}
                  <h3 className="offcanvas-title ms-4" id="offcanvasLabel">Categories</h3>
                  <button className="btn-close"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#offcanvasResponsive"></button>
                </div>
                <div>
                  <h3 className="offcanvas-title d-none d-md-block mb-3 text-center">Categories</h3>
                  {!categories ?
                    <div className='text-center'>
                      <div className="spinner-border text-secondary">
                      </div>
                    </div>
                    :
                    <div>
                      {categories.map(category =>
                        <div className='text-center mb-4' key={category.id}>
                          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive">
                            <Link to={"/menu/" + category.id}
                              className='text-decoration-none link-dark'
                              onClick={() => handleClick(category.id)}  >
                              <div className='mb-1'>
                                <img className='rounded-1 object-fit-cover cat-image' src={category.image_src} alt="" />
                              </div>
                              <h5>{category.name}</h5>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='col position-relative dishesarea' >
            {isLoading &&
              <PreloadMedia media={media} onFinished={() => { setIsLoaded(true); setIsLoading(false) }} />
            }
            {!isLoaded ?
              <LoadingBar />
              :
              <div>
                <div className='row text-center'>
                  <h1 className='mb-4'>{shownCategory.name}</h1>
                </div>
                <div className='row'>
                  {dishes.map(dish =>
                    <OneDish key={dish.id} dish={dish} />
                  )}
                </div>
                <div className='row mt-4'>
                  <div className='d-flex justify-content-center'>
                    <p className='me-2'><TagVegeterian /> Vegeterian</p>
                    <p><TagGlutenFree /> Gluten Free</p>
                  </div>
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