import React, { useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "@reach/router";

import { useMountEffect } from "../../hooks/useMountEffect";
import { db } from "../../firebase";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/SEO/SEO";
import PageContent from "../../components/PageContent/PageContent";

export default function Write(props) {
  const [write, setWrite] = useState({});

  useMountEffect(() => {
    db.collection("writes")
      .doc(props.writeId)
      .get()
      .then((docRef) => {
        setWrite(docRef.data());
      });
  });

  return (
    <>
      <SEO title={write.title} />

      <Layout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/app">Writes</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{write.title}</Breadcrumb.Item>
        </Breadcrumb>
        <PageContent>
          <h1>{write.title}</h1>
          <h4>
            <a href={write.content}>{write.content}</a>
          </h4>
          <p>{write.description}</p>
        </PageContent>
      </Layout>
    </>
  );
}
