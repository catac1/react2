import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <h1> Menu </h1>   
            <Link to="/"> <Button type="primary">홈화면</Button></Link>
            <Link to="/login"> <Button type="primary">회원가입</Button></Link>
        </div>
    );
};

export default Menu;