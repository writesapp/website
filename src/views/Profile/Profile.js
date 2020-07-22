import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "@reach/router";

import Layout from "../../components/Layout/Layout";
import PageContent from "../../components/PageContent/PageContent";
import SEO from "../../components/SEO/SEO";
import Profile from "../../components/Profile/Profile";

function ProfilePage() {
  return (
    <>
      <SEO title="Writes" />

      <Layout>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/app">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <PageContent>
          <Profile />
        </PageContent>
      </Layout>
    </>
  );
}

export default ProfilePage;
