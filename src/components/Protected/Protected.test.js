import React from "react";
import { render, cleanup } from "@testing-library/react";

import Protected from "./Protected";
import { UserContext } from "../../providers/UserProvider";

function renderWithContext(fragment, user) {
  return render(<UserContext.Provider value={{ user }}>{fragment}</UserContext.Provider>);
}

function Foo() {
  return <div data-testid="bar-view">bar</div>;
}

const mockUser = { email: "a@siekierski.ml" };

afterEach(() => {
  cleanup();
});

it("renders without crashing, when passed user object", () => {
  renderWithContext(<Protected view={Foo} />, mockUser);
});

it("renders without crashing, when didn't pass user object", () => {
  renderWithContext(<Protected view={Foo} />);
});

it("renders the view properly", () => {
  const { getByTestId } = renderWithContext(<Protected view={Foo} />, mockUser);

  expect(getByTestId("bar-view")).toBeInTheDocument();
  expect(getByTestId("bar-view").textContent).toBe("bar");
});

it("renders the view without changing anything", () => {
  const { container } = renderWithContext(<Foo />, mockUser);

  expect(container).toMatchSnapshot();
});
