import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import React from 'react';

const Register = () => {
    const onFinish = async (values) => {
        const url = '/api/user/register.json';
        const { data } = await axios.post(url, values);
        if (data.status === 200) {
            console.log(data);
            alert('회원가입 완료');
        }

    };
    return (
        <div>
            <h1> 회원 가입 </h1>
            <Form>
                <Form.Item
                    name="id"
                    label="아이디"
                    rules={{ required: true, message: "아이디를 입력하세요" }}>
                    <Input placeholder='아이디를 입력하세요' />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="암호"
                    rules={{ required: true }}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="암호확인"
                    dependencies={['password']}
                    rules={{ required: true }}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="나이"
                    rules={{ required: true, message: "나이를 입력하세요" }}>
                    <InputNumber placeholder='나이' />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="이름"
                    rules={{ required: true, message: "이름을 입력하세요" }}>
                    <InputNumber placeholder='이름' />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="이메일"
                    rules={{ required: true, message: "이메일을 입력하세요" }}>
                    <Input placeholder='이메일' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType='submit'> 회원가입 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;