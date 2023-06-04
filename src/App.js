import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './css/bootstrap.css'
import './App.css';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import { apiUrl } from './config';
import axios from 'axios';

function App() {
  const [categories, setCategories] = React.useState(null)

  React.useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then(response => setCategories(response.data));
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage categories={categories} />} />
        <Route path="/menu/:id" element={<MenuPage categories={categories} />} />
      </Routes>
    </div>
  );
}

export default App;
