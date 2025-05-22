
// `components` se `Header` aur `Footer` ko import karne ke liye `index.js` ka use kiya gaya
// redundant imports ko simplify kiya aur existing imports ko consistent banaya

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex-wrap content-between ">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer  />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
