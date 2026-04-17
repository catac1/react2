import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Flex } from 'antd';
import Menu from './components/Menu';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;