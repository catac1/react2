import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [idStatus, setIdStatus] = useState(null);
    const timerRef = useRef(null);

    const onChangeId= async (e) => {
        //현재 입력한 아이디 가져오기
        const id = e.target.value;

        //기존 타이머 제거
        clearTimeout(timerRef.current);

        // 0.5초 후 아이디 중복체크
        timerRef.current = setTimeout(async () => {
            const url = `/api/member/idcheck.json?id=${id}`;
            const { data } = await axios.get(url);
            console.log(data);
            if (data.status === 200) {
                console.log(data);
                if ( data.result === 1) {
                    setIdStatus(false);
                } else {
                    setIdStatus(true);
                }
            }
        }, 500);
    }

    const onFinish = async (values) => {
        const url = '/api/member/join.json';
        const body = values;
        const { data } = await axios.post(url, body);
        if (data.status === 200) {
            console.log(data);
            alert('회원가입 완료');
            navigate('/login');
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
                    name="id"
                    rules={[{ required: true, message: '아이디를 입력하세요!' }]}
                    extra={
                        idStatus === true ? (
                            <span style={{ color: 'green' }}>사용가능</span>
                        ) : idStatus == false ? (
                            <span style={{ color: 'red' }}>사용불가</span>
                        ) : null
                    }
                >
                    <Input onChange={onChangeId} />
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
                    label="이메일"
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력하세요!' }]}
                >
                    <Input />
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