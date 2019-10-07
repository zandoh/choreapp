import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./index";
import { createMemoryHistory } from "history";
import { ThemeProvider } from "emotion-theming";
// import { CSSReset } from "@chakra-ui/core";
import { appTheme } from "./theme";

export const renderWithRoot = (component: React.ReactElement) => {
  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          {/* <CSSReset /> */}
          {component}
        </ThemeProvider>
      </Provider>
    )
  };
};

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
