import React from 'react'
import { Link } from 'react-router-dom'
import dinerimage from './diner-food.jpg'
import { PreloadMedia, MediaType } from 'react-preload-media';

function WelcomePage({ categories }) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const media = [{ type: MediaType.Image, url: dinerimage }]

  return (
    <div>
      <PreloadMedia media={media} onFinished={() => { setIsLoaded(true); }} />
      {!categories || !isLoaded ?
        <div className="progress w-50 position-absolute start-50 translate-middle" style={{ top: "50vh" }} >
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" style={{ width: `100%` }}></div>
        </div>
        :
        <div style={{ height: "100vh" }} className='d-flex flex-column align-items-center justify-content-center'>
          <h1 className="text-shadow text-primary">Welcome to Uri's Diner</h1>
          <img className='m-3 rounded-5 d-none d-sm-block' style={{ maxWidth: "70vw", maxHeight: "60vh", objectFit: "cover" }} src={dinerimage} alt="" />
          <img className='m-5 d-sm-none d-block' style={{ maxWidth: "100vw", maxHeight: "60vh", objectFit: "cover" }} src={dinerimage} alt="" />
          <Link className='btn btn-secondary btn-lg text-white box-shadow' to={"/menu/" + categories[0].id}>To the menu</Link>
        </div>
      }
    </div>
  )
}

export default WelcomePage