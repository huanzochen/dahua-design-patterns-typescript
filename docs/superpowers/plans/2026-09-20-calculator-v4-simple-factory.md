# Calculator V4 Simple Factory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a self-contained calculator v4 that uses a simple factory to select and construct arithmetic operation objects.

**Architecture:** V4 duplicates the v3 operation hierarchy intentionally so it remains an independent learning snapshot. A static `OperationFactory` centralizes the switch from operator strings to concrete subclasses, while the client depends only on `Operation` and the factory.

**Tech Stack:** TypeScript 7.0.2, Node.js test runner, tsx 4.23.14

## Global Constraints

- Preserve calculator v1 through v3 unchanged.
- Keep v4 self-contained; do not import operation classes from v3.
- Support `+`, `-`, `*`, and `/`.
- Throw an `Error` for unsupported operators.
- Do not add CLI argument parsing or special division-by-zero behavior.
- Do not create a git commit unless the user explicitly requests one.

---

### Task 1: Self-Contained Simple Factory

**Files:**
- Create: `exercises/01-calculator/calculator-v4.test.ts`
- Create: `exercises/01-calculator/calculator-v4.ts`

**Interfaces:**
- Produces: `abstract class Operation` with `numberA`, `numberB`, and `getResult(): number`
- Produces: `OperationAdd`, `OperationSubtract`, `OperationMultiply`, and `OperationDivide`
- Produces: `OperationFactory.createOperation(operator: string): Operation`

- [ ] **Step 1: Write the failing factory tests**

```ts
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
```

- [ ] **Step 2: Run the test and confirm the expected failure**

Run: `npx tsx --test exercises/01-calculator/calculator-v4.test.ts`

Expected: FAIL because `calculator-v4.js` does not exist.

- [ ] **Step 3: Implement the operation hierarchy and factory**

```ts
export abstract class Operation {
  private numberAValue = 0;
  private numberBValue = 0;

  get numberA(): number {
    return this.numberAValue;
  }

  set numberA(value: number) {
    this.numberAValue = value;
  }

  get numberB(): number {
    return this.numberBValue;
  }

  set numberB(value: number) {
    this.numberBValue = value;
  }

  abstract getResult(): number;
}

export class OperationAdd extends Operation {
  override getResult(): number {
    return this.numberA + this.numberB;
  }
}

export class OperationSubtract extends Operation {
  override getResult(): number {
    return this.numberA - this.numberB;
  }
}

export class OperationMultiply extends Operation {
  override getResult(): number {
    return this.numberA * this.numberB;
  }
}

export class OperationDivide extends Operation {
  override getResult(): number {
    return this.numberA / this.numberB;
  }
}

export class OperationFactory {
  static createOperation(operator: string): Operation {
    switch (operator) {
      case "+":
        return new OperationAdd();
      case "-":
        return new OperationSubtract();
      case "*":
        return new OperationMultiply();
      case "/":
        return new OperationDivide();
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
}
```

- [ ] **Step 4: Run the focused tests**

Run: `npx tsx --test exercises/01-calculator/calculator-v4.test.ts`

Expected: 5 tests pass and 0 fail.

### Task 2: Runnable Example And Learning Notes

**Files:**
- Create: `exercises/01-calculator/calculator-v4-main.ts`
- Create: `exercises/01-calculator/calculator-v4.md`

**Interfaces:**
- Consumes: `Operation` and `OperationFactory.createOperation(operator: string): Operation`
- Produces: a runnable factory example and a Chinese explanation of its OOP relationship and tradeoffs

- [ ] **Step 1: Add the runnable client**

```ts
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
```

- [ ] **Step 2: Run the client example**

Run: `npm run exercise -- exercises/01-calculator/calculator-v4-main.ts`

Expected output:

```text
Add: 12
Subtract: 8
Multiply: 20
Divide: 5
```

- [ ] **Step 3: Write the learning notes**

Create `calculator-v4.md` in Chinese with these explicit sections:

- V4 是 V3 的下一個演進版本
- 類別角色與建立流程
- 簡單工廠和 OOP 的關係
- 與 V3 的差異
- 優點與代價
- 適用時機
- 執行命令

The notes must state that simple factory still uses encapsulation, inheritance, overriding, and polymorphism. They must also state that clients stop constructing concrete operations directly, while adding an operation still requires modifying the factory switch.

- [ ] **Step 4: Run complete verification**

Run: `npm test`

Expected: 17 tests pass and 0 fail.

Run: `npm run typecheck`

Expected: exit status 0 with no TypeScript errors.

Run: `git diff --check`

Expected: exit status 0 with no whitespace errors.
