import { Button, Image } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ItemView = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const [result, setResult] = useState({});

    // 자식에게 넘어가서 여러번 호출되는 것을 방지하기 위해
    const handleData = useCallback(async () => {
        const url = `/api/item/selectone.json?no=${code}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            setResult(data.result);
        }
    }, [code]);

    const handleDelete = async () => {
        if (!window.confirm('삭제할까요?')) {
            return;
        }
        const url = `/api/item/delete.json`;
        const body = { no: code };
        const { data } = await axios.delete(url, { data: body });
        console.log(data);
        if (data.status === 200) {
            alert('삭제 완료')
            navigate('/seller');
        }
    };

    useEffect(() => {
        handleData();
    }, [handleData]);

    return (
        <div>
            <h1> ItemView </h1>
            <p>{code}</p>
            <p>번호: {result._id}</p>
            <p>물품명: {result.name}</p>
            <p>물품내용: {result.content}</p>
            <p>물품가격: {result.price}</p>
            <p>물품수량: {result.quantity}</p>
            <p>물품이미지:</p>
            <Image alt={result.name} src={result.img} style={{ width: 200, height: 200 }} />
            <br /><hr />
            <Link to={`/seller`}><Button size='small'>목록</Button></Link>
            <Button size='small' onClick={handleDelete}>삭제</Button>
            <Link to={`/seller/update?code=${code}`}><Button size='small'>수정</Button></Link>
        </div >
    );
};

export default ItemView;