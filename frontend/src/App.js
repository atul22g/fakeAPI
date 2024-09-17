import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './App/Home/Home'
import LoginForm from './App/Auth/LoginForm';
import SignupForm from './App/Auth/SignupForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App