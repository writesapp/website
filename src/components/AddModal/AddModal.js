import React, { useState, useContext } from "react";
import { Modal, Form, Input, Button, Space } from "antd";
import { db } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { newWriteWebhook } from "../../helpers/discord";

export default function AddModal({ visible, setVisible }) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const submitForm = (values) => {
    setLoading(true);

    const data = {
      title: values.title,
      description: values.description,
      content: values.content,
      tags: values.tags,
      author: user.uid,
    };

    db.collection("writes")
      .add(data)
      .then(() => {
        setLoading(false);
        setVisible(false);

        newWriteWebhook(user, values);
      });
  };

  const validateForm = {
    required: "${label} is required", // eslint-disable-line
    types: {
      title: "${label} is not validate title!", // eslint-disable-line
      description: "${label} is not validate description!", // eslint-disable-line
      content: "${label} is not validate content url!", // eslint-disable-line
    },
  };

  return (
    <Modal visible={visible} title="Add Write" onCancel={() => setVisible(false)} footer={null}>
      <Form
        name="new-write"
        labelCol={{ span: 6 }}
        onFinish={submitForm}
        validateMessages={validateForm}
      >
        <Form.Item name={["title"]} label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={["description"]} label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={["content"]} label="Content url" rules={[{ type: "url", required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={["tags"]} label="Tags">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Space>
            <Button key="back" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button key="submit" htmlType="submit" type="primary" loading={loading}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
