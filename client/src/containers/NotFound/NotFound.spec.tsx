import React from "react";
import { renderWithRouter } from "../../testUtil";
import NotFound from "./NotFound";

describe("<NotFound />", () => {
  test("renders to the document", () => {
    renderWithRouter(<NotFound />);
  });
});
