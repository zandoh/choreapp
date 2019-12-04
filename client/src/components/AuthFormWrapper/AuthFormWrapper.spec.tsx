import React from "react";
import { customRender } from "../../testUtil";
import AuthFormWrapper from "./AuthFormWrapper";

describe("<AuthFormWrapper />", () => {
	test("renders to the document", () => {
		customRender(<AuthFormWrapper />);
	});
});
