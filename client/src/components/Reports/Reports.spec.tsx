import React from "react";
import { customRender } from "../../testUtil";
import Reports from "./Reports";

describe("<Reports />", () => {
	test("renders to the document", () => {
		customRender(<Reports />);
	});
});
