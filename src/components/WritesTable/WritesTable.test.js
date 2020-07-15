import React from "react";
import { render, cleanup } from "@testing-library/react";

import WritesTable from "./WritesTable";

afterEach(() => {
  cleanup();
});

const sampleData = [
  {
    title: "item1",
    description: "item1 description",
    tags: "item1-tags1 item1-tags2",
  },
  {
    title: "item2",
    description: "item2 description",
    tags: "item2-tags1 item2-tags2",
  },
];

it("renders without crashing", () => {
  render(<WritesTable dataSource={sampleData} />);
});

it("doesn't crash when passed no data", () => {
  render(<WritesTable />);
});

it("doesn't crash when passed incomplete data", () => {
  render(<WritesTable dataSource={[{ title: 1, dupa: "hello world" }]} />);
});

it("renders the data", () => {
  const { getByText } = render(<WritesTable dataSource={sampleData} />);

  for (const item of sampleData) {
    expect(getByText(item.title)).toBeInTheDocument();
    expect(getByText(item.description)).toBeInTheDocument();

    const tags = item.tags.trim().split(" ");

    for (const tag of tags) {
      expect(getByText(tag)).toBeInTheDocument();
    }
  }
});

it("renders the proper number of items", () => {
  const { container } = render(<WritesTable dataSource={sampleData} />);
  const tableBody = container.querySelector(".ant-table-tbody");

  expect(tableBody.children).toHaveLength(sampleData.length);
});
