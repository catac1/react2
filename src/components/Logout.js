import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/home', { replace: true });
    };

    const handleCancel = () => {
        navigate('/home', { replace: true });
    };

    return (
        <div>
            <Modal
                open={true}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="로그아웃"
                cancelText="취소"
                mask={{ closable: false }}
            >
                <p> 로그아웃 하시겠습니까? </p>
            </Modal>
        </div>
    );
};

export default Logout;