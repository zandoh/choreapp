import React from "react";
import { customRender } from "../../testUtil";
import Header from "./Header";

describe("<Header />", () => {
  test("renders to the document", () => {
    customRender(<Header />);
  });
});
