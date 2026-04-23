import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const MemberPassword = () => {

    const navigate = useNavigate();
    
    const onFinish = async (values) => {
        const url = `/member/updatepw.json`;
        const { data } = await api.put(url, values);
        console.log(data);
        if (data.status === 200) {
            alert("암호 변경 완료");
            navigate(-1);
        } else {
            alert("암호 변경 실패");
        }
    };

    return (
        <div>
            <h1>암호변경</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    label="이전 암호"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="새 암호"
                    name="password1"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="암호 확인"
                    name="password2"
                    dependencies={['password1']}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve();   
                                }
                                return Promise.reject(new Error('패스워드가 일치하지 않습니다!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">암호 변경</Button>
                </Form.Item> 
            </Form>
        </div>
    );
};

export default MemberPassword;