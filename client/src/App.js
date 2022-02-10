import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home.js'
import Register from './views/Register.js'
import Profile from './views/Profile.js'
import Recipes from './views/Recipes.js'
import NavBar from './components/NavBar.js'
import { URL } from './config'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(
    () => {
      const verify_token = async () => {
        if (token === null) return setIsLoggedIn(false);
        try {
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/user/verify_token`);
          return response.data.ok ? login(token) : logout();
        } catch (err) {
          console.log(err);
        }
      };
      verify_token();
    },
    [token]
  );

  const login = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return <div>

    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={!isLoggedIn ? <Register login={login} /> : <Navigate to='/' />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/recipes' element={<Recipes />} />
      </Routes>
    </Router>

    <footer>
      Serving your tastebuds since February 2022 | Contact: Thepantryapp@gmail.com
    </footer>
  </div>
}
