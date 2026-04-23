import { Button } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Mypage = () => {
    return (
        <div>
            <h1> Mypage </h1>
            <hr />

            <Link to="/mypage/update"><Button size='small'> 정보변경 </Button></Link>
            <Link to="/mypage/password"><Button size='small'> 암호변경 </Button></Link>
            <Link to="/mypage/delete"><Button size='small' danger> 탈퇴 </Button></Link>
            
            <Outlet />
        </div>
    );
};

export default Mypage;