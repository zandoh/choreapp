import React from "react";
import App from "./App";
import { renderWithRoot } from "../../testUtils";

test("renders without crashing", () => {
  console.log("renders without crashing..........");
  const { container } = renderWithRoot(<App />);
  // console.log("container ", JSON.stringify(container));
});

fdescribe("routes", () => {
  // test("should redirect to dashboard", () => {
  //   const { container } = renderWithRouter(<App />, "/");
  //   console.log("container ", container);
  // });

  test("should route to login", () => {
    console.log("hello?");
  });

  test("should deny access to dashboard", () => {});

  test("should route to dashboard", () => {});

  test("should route to 404", () => {});
});
