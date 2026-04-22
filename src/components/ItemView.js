import { Button, Image } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ItemView = () => {

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
        const url = `/api/foo.json?=${code}`;
        const { data } = await axios.put(url);
        console.log(data);
        if (data.status === 200) {
            alert('물품이 삭제되었습니다.')
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
        </div >
    );
};

export default ItemView;