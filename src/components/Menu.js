import { Button } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';

//메뉴 항목
const items = [
    {
        label: '홈',
        key: '/home',
        icon: <MailOutlined />,
    },
    {
        label: '로그인',
        key: '/login',
        icon: <MailOutlined />,
    },
    {
        label: '게시판',
        key: '/board',
        icon: <MailOutlined />,
    },
];

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 뭐가 안된다는건지 놓쳤다.뭔가 활성화가 안된다?
    const selectedKey = location.pathname === '/' ? '/home' : location.pathname;
    // why key has slash prefix => because location.pathname has slash prefix.
    // const [current, setCurrent] = useState(location.pathname);
    const [current, setCurrent] = useState(selectedKey);

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <div>
            <AntdMenu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    );
};

export default Menu;