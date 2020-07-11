import React from "react";
import { Table, Tag } from "antd";
import { navigate } from "@reach/router";

export default function WritesTable({ dataSource }) {
  return (
    <Table
      dataSource={dataSource}
      pagination={{ defaultPageSize: 10 }}
      onRow={(r) => ({
        onClick: () => navigate(`write/${r.id}`),
      })}
      rowKey="title"
    >
      <Table.Column title="Title" dataIndex="title" key="title" />
      <Table.Column title="Description" dataIndex="description" key="description" />
      <Table.Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags
              .trim()
              .split(" ")
              .map((tag, i) => (
                <Tag color="blue" key={tag + (i + 1)}>
                  {tag}
                </Tag>
              ))}
          </>
        )}
      />
    </Table>
  );
}
