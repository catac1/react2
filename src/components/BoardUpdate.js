import { Form, Button, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const BoardUpdate = () => {

    // state 변수가 필요한데 antd form에서는 form이 필요함
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [searchParams] = useSearchParams();
    const no = searchParams.get('no');

    const onFinish = async (values) => {
        values.content = quillRef.current.root.innerHTML;
        console.log(values);

        const url = `/api/board/update.json?no=${no}`;
        const { data } = await axios.put(url, values);
        if ( data.status === 200 ) {
            alert('글변경 성공"');
            navigate(`/board/view?no=${no}`);
        } 
        else {
            alert('수정 실패');
        }
    };

    const handleData = async () => {
        const url = `/api/board/selectone.json?no=${no}`;
        const { data } = await axios.get(url);
        console.log(data);
        if ( data.status === 200 ) {
            form.setFieldsValue({
                writer: data.result.writer,
                title: data.result.title,
            });
            quillRef.current.root.innerHTML = data.result.content;
            console.log(quillRef.current);
        }
    };

    useEffect(() => {
        handleData();
        if (!quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                modules: {
                    toolbar: toolbarOptions,
                },
                theme: 'snow',
            });
        }
    }, []);

    return (
        <div>
            <Form form={form} onFinish={onFinish}>
                <Form.Item name={"title"}>
                    <Input placeholder='제목을 입력하세요.' />
                </Form.Item>

                <Form.Item>
                    <div ref={editorRef} style={{ height: '300px' }}></div>
                </Form.Item>

                <Form.Item name={"writer"}>
                    <Input placeholder='작성자를 입력하세요.' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>글변경</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BoardUpdate;