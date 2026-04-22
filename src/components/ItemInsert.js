import { Button, Form, Input, InputNumber, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

const ItemInsert = () => {

    const [image, setImage] = useState(null);
    const [fileList, setFileList] = useState([]);

    const customRequest = () => {
        return false;
    };

    const onChange = (e) => {
        if (e.fileList.length > 0) {
            console.log(e.fileList[0].originFileObj);
            setFileList([
                {
                    uid: '-1',
                    name: e.fileList[0].name,
                    status: 'done',
                    url: URL.createObjectURL(e.fileList[0].originFileObj)
                }
            ]);
            setImage(e.fileList[0].originFileObj);
        } else {
            setFileList([]);
            setImage(null);
        }
    };

    const onFinish = async (values) => {
        // console.log(values, image);
        values.image = image;
        const url= `/api/item/insert.json`;
        const headers = {"Content-Type": "multipart/form-data"};
        const { data } = await axios.post(url, values, { headers });
        console.log(data);
        if ( data.status === 200 ) {
            alert('등록완료');
        }
    }

    return (
        <div>
            <h1> ItemInsert </h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="물품명"
                    rules={[{ required: true, message: '물품명을 입력해주세요' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="물품내용"
                    rules={[{ required: true, message: '물품내용을 입력해주세요' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="물품가격"
                    rules={[{ required: true, message: '물품가격을 입력해주세요' }]}>
                    <InputNumber placeholder="가격을 입력해주세요" />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="물품수랑"
                    rules={[{ required: true, message: '물품수량을 입력해주세요' }]}>
                    <InputNumber placeholder="수량을 입력해주세요" />
                </Form.Item>
                <Form.Item
                    label="물품이미지">
                    <Upload listType='picture'
                        fileList={fileList}
                        maxCount={1}
                        onChange={onChange}
                        customRequest={customRequest}>
                        <Button>이미지선택</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>물품 등록</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemInsert;