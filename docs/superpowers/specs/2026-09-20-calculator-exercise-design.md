# Calculator Exercise Project Design

## Goal

Create a minimal TypeScript 7 practice project for the calculator exercise from chapter 1. Preserve each iteration as a separate TypeScript file so the evolution from procedural code to object-oriented design and a simple factory remains easy to compare.

## Project Structure

```text
.
|-- exercises/
|   `-- 01-calculator/
|       `-- calculator-v1.ts
|-- .gitignore
|-- README.md
|-- package.json
`-- tsconfig.json
```

The first implementation file is `calculator-v1.ts`. Later iterations stay in the same exercise directory and receive increasing version numbers, for example:

```text
calculator-v1.ts
calculator-v2-oop.ts
calculator-v3-encapsulated.ts
calculator-v4-simple-factory.ts
```

These later files are examples of the naming convention, not files to create now. The exact version names should follow the concepts introduced by each section of the book.

## Starter File

`exercises/01-calculator/calculator-v1.ts` contains only a short description of the exercise as comments:

- Read two numbers and one operator.
- Support addition, subtraction, multiplication, and division.
- Print the result.

It contains no function, class, CLI scaffold, or solution code, leaving the implementation to the learner.

## Tooling

- Use npm for dependency and script management.
- Pin TypeScript to the current version 7 release.
- Use `tsx` to execute a selected `.ts` file directly.
- Use `tsc --noEmit` for project-wide type checking.
- Enable strict TypeScript checks and Node.js-compatible ESM settings.

The primary commands are:

```sh
npm install
npm run exercise -- exercises/01-calculator/calculator-v1.ts
npm run typecheck
```

## Documentation

The root `README.md` explains installation, execution, type checking, and how to create a new version without overwriting an earlier solution.

## Scope

This setup does not implement the calculator, add tests, or create future OOP/factory versions. Those changes belong to later learning iterations and can be added when the corresponding sections are reached.
