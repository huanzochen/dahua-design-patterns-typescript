import assert from "node:assert/strict";
import { test } from "node:test";

import { Operation, OperationFactory } from "./calculator-v4.js";

function getResult(operator: string, numberA: number, numberB: number): number {
  const operation: Operation = OperationFactory.createOperation(operator);
  operation.numberA = numberA;
  operation.numberB = numberB;
  return operation.getResult();
}

test("factory creates an addition operation", () => {
  assert.equal(getResult("+", 10, 2), 12);
});

test("factory creates a subtraction operation", () => {
  assert.equal(getResult("-", 10, 2), 8);
});

test("factory creates a multiplication operation", () => {
  assert.equal(getResult("*", 10, 2), 20);
});

test("factory creates a division operation", () => {
  assert.equal(getResult("/", 10, 2), 5);
});

test("factory rejects an unsupported operator", () => {
  assert.throws(
    () => OperationFactory.createOperation("%"),
    new Error("Unsupported operator: %"),
  );
});
