# Calculator V3 Polymorphism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third calculator version that demonstrates encapsulation, inheritance, overriding, and polymorphism without introducing a factory.

**Architecture:** An abstract `Operation` owns two encapsulated operands and defines the shared `getResult()` contract. Four concrete subclasses each implement one arithmetic operation, while tests consume every subclass through the base `Operation` type.

**Tech Stack:** TypeScript 7.0.2, Node.js test runner through tsx 4.23.14

## Global Constraints

- Preserve calculator v1 and v2 unchanged.
- Keep v3 in `exercises/01-calculator/calculator-v3.ts`.
- Use private backing fields with public getters and setters.
- Do not add an operator union, switch, factory, CLI, or division-by-zero handling.

---

### Task 1: Add Polymorphic Calculator Operations

**Files:**
- Create: `exercises/01-calculator/calculator-v3.ts`
- Create: `exercises/01-calculator/calculator-v3.test.ts`

**Interfaces:**
- Produces: abstract `Operation` with `numberA`, `numberB`, and `getResult(): number`
- Produces: `OperationAdd`, `OperationSubtract`, `OperationMultiply`, and `OperationDivide`

- [ ] **Step 1: Write the failing polymorphism tests**

Create `exercises/01-calculator/calculator-v3.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the tests and verify the new suite fails**

Run: `npm test`

Expected: v1 and v2 tests pass; v3 fails because `calculator-v3.js` does not exist.

- [ ] **Step 3: Implement the abstract base class and concrete operations**

Create `exercises/01-calculator/calculator-v3.ts`:

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
```

- [ ] **Step 4: Run all tests**

Run: `npm test`

Expected: 12 tests pass with 0 failures.

- [ ] **Step 5: Run static verification**

Run: `npm run typecheck && git diff --check`

Expected: both commands exit with status 0 and no errors.
