import React from "react";
import { renderWithRouter, mockReduxState } from "../../testUtil";
import ProtectedRoute from "./ProtectedRoute";

describe("<ProtectedRoute />", () => {
  test("renders to the document", () => {
    renderWithRouter(<ProtectedRoute />);
  });

  test("renders for valid user session", () => {
    renderWithRouter(<ProtectedRoute />);
  });

  test("redirects to login for invalid user session", async () => {
    mockReduxState({
      user: {
        jwt: undefined
      }
    });
    renderWithRouter(<ProtectedRoute />, { route: "/dashboard" });
  });
});
