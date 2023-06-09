import React from 'react'
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import ErrorPage from './pages/ErrorPage';
import { apiUrl } from './config';
import './css/bootstrap.css'
import './App.css';

function App() {
  const [categories, setCategories] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => {
        console.log(error.message)
        navigate('/error')
      });
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage categories={categories} />} />
        <Route path="/menu/:id" element={<MenuPage categories={categories} />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
