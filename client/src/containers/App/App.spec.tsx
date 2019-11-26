import React from "react";
import App from "../App/App";
import { customRender } from "../../testUtil";
jest.mock("../../services/cognito");

describe("<App />", () => {
  test("renders into document", () => {
    customRender(<App />);
  });
});
