import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'antd';

const BoardView = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const no = searchParams.get('no');
    const page = searchParams.get('page');

    const [row, setRow] = useState({});
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);

    const handleData = async () => {
        const url = `/api/board/selectone.json?no=${no}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            setRow(data.result);
            setPrev(data.prevNo);
            setNext(data.nextNo);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('삭제할까요?')) {
            return;
        }
        const url = `/api/board/delete.json`;
        const body = { no: no };
        const { data } = await axios.delete(url, { data: body });
        console.log(data);
        if (data.status === 200) {
            navigate(`/board`);
        }
    };

    useEffect(() => {
        handleData();
    }, [no]);

    return (
        <div>
            <p> 번호 : {row._id}</p>
            <p> 제목 : {row.title}</p>
            <p> 내용 : <span dangerouslySetInnerHTML={{ __html: row.content }}></span></p>
            <p> 작성자 : {row.writer}</p>
            <p> 작성일 : {row.regdate2}</p>
            <p> 조회수 : {row.hit}</p>

            <Link to={`/board?page=${page}`}><Button size='small'> 목록 </Button></Link>
            {prev !== 0 && <Link to={`/board/view?no=${prev}`}><Button size='small'> 이전글 </Button></Link>}
            {next !== 0 && <Link to={`/board/view?no=${next}`}><Button size='small'> 다음글 </Button></Link>}
            <Link to={`/board/update?no=${no}`}><Button size='small'> 수정 </Button></Link>
            <Button size='small' onClick={handleDelete}> 삭제 </Button>
        </div>
    );
};

export default BoardView;