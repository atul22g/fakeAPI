import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './App/Home/Home'
import LoginForm from './App/Auth/LoginForm';
import SignupForm from './App/Auth/SignupForm';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import Dashboard from './App/dashboard/Dashboard';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
    {/* <GoogleLogin/> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/auth/google" element={<Callback />} /> */}
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
  )
}

export default App