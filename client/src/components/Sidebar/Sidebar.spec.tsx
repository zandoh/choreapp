import React from "react";
import { customRender } from "../../testUtil";
import Sidebar from "./Sidebar";

describe("<Sidebar />", () => {
  test("renders to the document", () => {
    customRender(<Sidebar />);
  });
});
