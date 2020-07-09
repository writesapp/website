import React, { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../firebase";
import { Layout, Menu, Breadcrumb, Modal, Typography } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const StyledAvatar = styled.img`
  margin: 0 auto;
  width: 125px;
  border-radius: 50%;
  display: block;
`;

export default function Main() {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Writes</Menu.Item>
          <Menu.Item key="2">Add write</Menu.Item>
          <SubMenu icon={<SettingOutlined />} style={{ float: "right" }}>
            <Menu.Item key="settings:1" icon={<UserOutlined />} onClick={showModal}>
              Profile
            </Menu.Item>
            <Menu.Item key="settings:2" icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Modal visible={visible} title="Profile" onCancel={handleCancel} footer={null}>
        <StyledAvatar src={user.photoURL} />
        <Title style={{ textAlign: "center", margin: 25 }} level={2}>
          {user.displayName}
        </Title>
        {console.log(user)}
      </Modal>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Writes</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} writes.
      </Footer>
    </Layout>
  );
}
