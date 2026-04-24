import { Button, Form, Input } from 'antd';
import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';

const Chat = () => {

    const [mqttClient, setMqttClient] = useState(null);
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const client = mqtt.connect("ws://192.168.0.7:19001", {
            clean: true,
            reconnectPeriod: 2000,
            clientId: `cid1_${new Date().getTime()}`, //고유번호가 들어가야함
        });

        setMqttClient(client);

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

        // Clean up function for useEffect. When the clean up function runs?ㅋ
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

    const onFinish = (values) => {
        console.log(values);
        if (mqttClient) {
            mqttClient.publish("class207/cid1", JSON.stringify(values));
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