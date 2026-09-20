import assert from "node:assert/strict";
import { test } from "node:test";

import * as calculatorV2 from "./calculator-v2.js";

type OperationClass = {
  getResult(numberA: number, numberB: number, operator: "+" | "-" | "*" | "/"): number;
};

const Operation = (
  calculatorV2 as unknown as { Operation?: OperationClass }
).Operation;

test("Operation adds two numbers", () => {
  assert.ok(Operation);
  assert.equal(Operation.getResult(10, 2, "+"), 12);
});

test("Operation subtracts two numbers", () => {
  assert.ok(Operation);
  assert.equal(Operation.getResult(10, 2, "-"), 8);
});

test("Operation multiplies two numbers", () => {
  assert.ok(Operation);
  assert.equal(Operation.getResult(10, 2, "*"), 20);
});

test("Operation divides two numbers", () => {
  assert.ok(Operation);
  assert.equal(Operation.getResult(10, 2, "/"), 5);
});
