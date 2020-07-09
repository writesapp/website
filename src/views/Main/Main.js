import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useMountEffect } from "../../hooks/useMountEffect";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { Layout, Menu, Breadcrumb, Modal, Typography } from "antd";
import WritesTable from "../../components/WritesTable/WritesTable";
import { LogoutOutlined, SettingOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { navigate } from '@reach/router';

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
  const [visible, setVisible] = useState(false);
  const [writes, setWrites] = useState([]);
  
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
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
          <Menu.Item key="2">Add write</Menu.Item>
          <SubMenu icon={<SettingOutlined />} style={{ float: "right" }}>
            <Menu.Item key="settings:1" icon={<UserOutlined />} onClick={showModal}>
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
