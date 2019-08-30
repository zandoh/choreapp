import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

xit("renders welcome message", () => {
  const { getByText } = render(<App />);
  expect(getByText("src/App.tsx")).toBeInTheDocument();
});
