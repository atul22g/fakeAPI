import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './App/Home/Home'
// import LoginForm from './App/Auth/LoginForm';
import SignupForm from './App/Auth/SignupForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        {/* <Route exact path="/login" element={<LoginForm/>}/> */}
        <Route exact path="/signup" element={<SignupForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App