import React, { useState } from "react";
import { useMountEffect } from "../../hooks/useMountEffect";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { Layout, Menu, Breadcrumb } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import WritesTable from "../../components/WritesTable/WritesTable";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const PageContent = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
`;

export default function Main() {
  const [writes, setWrites] = useState([]);

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
            <Menu.Item key="settings:1" icon={<UserOutlined />} onClick={() => auth.signOut()}>
              Profile
            </Menu.Item>
            <Menu.Item key="settings:2" icon={<LogoutOutlined />} onClick={() => auth.signOut()}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
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
