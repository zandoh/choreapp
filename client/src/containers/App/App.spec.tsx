import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { renderWithRouter } from "../../testUtils";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

fdescribe("routes", () => {
  it("should redirect to dashboard", () => {
    const { container } = renderWithRouter(<App />, "/");
    console.log("container ", container);
  });

  it("should route to login", () => {});

  it("should deny access to dashboard", () => {});

  it("should route to dashboard", () => {});

  it("should route to 404", () => {});
});
