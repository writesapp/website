import React from "react";
import { Table, Tag } from "antd";

export default function WritesTable({ dataSource }) {
  return (
    <Table dataSource={dataSource} pagination={{ defaultPageSize: 50 }}>
      <Table.Column title="Title" dataIndex="title" key="title" />
      <Table.Column title="Description" dataIndex="description" key="description" />
      <Table.Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.split(" ").map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
    </Table>
  );
}
