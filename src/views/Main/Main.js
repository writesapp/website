import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useMountEffect } from "../../hooks/useMountEffect";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import WritesTable from "../../components/WritesTable/WritesTable";
import { LogoutOutlined, SettingOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { navigate } from '@reach/router';
import { Layout, Menu, Breadcrumb, Input, Modal, Button, Form, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const PageContent = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
`;
  
const StyledAvatar = styled.img`
  margin: 0 auto;
  width: 125px;
  border-radius: 50%;
  display: block;
`;

export default function Main() {
  const { user } = useContext(UserContext);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ userModalVisible, setUserModalVisible ] = useState(false);
  const [ writes, setWrites ] = useState([]);

  const submitForm = (values) => {
    setLoading(true);
    
    const data = {
      title: values.title,
      description: values.description,
      content: values.content,
      tags: values.tags,
      author: user.uid,
    };
    
    db.collection("writes").add(data);

    setLoading(false);
    setAddModalVisible(false);
  };

  const validateForm = {
    required: '${label} is required',
    types: {
      title: '${label} is not validate title!',
      description: '${label} is not validate description!',
      content: '${label} is not validate content url!',
    },
  };
  
  useMountEffect(() => {
    const writesRef = db.collection("writes");

    writesRef.get().then(({ docs }) => {
      const allWrites = [];

      docs.map((obj) => allWrites.push({ ...obj.data(), id: obj.id }));

      setWrites(allWrites);
    });
  });

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Writes</Menu.Item>
          <Menu.Item key="2" onClick={() => setAddModalVisible(true)}>Add write</Menu.Item>
          <SubMenu icon={<SettingOutlined />} style={{ float: "right" }}>
            <Menu.Item key="settings:1" icon={<UserOutlined />} onClick={() => setUserModalVisible(true)}>
              Profile
            </Menu.Item>
            <Menu.Item key="settings:2" icon={<LinkOutlined />} onClick={() => navigate('/?redirect=false')}>
              Go to main page
            </Menu.Item>
            <Menu.Item key="settings:3" icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Modal
        visible={addModalVisible}
        title="Add Write"
        onCancel={() => setAddModalVisible(false)}
        footer={null}
      >
        <Form name="new-write" labelCol={{ span: 6 }} onFinish={submitForm} validateMessages={validateForm}>
          <Form.Item name={['title']} label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['description']} label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={['content']} label="Content url" rules={[{ type: 'url', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['tags']} label="Tags">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 6}}>
            <Button key="back" onClick={() => cancelForm()}>
              Cancel
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      <Modal visible={userModalVisible} title="Profile" onCancel={() => setUserModalVisible(false)} footer={null}>
        <StyledAvatar src={user.photoURL} />
        <Title style={{ textAlign: "center", margin: 25 }} level={2}>
          {user.displayName}
        </Title>
      </Modal>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Writes</Breadcrumb.Item>
        </Breadcrumb>
        <PageContent>
          <WritesTable dataSource={writes} />
        </PageContent>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} writes.
      </Footer>
    </Layout>
  );
}
