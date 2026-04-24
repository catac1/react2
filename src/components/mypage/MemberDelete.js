import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const MemberDelete = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log(values);
        const url = "/member/delete.json";
        const { data } = await api.delete(url, { data: values });
        console.log(data);
        if (data.status === 200) {
            alert("회원탈퇴 되었습니다.");
            dispatch({ type: "LOGOUT" });
            navigate("/home");
        } else {
            alert("회원탈퇴 실패");
        }
    }

    return (
        <div>
            <h1> 회원탈퇴</h1>

            <Form onFinish={onFinish}>
                <Form.Item name={"password"} label={"비밀번호"}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">탈퇴</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MemberDelete;