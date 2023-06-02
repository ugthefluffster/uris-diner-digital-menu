import React from 'react'
import { apiUrl } from '../config'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function MenuPage({ categories }) {
  const [dishes, setDishes] = React.useState([{id: 0}])
  const params = useParams()

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/dishes?category_id=${params.id}`)
      .then(response => setDishes(response.data))
  }, [params])

  return (
    <div>
      <div>
        {categories.map(category =>
          <div key={category.id}>
            <div><Link to={"/menu/" + category.id}>{category.name}</Link></div>
            <div><img src={category.image_src} style={{ width: "100px" }} alt="" /></div>
          </div>
        )}
      </div>
      <br />
      <div>
        {dishes.map(dish =>
          <div key={dish.id}>
            <div>{dish.name}</div>
            <div><img src={dish.image_src} style={{ width: "100px" }} alt="" /></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuPage