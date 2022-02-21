import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home.js'
import Register from './views/Register.js'
import Profile from './views/Profile.js'
import Recipes from './views/Recipes.js'
import YourRecipes from './views/YourRecipes.js'
import EditProfile from './views/EditProfile.js'
import Pantry from './views/Pantry.js'
import NavBar from './components/NavBar.js'

import { URL } from './config'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    pantry: []
  })
  let token = localStorage.getItem('token');

  useEffect(
    () => {
      const verify_token = async () => {
        try {
          // token = localStorage.getItem('token')
          if (!token) {
            return logout()
          }
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/user/verify_token`);
          console.log('verify: ', response.data.user)
          
          return response.data.ok ? (login(token, response.data.user), setUser(response.data.user)) : logout();
        } catch (err) {
          console.log(err);
        }
      };
      verify_token();
    },
    []
  );

  const login = (token,userData) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    //send user data so on login user information is available
    setUser(userData)
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const updateUser = async (key, value) => {
    try {
      const copy = { ...user }
      copy[key] = value
      const res = await axios.post(`${URL}/user/update`, { copy })
      setUser(res.data.user)
      console.log('update: ', res.data.user.pantry);
    } catch (err) {
      console.error(err)
    }
  }

  return <div>

    <Router>
      <NavBar isLoggedIn={isLoggedIn} logout={logout} login={login} />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={!isLoggedIn ? <Register login={login} /> : <Navigate to='/' />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/profile' element={isLoggedIn ? <Profile user={user}/> : <Navigate to='/' />} />
        <Route path='/pantry' element={isLoggedIn ? <Pantry pantry={user?.pantry} updateUser={updateUser} /> : <Navigate to='/' />} />
        <Route path='/yourrecipes' element={isLoggedIn ? <YourRecipes user={user} isLoggedIn={isLoggedIn} updateUser={updateUser} /> : <Navigate to='/' />} />
        <Route path='/editprofile' element={isLoggedIn ? <EditProfile updateUser={updateUser} isLoggedIn={isLoggedIn} user={user} logout={logout}/> : <Navigate to='/' />} />
      </Routes>
    </Router>

    <footer>
      Serving your tastebuds since February 2022 | Contact: Thepantryapp@gmail.com
    </footer>
  </div>
}
