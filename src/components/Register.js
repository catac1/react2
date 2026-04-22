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
            <Form
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}>
                <Form.Item
                    label="아이디"
                    name="username"
                    rules={[{ required: true, message: '아이디를 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="암호"
                    name="password"
                    rules={[{ required: true, message: '암호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="암호확인"
                    name="passwordConfirm"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '암호를 확인하세요!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('암호가 일치하지 않습니다!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="나이"
                    name="age"
                    rules={[{ required: true, message: '나이를 입력하세요!' }]}
                >
                    <InputNumber />
                </Form.Item>


                <Form.Item
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;