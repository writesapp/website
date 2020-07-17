import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Breadcrumb } from "antd";
import { db } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import { newWriteWebhook } from "../../helpers/discord";

import { Link, navigate } from "@reach/router";
import SEO from "../../components/SEO/SEO";
import Layout from "../../components/Layout/Layout";
import AddForm from "../../components/AddForm/AddForm";

const PageContent = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
  overflow: auto;

  @media (max-width: 800px) {
    padding: 0;
  }
`;

export default function Add({ visible, setVisible }) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const submitForm = (values) => {
    setLoading(true);

    const { title, description, content, tags } = values;

    const data = {
      title,
      description,
      content,
      tags,
      author: user.uid,
    };

    db.collection("writes")
      .add(data)
      .then(() => {
        setLoading(false);
        newWriteWebhook(user, values);
        navigate("/app");
      });
  };

  const validateForm = {
    required: "${label} is required", // eslint-disable-line
    types: {
      title: "${label} is not validate title!", // eslint-disable-line
      description: "${label} is not validate description!", // eslint-disable-line
      content: "${label} is not validate content url!", // eslint-disable-line
    },
  };

  return (
    <>
      <SEO title="Add write" />

      <Layout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add write</Breadcrumb.Item>
        </Breadcrumb>
        <PageContent>
          <AddForm onFinish={submitForm} validateMessages={validateForm} loading={loading} />
        </PageContent>
      </Layout>
    </>
  );
}
