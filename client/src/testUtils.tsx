import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./index";
import { createMemoryHistory } from "history";

export const renderWithRouter = (
  component: React.ReactElement,
  route: string = "/",
  history = createMemoryHistory({ initialEntries: [route] })
) => {
  return {
    ...render(<Router history={history}>{component}</Router>),
    history
  };
};

export const renderWithRedux = (component: React.ReactElement) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};
