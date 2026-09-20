# Calculator V1 Signature Design

## Goal

Add a typed function shell to `exercises/01-calculator/calculator-v1.ts` without implementing the calculator.

## Interface

Export an `Operator` union type restricted to `+`, `-`, `*`, or `/`. Export a `calculate` function that accepts `numberA`, `numberB`, and an `Operator`. The declared return type is `number`.

The body throws `Error("Not implemented")` so strict type checking succeeds while leaving the exercise unanswered.

## Scope

Do not add calculation logic, terminal input, output, or tests.
