import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb } from "antd";

import Layout from "../../components/Layout/Layout";
import { db } from "../../firebase";
import WritesTable from "../../components/WritesTable/WritesTable";
import { useMountEffect } from "../../hooks/useMountEffect";

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
    <Layout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Writes</Breadcrumb.Item>
      </Breadcrumb>
      <PageContent>
        <WritesTable dataSource={writes} />
      </PageContent>
    </Layout>
  );
}
