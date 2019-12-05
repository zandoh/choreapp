import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { rootReducer } from "./store/store";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "emotion-theming";
import { CSSReset } from "@chakra-ui/core";
import { appTheme } from "./theme";
import { UserState } from "./store/user/types";
import { CognitoService } from "./services/cognito";
import { Global, css } from "@emotion/core";

const persistedUser: UserState = {
	jwt: CognitoService.getUserTokenFromLocalStorage()
};

export const store = createStore(
	rootReducer,
	{ user: persistedUser },
	composeWithDevTools()
);

const globalStyles = css`
	body::-webkit-scrollbar {
		width: 1em;
	}
	body::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	body::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}
`;

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={appTheme}>
			<CSSReset />
			<Global styles={globalStyles} />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById("root") || document.createElement("div") // for testing
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
