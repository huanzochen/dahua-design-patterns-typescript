# Calculator V4 Simple Factory Design

## Goal

Preserve calculator v1 through v3 while adding a self-contained fourth version that demonstrates the simple factory pattern from the book.

## Design

`calculator-v4.ts` contains its own `Operation` hierarchy rather than importing v3. This deliberate duplication keeps each learning stage readable and runnable as an independent snapshot.

The file exports:

- The abstract `Operation` base class
- `OperationAdd`
- `OperationSubtract`
- `OperationMultiply`
- `OperationDivide`
- `OperationFactory`

`OperationFactory.createOperation(operator: string): Operation` uses a switch statement to create the concrete operation for `+`, `-`, `*`, or `/`. Unsupported operators throw an `Error`, keeping the successful return type as `Operation` rather than `Operation | null`.

`calculator-v4-main.ts` asks the factory for an operation, sets its operands, and calls `getResult()` without directly constructing or importing a concrete operation class.

## OOP Relationship And Tradeoffs

Simple factory is not an alternative to object-oriented programming. V4 retains v3's encapsulation, inheritance, overriding, and polymorphism, then adds a class whose responsibility is selecting and constructing concrete objects.

The client becomes less coupled to concrete operation classes and object-creation decisions are centralized. The tradeoff is that the factory depends on every concrete operation: adding a new operator requires adding a subclass and changing the factory switch. This is appropriate for a small, stable operation set, but less suitable when operation types change frequently or third parties must add operations without modifying existing code.

## Files

- `exercises/01-calculator/calculator-v4.ts`: self-contained operation hierarchy and factory
- `exercises/01-calculator/calculator-v4-main.ts`: runnable client example
- `exercises/01-calculator/calculator-v4.test.ts`: factory behavior and invalid-operator tests
- `exercises/01-calculator/calculator-v4.md`: Chinese learning notes and tradeoff explanation

## Verification

Tests cover all four operators through objects returned as `Operation` and verify that unsupported operators throw an error. The complete test suite, TypeScript type checker, runnable main example, and diff whitespace check must pass.
