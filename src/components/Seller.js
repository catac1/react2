import { Button, Input, Pagination, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Seller = () => {

    const navigate = useNavigate();

    const columns = [
        { title: '번호', dataIndex: '_id', key: 'code' },
        { title: '물품명', dataIndex: 'name', key: 'name' },
        { title: '내용', dataIndex: 'content', key: 'content' },
        { title: '가격', dataIndex: 'price', key: 'price' },
        { title: '수량', dataIndex: 'quantity', key: 'quantity' },
        { title: '작성일', dataIndex: 'regdate1', key: 'regdate' },
        {
            title: '이미지', dataIndex: 'img', key: 'img',
            render: (text, record) => (
                <img src={text} alt={record.name} style={{ width: 50, height: 50 }} />
            )
        },
    ];

    const cnt = 10;
    const [text, setText] = useState('');
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const handleData = async () => {
        const url = `/api/item/selectlist.json?page=${page}&cnt=${cnt}&text=${text}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            setRows(data.result)
            setTotal(data.result)
        }
    };

    const onChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        handleData();
    }, [page, text]);

    return (
        <div>
            <h1> 판매자 </h1>
            <Link to={`/seller/write`}><Button>물품등록</Button></Link>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Input type="text" placeholder="검색어를 입력하세요"
                    style={{ width: 300 }}
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <Table columns={columns} dataSource={rows} rowKey={"_id"} pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        navigate(`/seller/view?code=${record._id}`);
                    }
                })} />
            <Pagination align='center' defaultCurrent={page} total={total}
                onChange={onChange} size='small' />
        </div>
    );
};

export default Seller;