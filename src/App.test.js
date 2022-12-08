import React from "react";
import { render} from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
});

test("render Layout", () => {
  const LayoutComponent = render(<App />);
  expect(true);
});
