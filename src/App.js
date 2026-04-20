import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Board from './components/Board';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Menu />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/board" element={<Board />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;