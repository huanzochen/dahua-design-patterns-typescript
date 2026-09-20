import assert from "node:assert/strict";
import { test } from "node:test";

import { calculate } from "./calculator-v1.js";

test("adds two numbers", () => {
  assert.equal(calculate(10, 2, "+"), 12);
});

test("subtracts two numbers", () => {
  assert.equal(calculate(10, 2, "-"), 8);
});

test("multiplies two numbers", () => {
  assert.equal(calculate(10, 2, "*"), 20);
});

test("divides two numbers", () => {
  assert.equal(calculate(10, 2, "/"), 5);
});
