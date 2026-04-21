import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Board from './components/Board';
import './App.css';
import BoardWrite from './components/BoardWrite';
import BoardView from './components/BoardView';

const App = () => {
  return (
    <div className='App'>
      <Menu />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> <= this also works without changing url */}
        <Route path="/" element={<Navigate to="/home" replace />}></Route>        
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/board/write" element={<BoardWrite />}></Route>
        <Route path="/board/view" element={<BoardView />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;