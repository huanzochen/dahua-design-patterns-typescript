import { Operation, OperationAdd } from "./calculator-v3.js";

function main(): void {
  const operation: Operation = new OperationAdd();

  operation.numberA = 10;
  operation.numberB = 2;

  console.log(`Result: ${operation.getResult()}`);
}

main();
