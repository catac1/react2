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
import BoardDelete from './components/BoardDelete';
import BoardUpdate from './components/BoardUpdate';
import Seller from './components/Seller';
import ItemInsert from './components/ItemInsert';
import ItemView from './components/ItemView';
import Register from './components/Register';
import ItemUpdate from './components/ItemUpdate';
import { useSelector } from 'react-redux';
import Logout from './components/Logout';
import Mypage from './components/Mypage';
import MemberUpdate from './components/mypage/MemberUpdate';
import MemberPassword from './components/mypage/MemberPassword';
import MemberDelete from './components/mypage/MemberDelete';
import Chat from './components/Chat';

const App = () => {

    const { logged, token, counter } = useSelector((state) => state.LoggedReducer);

    const handleClick = () => {
        alert("버튼 클릭됨");
    };

    return (
        <div className='App'>
            <p>로그인 상태: {logged}</p>
            <p>토큰 {token}</p>
            <p>카운터: {counter}</p>
            <hr />

            <Menu />

            <Routes>
                {/* <Route path="/" element={<Home />}></Route> <= this also works without changing url */}
                <Route path="/" element={<Navigate to="/home" replace />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/board" element={<Board />}></Route>
                <Route path="/seller" element={<Seller />}></Route>
                <Route path="/board/write" element={<BoardWrite />}></Route>
                <Route path="/board/view" element={<BoardView />}></Route>
                <Route path="/board/delete" element={<BoardDelete />}></Route>
                <Route path="/board/update" element={<BoardUpdate />}></Route>
                <Route path="/seller/write" element={<ItemInsert />}></Route>
                <Route path="/seller/view" element={<ItemView />}></Route>
                <Route path="/seller/update" element={<ItemUpdate />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/mypage" element={<Mypage />}>
                    <Route path="update" element={<MemberUpdate />} />
                    <Route path="password" element={<MemberPassword />} />
                    <Route path="delete" element={<MemberDelete />} />
                </Route>
                <Route path="/chat" element={<Chat />}></Route>
            </Routes>
            <Footer title="footer" copyright="@2026 copyright" handleClick={handleClick} />
        </div>
    );
};

export default App;