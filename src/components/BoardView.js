import React, { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const BoardView = () => {

    const [searchParams] = useSearchParams();
    const no = searchParams.get('no');
    
    const handleData = async () => {
        const url = `/api/board/select.json?no=${no}`;
        const { data } = await axios.get(url);
        console.log(data);
    };

    return (
        <div>
            <p> 번호 : {no}</p>
        </div>
    );
};

export default BoardView;