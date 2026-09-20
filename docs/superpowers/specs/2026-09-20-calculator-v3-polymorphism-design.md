# Calculator V3 Polymorphism Design

## Goal

Preserve v1 and v2 while adding a third calculator version that demonstrates encapsulation, inheritance, overriding, and polymorphism.

## Design

`calculator-v3.ts` exports an abstract `Operation` base class. It owns `numberA` and `numberB` through private backing fields and public getters and setters, then declares an abstract `getResult(): number` contract.

Four concrete classes extend it:

- `OperationAdd`
- `OperationSubtract`
- `OperationMultiply`
- `OperationDivide`

Each subclass overrides only `getResult()`. Clients instantiate a concrete operation, assign the two operands, and request its result through the shared `Operation` interface.

## Scope

Do not add operator selection, a switch statement, a factory, input/output handling, or special division-by-zero behavior. Those belong to later versions.

## Verification

Test all four concrete operations through references typed as `Operation`, then run the complete test suite and TypeScript type checker.
