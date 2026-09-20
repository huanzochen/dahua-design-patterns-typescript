import assert from "node:assert/strict";
import { test } from "node:test";

import {
  Operation,
  OperationAdd,
  OperationDivide,
  OperationMultiply,
  OperationSubtract,
} from "./calculator-v3.js";

function getResult(operation: Operation, numberA: number, numberB: number): number {
  operation.numberA = numberA;
  operation.numberB = numberB;
  return operation.getResult();
}

test("OperationAdd adds two numbers", () => {
  assert.equal(getResult(new OperationAdd(), 10, 2), 12);
});

test("OperationSubtract subtracts two numbers", () => {
  assert.equal(getResult(new OperationSubtract(), 10, 2), 8);
});

test("OperationMultiply multiplies two numbers", () => {
  assert.equal(getResult(new OperationMultiply(), 10, 2), 20);
});

test("OperationDivide divides two numbers", () => {
  assert.equal(getResult(new OperationDivide(), 10, 2), 5);
});
