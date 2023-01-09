import React from "react";
import "whatwg-fetch";
import renderer from "react-test-renderer";
import App from "./App.js";
import { render, cleanup } from "@testing-library/react";


describe("Take a snaphot", () => {
	afterEach(cleanup);

	it("should take snapshot", () => {
		const tree = renderer.create(<App />).toJSON();
	});
});
