import React from "react";
import { Table, Tag } from "antd";
import { navigate } from "@reach/router";

export default function WritesTable({ dataSource }) {
  return (
    <Table
      dataSource={dataSource}
      pagination={{ defaultPageSize: 10, position: ["bottomCenter"] }}
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
            {typeof tags === "string" &&
              tags
                .trim()
                .split(" ")
                .map((tag, i) => (
                  <Tag color="blue" key={tag + (i + 1)} data-testid="tag">
                    {tag}
                  </Tag>
                ))}
          </>
        )}
      />
    </Table>
  );
}
