import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log(values);
        const url = `/api/member/login.json`;
        const body = values;
        const { data } = await axios.post(url, body);
        console.log(data);
        if (data.status === 200) {
            alert('로그인 성공');
            dispatch({ type: 'LOGIN', payload: data.token });
            navigate('/home');
        }
    }
    return (
        <div>
            <h3> 회원가입 </h3>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="id"
                    label="아이디"
                    rules={[{ required: true, message: '아이디를 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="암호"
                    rules={[{ required: true, message: '암호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'> 로그인 </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default Login;