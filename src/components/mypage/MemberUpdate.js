import React, { useEffect } from 'react';
import api from '../../api/axios';
import { Button, Form, Input, InputNumber } from 'antd';

const MemberUpdate = () => {

    const [form] = Form.useForm();

    const handleData = async () => {
        const url = `/member/selectone.json`;
        const { data } = await api.get(url);
        console.log(data);
        form.setFieldsValue({
            id: data.result._id,
            age: data.result.age,
            name: data.result.name,
            email: data.result.email,
        });
    }

    const onFinish = async (values) => {
        const url = `/member/update.json`;
        const { data } = await api.put(url, values);
        console.log(data);
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <h1> 정보수정 </h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    label='아이디'
                    name='id'
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label='이름'
                    name='name'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='나이'
                    name='age'
                >
                    <InputNumber min={1} max={150}/>
                </Form.Item>
                <Form.Item
                    label='이메일'
                    name='email'
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"> 수정 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MemberUpdate;