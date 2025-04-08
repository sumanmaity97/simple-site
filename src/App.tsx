import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './App.css'
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Profile from './screens/Profile';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import EditProfile from './screens/EditProfile';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <div style={{ paddingTop: "50px" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />

            {/* Private Routes */}
            <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
            <Route path="/editProfile" element={<PrivateRoute Component={EditProfile} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
