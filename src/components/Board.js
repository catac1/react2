import { current } from '@reduxjs/toolkit';
import { Button, Input, Pagination, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Board = () => {

    // 컬럼의 명칭, dataIndex는 백엔드에서 오는 키값, key는 Table을 위한 고유 키값
    const columns = [
        { title: '번호', dataIndex: 'num', key: 'num' },
        { title: '제목', dataIndex: 'title', key: 'title' },
        { title: '작성자', dataIndex: 'writer', key: 'writer' },
        { title: '조회수', dataIndex: 'hit', key: 'hit' },
        { title: '작성일', dataIndex: 'regdate2', key: 'regdate' },
    ];

    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const [cnt, setCnt] = useState(10);
    const [rows, setRows] = useState([]); // data source
    const [total, setTotal] = useState(0); // total is needed for pagination.

    const onRow = (record, rowIndex) => {
        return {
            onClick: (event) => {
                console.log(event);
            }
        };

    };

    const handleData = async () => {
        const url = `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;
        const { data } = await axios.get(url);
        console.log(data);
        // triple equal sign is for comparison of type and value at the same time.
        if (data.status === 200) {
            setRows(data.rows);
            setTotal(data.total);
        }
    };

    // useMemo 백엔드에서 오는 데이터를 재가공 할 때 쓰는 것
    const processedRows = useMemo(() => {
        return rows.map((row, index) => {
            return {
                ...row,
                key: row._id,
                // Compact rows numbers to remove skipped row number.
                num: total - (page - 1) * cnt - index,
            };
        });
    }, [rows])

    const onChange = (page) => {
        // console.log(page);
        setPage(page);
    };

    useEffect(() => {
        handleData();
    }, [page, text]);

    return (
        <div>

            <Link to={`/board/write`}><Button>글쓰기</Button></Link>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Input type="text" placeholder="검색어를 입력하세요"
                    style={{ width: 300 }}
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <Table columns={columns} dataSource={processedRows} pagination={false} onRow={onRow} />
            <Pagination showSizeChanger={false}
                align='center' defaultCurrent={page} total={total}
                onChange={onChange} />
                
        </div>
    );
};

export default Board;