import React, { useState, useContext } from "react";
import { auth, db } from "../../firebase";
import { UserContext } from '../../providers/UserProvider';
import { navigate } from '@reach/router';
import { Layout, Menu, Breadcrumb, Input, Modal, Button, Form } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

export default function Main() {
  const { user } = useContext(UserContext);
  const [ addModalVisible, setAddModalVisible ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const cancelForm = () => {
    //clear up the form
    setAddModalVisible(false);
  };

  const submitForm = (values) => {
    setLoading(true);
    //get data from form and send to db
    const data = {
      title: values.title,
      description: values.description,
      content: values.content,
      tags: values.tags,
      author: user.uid,
    };
    console.log(data);
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

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Search
            placeholder="search for writes."
            onSearch={(value) => console.log(value)}
            style={{ width: 250, marginRight: 25 }}
          />
          <Menu.Item key="1">Writes</Menu.Item>
          <Menu.Item key="2" onClick={() => setAddModalVisible(true)}>Add write</Menu.Item>
          <SubMenu icon={<SettingOutlined />} style={{ float: "right" }}>
            <Menu.Item key="settings:1" icon={<UserOutlined />} onClick={() => alert('profile')}>
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
        onCancel={() => cancelForm()}
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
      </Modal>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Writes</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} writes.
      </Footer>
    </Layout>
  );
}
