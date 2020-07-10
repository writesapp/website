import React from "react";
import { Table, Tag } from "antd";

export default function WritesTable({ dataSource }) {
  return (
    <Table dataSource={dataSource} pagination={{ defaultPageSize: 50 }} rowKey="title">
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
                <Tag color="blue" key={`${tag}_${i}`}>
                  {tag}
                </Tag>
              ))}
          </>
        )}
      />
    </Table>
  );
}
