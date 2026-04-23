import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const MemberDelete = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');

    const onFinish = (values) => {
        console.log(values);
        setOpen(true);
        setPassword(values.password);
    }

    const handleOk = async () => {
        const url = `/member/delete.json`;
        console.log(password);
        const { data } = await api.delete(url, { data: { password: password } });
        // body로 password가 전달 delete 요청의 body 형식은 data 필드아래에 반드시 들어가야 함
        if (data.status === 200) {
            alert("회원탈퇴 완료 되었습니다");
            dispatch({ type: "LOGOUT" });
            navigate('/home', { replace: true });
        } else {
            alert("탈퇴 실패");
        }
    }

    const handleCancel = () => {
        navigate('/mypage', { replace: true });
    }

    return (
        <div>
            <h1> 회원탈퇴</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    label="비밀번호"
                    name="password"
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType='submit'>탈퇴</Button>
            </Form>
            <Modal
                open={open}
                mask={{ closable: false }}
                okText="탈퇴"
                cancelText="취소"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>회원탈퇴 하시겠습니까?</p>
            </Modal>
        </div>
    );
};

export default MemberDelete;