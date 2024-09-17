import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './App/Home/Home'
import LoginForm from './App/Auth/LoginForm';
import SignupForm from './App/Auth/SignupForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Dashboard from './App/dashboard/Dashboard';

const App = () => {
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App