import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { navigate } from '@reach/router';
import { useMountEffect } from '../../hooks/useMountEffect';

import Layout from '../../components/Layout/Layout';
import { Breadcrumb } from "antd";

const PageContent = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
  overflow: auto;

  @media (max-width: 800px) {
    padding: 12px;
  }
`;

export default function Write(props) {
  const [ write, setWrite ] = useState({});

  useMountEffect(() => {
    db.collection('writes').doc(props.writeId).get().then((docRef) => {
      console.log(docRef.data());
      setWrite(docRef.data());
    });
  });

  return (
    <Layout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{write.title}</Breadcrumb.Item>
      </Breadcrumb>
      <PageContent>
        <h1>{write.title}</h1>
        <h4><a href={write.content}>{write.content}</a></h4>
        <p>{write.description}</p>
      </PageContent>
    </Layout>
  )
};