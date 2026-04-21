import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BoardDelete = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const no = searchParams.get('no');

    const handleDelete = async () => {
        const url = `/api/board/delete.json`;
        const body = { no: no };
        const { data } = await axios.delete(url, { data: body });
        console.log(data);
        if (data.status === 200) {
            navigate('/board');
        }
    };

    useEffect(() => {
        if (window.confirm('삭제할까요?')) {
            handleDelete();
        }
        else {
            navigate(`/board/view?no=${no}`);
        }
    }, []);

    return (
        <div>
        </div>
    );
};

export default BoardDelete;