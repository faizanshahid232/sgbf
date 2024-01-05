import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import TermPage from '../Pages/TermPage';
import SignIn from '../Pages/Auth/SignIn';
import Register from '../Pages/Auth/Register';
import MemberShipPage from '../Pages/MemberShip/MemberShipPage';
import Events from '../Pages/Events';
import Article from '../Pages/Article';
import People from '../Pages/People';
import ForgotPassword from '../Pages/Auth/ResetPassword';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/term" element={<TermPage />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/membership" element={<MemberShipPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/article" element={<Article />} />
      <Route path="/directory/people" element={<People />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Routers;
