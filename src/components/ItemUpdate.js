import { Button, Form, Image, Input, InputNumber, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ItemUpdate = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const [form] = Form.useForm();
    const [result, setResult] = useState({});
    const [image, setImage] = useState(null);

    const [fileList, setFileList] = useState([]);

    const handleData = async () => {
        const url = `/api/item/selectone.json?no=${code}`;
        const { data } = await axios.get(url);
        console.log(data);
        if (data.status === 200) {
            setResult(data.result);
            setImage(data.result.img);
            form.setFieldsValue({
                name: data.result.name,
                content: data.result.content,
                price: data.result.price,
                quantity: data.result.quantity,
                regdate: data.result.regdate2,
            });
            setFileList([
                {
                    uid: '-1',
                    name: data.result.name,
                    status: 'done',
                    url: data.result.img,
                }
            ]);
        }
    };

    const onFinish = async (values) => {
        // const url = `/api/item/update.json?no=${code}`;//이미지 없는 url
        const url = `/api/item/updateimage.json?no=${code}`;//이미지 있는 url
        const body = values;
        values.image = image;
        const headers = { "Content-Type": "multipart/form-data" };
        const { data } = await axios.put(url, body, { headers });
        console.log(values);
        if (data.status === 200) {
            alert('수정 완료');
            navigate(`/seller/view?code=${code}`);
        } else {
            console.log(data);
        }
    };

    const onChange = (e) => {
        console.log(e);
        if (e.fileList.length > 0) {
            setFileList([
                {
                    uid: '-1',
                    name: e.fileList[0].name,
                    status: 'done',
                    url: URL.createObjectURL(e.fileList[0].originFileObj),
                }
            ]);
            setImage(e.fileList[0].originFileObj);
        } else {
            setFileList([]);
            setImage(null);
        }
    };

    const customRequest = () => {
        return false;
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <h1> 아이템 수정 </h1>
            <p>번호: {code}</p>
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

            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    label="물품명"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="물품내용"
                    name="content"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="물품가격"
                    name="price"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="물품수량"
                    name="quantity"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">수정</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemUpdate;