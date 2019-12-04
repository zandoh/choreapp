import React from "react";
import { customRender } from "../../testUtil";
import Board from "./Board";

describe("<Board />", () => {
	test("renders to the document", () => {
		customRender(<Board />);
	});
});
