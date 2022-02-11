import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home.js'
import Register from './views/Register.js'
import Profile from './views/Profile.js'
import Recipes from './views/Recipes.js'
import NavBar from './components/NavBar.js'
import YourRecipes from './views/YourRecipes.js'
import EditProfile from './views/EditProfile.js'
import Pantry from './views/Pantry.js'

import { URL } from './config'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  let token;

  useEffect(
    () => {
      const verify_token = async () => {
        try {
          if (!token) {
            token = JSON.parse(localStorage.getItem('token'))
            logout()
          }
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/user/verify_token`);
          return response.data.ok ? (login(token), setUser(response.data.succ) ) : logout();
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
      <NavBar isLoggedIn={isLoggedIn} logout={logout} login={login} />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={!isLoggedIn ? <Register login={login} /> : <Navigate to='/' />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to='/' />} />
        <Route path='/pantry' element={isLoggedIn ? <Pantry pantry={user.pantry} /> : <Navigate to='/' />} />
        <Route path='/yourrecipes' element={isLoggedIn ? <YourRecipes /> : <Navigate to='/' />} />
        <Route path='/editprofile' element={isLoggedIn ? <EditProfile /> : <Navigate to='/' />} />
      </Routes>
    </Router>

    <footer>
      Serving your tastebuds since February 2022 | Contact: Thepantryapp@gmail.com
    </footer>
  </div>
}
