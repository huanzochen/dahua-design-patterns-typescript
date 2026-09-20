# Calculator Exercise Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a minimal TypeScript 7 project with an untouched first calculator exercise and room for later OOP, encapsulation, and simple-factory versions.

**Architecture:** Keep project tooling at the repository root and place all iterations of the first exercise in `exercises/01-calculator/`. Execute individual versions with `tsx` and type-check the complete exercise tree with `tsc --noEmit`.

**Tech Stack:** Node.js 24, npm 11, TypeScript 7.0.2, tsx 4.23.14, @types/node 26.6.2

## Global Constraints

- The initial exercise file contains only requirements comments and no solution code.
- Create only `calculator-v1.ts`; later OOP and factory variants are not part of this scaffold.
- Preserve each future iteration as a separate `.ts` file under `exercises/01-calculator/`.
- Use strict TypeScript checks and Node.js-compatible ESM settings.

---

### Task 1: Create And Verify The Exercise Scaffold

**Files:**
- Create: `package.json`
- Create: `package-lock.json` through `npm install`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `exercises/01-calculator/calculator-v1.ts`

**Interfaces:**
- Consumes: Node.js and npm installed locally
- Produces: `npm run exercise -- <file>` for direct execution and `npm run typecheck` for static checking

- [ ] **Step 1: Create npm metadata and scripts**

Create `package.json`:

```json
{
  "name": "dahua-design-patterns-typescript",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "exercise": "tsx",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/node": "26.6.2",
    "tsx": "4.23.14",
    "typescript": "7.0.2"
  }
}
```

- [ ] **Step 2: Configure strict TypeScript checking**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "types": ["node"]
  },
  "include": ["exercises/**/*.ts"]
}
```

- [ ] **Step 3: Ignore generated dependencies and build output**

Create `.gitignore`:

```gitignore
node_modules/
dist/
```

- [ ] **Step 4: Create the unanswered first exercise**

Create `exercises/01-calculator/calculator-v1.ts`:

```ts
/**
 * Calculator v1
 *
 * Requirements:
 * - Read two numbers and one operator from the user.
 * - Support addition, subtraction, multiplication, and division.
 * - Print the calculation result.
 */
```

- [ ] **Step 5: Document setup and the versioning convention**

Create `README.md`:

```markdown
# Dahua Design Patterns With TypeScript

Practice exercises from *Dahua Design Patterns*, rewritten in TypeScript.

## Setup

\`\`\`sh
npm install
\`\`\`

## Calculator Exercise

Implement the first version in `exercises/01-calculator/calculator-v1.ts`.

Run it with:

\`\`\`sh
npm run exercise -- exercises/01-calculator/calculator-v1.ts
\`\`\`

Check all TypeScript files with:

\`\`\`sh
npm run typecheck
\`\`\`

When the book introduces a new design, create another file in the same directory instead of replacing an earlier version. For example:

- `calculator-v2-oop.ts`
- `calculator-v3-encapsulated.ts`
- `calculator-v4-simple-factory.ts`
```

- [ ] **Step 6: Install the pinned dependencies**

Run: `npm install`

Expected: npm creates `node_modules/` and `package-lock.json` with no installation error.

- [ ] **Step 7: Verify static checking**

Run: `npm run typecheck`

Expected: TypeScript exits with status 0 and reports no errors.

- [ ] **Step 8: Verify direct exercise execution**

Run: `npm run exercise -- exercises/01-calculator/calculator-v1.ts`

Expected: `tsx` exits with status 0 and prints no output because the file intentionally contains only comments.

- [ ] **Step 9: Inspect the final change set**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the planned scaffold, design document, plan document, and generated lockfile are untracked.
