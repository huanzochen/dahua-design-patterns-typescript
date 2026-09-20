import { Operation, OperationFactory } from "./calculator-v4.js";

function calculate(operator: string, numberA: number, numberB: number): number {
  const operation: Operation = OperationFactory.createOperation(operator);
  operation.numberA = numberA;
  operation.numberB = numberB;
  return operation.getResult();
}

function main(): void {
  console.log(`Add: ${calculate("+", 10, 2)}`);
  console.log(`Subtract: ${calculate("-", 10, 2)}`);
  console.log(`Multiply: ${calculate("*", 10, 2)}`);
  console.log(`Divide: ${calculate("/", 10, 2)}`);
}

main();
