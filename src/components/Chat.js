import { Button, Form, Input } from 'antd';
import axios from 'axios';
import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';

const Chat = () => {

    const [mqttClient, setMqttClient] = useState(null);
    const [output, setOutput] = useState([]);

    const handleMessage = async () => {
        // 이전 채팅 메세지 서버로 부터 가져오기
        // _id 기준 이후로 가져옴 _id는 메세지가 생성될때 마다 증가 하고 _id가 0일 경우 모두 가져옴.
        // %23은 #캐릭터의 url 인코딩된 값
        const topic = encodeURIComponent('class207/#');
        console.log(topic);
        const url = `/api/message/select.json?_id=${0}&topic=${topic}`;
        const { data } = await axios.get(url);
        console.log(data);

        // for (let i = 0; i < data.result.length; i++) {
        //     setOutput(prev => [...prev, {
        //         topic: data.result[i].publisher,
        //         message: data.result[i].content,
        //         timestamp: data.result[i].regdate,
        //     }]);
        // }
        const newEntries = data.result.map(item => ({
            topic: item.publisher,
            message: item.content,
            timestamp: item.regdate,
        }));
        setOutput(prev => [...newEntries, ...prev]);
    }

    useEffect(() => {
        const client = mqtt.connect("ws://192.168.0.7:19001", {
            clean: true,
            reconnectPeriod: 2000,
            clientId: `cid1_${new Date().getTime()}`, //고유번호가 들어가야함
        });

        setMqttClient(client);
        handleMessage();

        client.on("connect", () => {
            console.log("연결 성공");
        });

        client.on("message", (topic, message) => {
            console.log("메세지 도착: " + topic + " : " + message);
            const json = JSON.parse(message.toString());
            setOutput((prev) => [{
                topic: topic,
                message: json.message,
                timestamp: new Date().toLocaleString(),
            }, ...prev]);
        });

        client.on("error", (err) => {
            console.log("연결 실패: ", err.message);
            client.reconnect();
        });

        // Clean up function for useEffect. When the clean up function runs?
        // 1. Before the effect runs again
        // 2. After the component unmounts
        return () => {
            client.end();
        };
    }, []);

    useEffect(() => {
        if (mqttClient) {
            mqttClient.subscribe("class207/#");
        }

        return () => {
            if (mqttClient) {
                mqttClient.unsubscribe("class207/#");
            }
        }
    }, [mqttClient]);

    const onFinish = async (values) => {
        console.log(values);
        if (mqttClient) {
            const url = "/api/message/insert.json";

            values.topic = "class207/#";
            values.publisher = "class207/cid1";
            values.content = values.message;

            const { data } = await axios.post(url, values);
            console.log(data);

            if (data.status === 200) {
                mqttClient.publish("class207/cid1", JSON.stringify(values));
            }
        }
    };

    return (
        <div>
            <h1> 채팅 </h1>
            <Form onFinish={onFinish}>
                <Form.Item name={"message"}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">보내기</Button>
                </Form.Item>
            </Form>
            <hr />

            <div>
                {output.map((msg, index) => (
                    <div key={index}>
                        <p><strong>
                            {msg.topic} : {msg.message} : {msg.timestamp}
                        </strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;