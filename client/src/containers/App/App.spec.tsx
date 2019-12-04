import React from "react";
import App from "../App/App";
import { customRender } from "../../testUtil";

describe("<App />", () => {
	test("renders into document", () => {
		customRender(<App />);
	});
});
