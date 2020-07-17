import React from "react";
import { Link } from "@reach/router";
import { Form, Input, Button, Space } from "antd";

export default function AddForm(props) {
  return (
    <Form
      name="new-write"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={props.onFinish}
      validateMessages={props.validateMessages}
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
          <Button key="back">
            <Link to="/">Cancel</Link>
          </Button>
          <Button key="submit" htmlType="submit" type="primary" loading={props.loading}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
