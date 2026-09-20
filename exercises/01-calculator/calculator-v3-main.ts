import {
  Operation,
  OperationAdd,
  OperationDivide,
  OperationMultiply,
  OperationSubtract,
} from "./calculator-v3.js";

function calculate(operation: Operation): number {
  operation.numberA = 10;
  operation.numberB = 2;

  return operation.getResult();
}

function main(): void {
  console.log(`Add: ${calculate(new OperationAdd())}`);
  console.log(`Subtract: ${calculate(new OperationSubtract())}`);
  console.log(`Multiply: ${calculate(new OperationMultiply())}`);
  console.log(`Divide: ${calculate(new OperationDivide())}`);
}

main();
