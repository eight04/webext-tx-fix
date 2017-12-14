const {describe, it} = require("mocha");
const assert = require("power-assert");
const {fixMessages} = require("./index");

describe("fixMessages", () => {
	it("strip untranslated", () => {
		const translate = {a: {message: "a"}};
		fixMessages({a: {message: "a"}}, translate);
		assert(Object.keys(translate).length === 0);
	});
	
	it("re-add placeholders", () => {
		const translate = {a: {message: "a"}};
		const placeholders = {};
		fixMessages({a: {placeholders}}, translate);
		assert(translate.a.placeholders === placeholders);
	});
	
	it("isEdited flag", () => {
		assert(fixMessages({a: {message: "a"}}, {a: {message: "a"}}));
		assert(!fixMessages({a: {message: "a"}}, {a: {message: "b"}}));
		assert(fixMessages({a: {message: "a", placeholders: {}}}, {a: {message: "b"}}));
		assert(!fixMessages({a: {message: "a", placeholders: {}}}, {a: {message: "b", placeholders: {}}}));
	});
});
