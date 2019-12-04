import React from "react";
import { renderWithRouter, mockReduxState } from "../../testUtil";
import ForgotPassword from "./ForgotPassword";

describe("<ForgotPassword />", () => {
	test("renders to the document", () => {
		mockReduxState({
			user: {
				jwt: undefined
			}
		});
		renderWithRouter(<ForgotPassword />);
	});
});
