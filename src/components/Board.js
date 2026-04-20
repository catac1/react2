import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

const Board = () => {

    // 컬럼의 명칭, dataIndex는 백엔드에서 오는 키값, key는 Table을 위한 고유 키값
    const columns = [
        { title: '번호', dataIndex: 'num', key: 'num' },
        { title: 'key', dataIndex: 'key', key: 'key' },
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
                num: total - (page - 1) * cnt - index,
            };
        });
    }, [rows])

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={processedRows} pagination={false} onRow={onRow}
                rowKey={'_id'} // This is needed for warning `key must be  unique.`
            />
        </div>
    );
};

export default Board;