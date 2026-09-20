# Calculator V1 Signature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the typed `Operator` and `calculate` function shell without solving the calculator exercise.

**Architecture:** Keep both declarations in `calculator-v1.ts` because they belong only to the first exercise version. Use a union type to reject unsupported operators at compile time and a throwing function body to satisfy strict return checking without adding calculation logic.

**Tech Stack:** TypeScript 7.0.2 with strict type checking

## Global Constraints

- Export `Operator` and restrict it to `+`, `-`, `*`, or `/`.
- Export `calculate(numberA, numberB, operator)` with a `number` return type.
- Do not add calculation logic, terminal input, output, or tests.

---

### Task 1: Add The Calculator Function Shell

**Files:**
- Modify: `exercises/01-calculator/calculator-v1.ts`

**Interfaces:**
- Consumes: two `number` values and one `Operator`
- Produces: `Operator` and `calculate(numberA: number, numberB: number, operator: Operator): number`

- [ ] **Step 1: Add the exported type and function shell**

Append this code after the existing exercise comment:

```ts
export type Operator = "+" | "-" | "*" | "/";

export function calculate(
  numberA: number,
  numberB: number,
  operator: Operator,
): number {
  throw new Error("Not implemented");
}
```

- [ ] **Step 2: Verify strict type checking**

Run: `npm run typecheck`

Expected: TypeScript exits with status 0 and reports no errors.

- [ ] **Step 3: Check formatting and the final change set**

Run: `git diff --check && git diff -- exercises/01-calculator/calculator-v1.ts`

Expected: no whitespace errors; the exercise diff contains only the exported `Operator` type and `calculate` function shell.
