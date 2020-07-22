import React, { useState } from "react";
import { Breadcrumb } from "antd";

import Layout from "../../components/Layout/Layout";
import { db } from "../../firebase";
import WritesTable from "../../components/WritesTable/WritesTable";
import { useMountEffect } from "../../hooks/useMountEffect";
import SEO from "../../components/SEO/SEO";
import PageContent from "../../components/PageContent/PageContent";

export default function Main() {
  const [writes, setWrites] = useState([]);

  useMountEffect(() => {
    const writesRef = db.collection("writes");

    writesRef.onSnapshot(({ docs }) => {
      const allWrites = [];

      docs.map((obj) => allWrites.push({ ...obj.data(), id: obj.id }));

      setWrites(allWrites);
    });
  });

  return (
    <>
      <SEO title="Writes" />

      <Layout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Writes</Breadcrumb.Item>
        </Breadcrumb>
        <PageContent>
          <WritesTable dataSource={writes} />
        </PageContent>
      </Layout>
    </>
  );
}
