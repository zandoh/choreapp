import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { rootReducer } from "./store/store";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "@chakra-ui/core";
import { appTheme } from "./theme";

export const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
