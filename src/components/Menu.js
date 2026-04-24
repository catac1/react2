import { Button } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';
import { useSelector } from 'react-redux';

const logoutMenus = [
    {
        label: '홈',
        key: '/home',
        icon: <MailOutlined />,
    },
    {
        label: '게시판',
        key: '/board',
        icon: <MailOutlined />,
    },
    {
        label: '판매자',
        key: '/seller',
        icon: <MailOutlined />,
    },
    {
        label: '로그인',
        key: '/login',
        icon: <MailOutlined />,
    },
    {
        label: '회원가입',
        key: '/register',
        icon: <MailOutlined />,
    },
    {
        label: '실시간채팅',
        key: '/chat',
        icon: <MailOutlined />,
    },
];

const loginMenus = [
    {
        label: '홈',
        key: '/home',
        icon: <MailOutlined />,
    },
    {
        label: '게시판',
        key: '/board',
        icon: <MailOutlined />,
    },
    {
        label: '판매자',
        key: '/seller',
        icon: <MailOutlined />,
    },
    {
        label: "로그아웃",
        key: "/logout",
        icon: <MailOutlined />
    },
    {
        label: "마이페이지",
        key: "/mypage",
        icon: <MailOutlined />
    },
];

let items = logoutMenus;

const Menu = () => {
    //메뉴 항목
    const { logged } = useSelector((state) => state.LoggedReducer);
    // 로그아웃 상태 (6개)
    if (logged === 0) {
        items = logoutMenus;
    }
    // 로그인 상태 (4개)
    else if (logged === 1) {
        items = loginMenus;
    }

    // 그냥 화면에서는 렌더링이 많을 수 있음 그럴땐 useEffect를 써라

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