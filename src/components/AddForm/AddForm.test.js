import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import AddForm from "./AddForm";

afterEach(() => {
  cleanup();
});

const validateForm = {
  required: "${label} is required", // eslint-disable-line
  types: {
    title: "${label} is not validate title!", // eslint-disable-line
    description: "${label} is not validate description!", // eslint-disable-line
    content: "${label} is not validate content url!", // eslint-disable-line
  },
};

it("renders without crashing", () => {
  render(<AddForm />);
});

it("doesn't crush when props aren't right", () => {
  render(<AddForm onFinish={false} validateMessages={false} loading={"text"} />);
});

it("doesn't crush whit no passed data", () => {
  render(<AddForm />);
});

it("submits form when data is proper", () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <AddForm onFinish={onSubmit()} validateMessages={validateForm} loading={false} />,
  );
  const inputValue = {
    title: "test title",
    description: "test description",
    url: "https://google.com",
    tags: "some tags",
  };

  fireEvent.change(getByLabelText(/title/i), { target: { value: inputValue.title } });
  fireEvent.change(getByLabelText(/description/i), { target: { value: inputValue.description } });
  fireEvent.change(getByLabelText(/content url/i), { target: { value: inputValue.url } });
  fireEvent.change(getByLabelText(/tags/i), { target: { value: inputValue.tags } });
  fireEvent.click(getByText(/submit/i));

  expect(onSubmit).toBeCalled();
});

it("shows validation when the data isn't right", () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <AddForm onFinish={onSubmit} validateMessages={validateForm} loading={false} />,
  );
  const inputValue = {
    title: "test title",
    description: "test description",
    url: "inncorect url",
    tags: "some tags",
  };

  fireEvent.change(getByLabelText(/title/i), { target: { value: inputValue.title } });
  fireEvent.change(getByLabelText(/description/i), { target: { value: inputValue.description } });
  fireEvent.change(getByLabelText(/content url/i), { target: { value: "inncorect url" } });
  fireEvent.change(getByLabelText(/tags/i), { target: { value: inputValue.tags } });
  fireEvent.click(getByText(/submit/i));

  expect(onSubmit).not.toBeCalled();
});

it("shows validation when form isn't filled out", () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <AddForm onFinish={onSubmit} validateMessages={validateForm} loading={false} />,
  );
  const inputValue = {
    title: "",
    description: "",
    url: "",
    tags: "",
  };

  fireEvent.change(getByLabelText(/title/i), { target: { value: inputValue.title } });
  fireEvent.change(getByLabelText(/description/i), { target: { value: inputValue.description } });
  fireEvent.change(getByLabelText(/content url/i), { target: { value: inputValue.url } });
  fireEvent.change(getByLabelText(/tags/i), { target: { value: inputValue.tags } });
  fireEvent.click(getByText(/submit/i));

  expect(onSubmit).not.toBeCalled();
});
