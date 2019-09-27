import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { renderWithRouter } from "../../testUtils";
import { CognitoService } from "../../services/cognito";
import { Provider } from "react-redux";
import { ThemeProvider } from "emotion-theming";
import { appTheme } from "../../theme";
import { CSSReset } from "@chakra-ui/core";
import { UserState } from "../../store/user/types";
import { createStore } from "redux";
import { rootReducer } from "../../store/store";

test("renders without crashing", () => {
  console.log("renders without crashing..........");
  const persistedUser: UserState = {
    jwt: CognitoService.getUserTokenFromLocalStorage()
  };

  const store = createStore(rootReducer, { user: persistedUser });
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>,
    div
  );
});

fdescribe("routes", () => {
  test("should redirect to dashboard", () => {
    const { container } = renderWithRouter(<App />, "/");
    console.log("container ", container);
  });

  test("should route to login", () => {});

  test("should deny access to dashboard", () => {});

  test("should route to dashboard", () => {});

  test("should route to 404", () => {});
});
