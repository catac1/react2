import { Button, Input, Form } from 'antd';
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const BoardWrite = () => {

    // 리액트는 아이디로 참조가 되지 않으므로 레퍼런스를 생성해서 문제를 해결
    // div ref를 담을 변수, div와 연결시킬 변수
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        // 연결된 항목이 있을때
        if (!quillRef.current) {
            // Quill 에디터를 생성
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    }, []);

    return (
        <div>
            <Form>
                <Form.Item>
                    <Input placeholder='제목을 입력하세요.' />
                </Form.Item>
                <Form.Item>
                    <div ref={editorRef} style={{ height: '300px' }}></div>
                </Form.Item>
                <Form.Item>
                    <Input placeholder='작성자를 입력하세요.' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary'>글쓰기</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BoardWrite;