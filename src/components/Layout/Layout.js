import React, { useState } from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { navigate } from "@reach/router";

import UserModal from "../UserModal/UserModal";
import AddModal from "../AddModal/AddModal";
import { auth } from "../../firebase";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const StyledContent = styled(Content)`
  padding: 0 50px;

  @media (max-width: 800px) {
    padding: 0 25px;
  }
`;

export default function AppLayout({ children }) {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <Menu.Item key="1" onClick={() => navigate("/")}>
            Writes
          </Menu.Item>
          <Menu.Item key="2" onClick={() => setAddModalVisible(true)}>
            Add write
          </Menu.Item>
          <SubMenu icon={<SettingOutlined />} style={{ float: "right" }}>
            <Menu.Item
              key="settings:1"
              icon={<UserOutlined />}
              onClick={() => setUserModalVisible(true)}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              key="settings:2"
              icon={<LinkOutlined />}
              onClick={() => navigate("/?redirect=false")}
            >
              Go to main page
            </Menu.Item>
            <Menu.Item key="settings:3" icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <StyledContent>{children}</StyledContent>
      <Footer style={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} writes.
      </Footer>

      <AddModal visible={addModalVisible} setVisible={setAddModalVisible} />
      <UserModal visible={userModalVisible} setVisible={setUserModalVisible} />
    </Layout>
  );
}
