# Store Promotion V1 Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-sale-item checkout calculation that delegates original-price and percentage-discount behavior to interchangeable Campaign objects.

**Architecture:** `SaleItem` owns a unit price, quantity, and injected `Campaign`, then delegates `calculateTotal()` to the campaign. `NoCampaign` and `PercentageCampaign` independently implement the calculation without UI indexes or type switches.

**Tech Stack:** TypeScript 7, Node.js test runner, `tsx`

## Global Constraints

- Keep this version independent from chapter 1.
- Do not use UI controls, campaign type flags, or a `switch` statement.
- Do not add input validation, campaign lookup, cart totals, campaign stacking, currency rounding, or persistence.
- Leave all changes uncommitted unless the user explicitly requests a commit.

---

### Task 1: Campaign-Based Sale Item

**Files:**
- Create: `exercises/02-store-promotion/store-promotion-v1.ts`
- Create: `exercises/02-store-promotion/store-promotion-v1.test.ts`
- Modify: `package.json:8`

**Interfaces:**
- Produces: `Campaign.calculate(price: number, quantity: number): number`
- Produces: `new NoCampaign()`
- Produces: `new PercentageCampaign(discountRate: number)`
- Produces: `new SaleItem(price: number, quantity: number, campaign?: Campaign)`
- Produces: `SaleItem.calculateTotal(): number`

- [ ] **Step 1: Write the failing behavior tests**

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  NoCampaign,
  PercentageCampaign,
  SaleItem,
} from "./store-promotion-v1.js";

test("an item uses the original price when no campaign is provided", () => {
  const item = new SaleItem(100, 2);

  assert.equal(item.calculateTotal(), 200);
});

test("NoCampaign keeps the original price", () => {
  const item = new SaleItem(100, 2, new NoCampaign());

  assert.equal(item.calculateTotal(), 200);
});

test("PercentageCampaign applies its discount rate", () => {
  const item = new SaleItem(100, 2, new PercentageCampaign(0.8));

  assert.equal(item.calculateTotal(), 160);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npx tsx --test exercises/02-store-promotion/store-promotion-v1.test.ts`

Expected: FAIL because `store-promotion-v1.js` does not exist.

- [ ] **Step 3: Implement the minimal campaign hierarchy and sale item**

```ts
export abstract class Campaign {
  abstract calculate(price: number, quantity: number): number;
}

export class NoCampaign extends Campaign {
  override calculate(price: number, quantity: number): number {
    return price * quantity;
  }
}

export class PercentageCampaign extends Campaign {
  constructor(private readonly discountRate: number) {
    super();
  }

  override calculate(price: number, quantity: number): number {
    return price * quantity * this.discountRate;
  }
}

export class SaleItem {
  constructor(
    private readonly price: number,
    private readonly quantity: number,
    private readonly campaign: Campaign = new NoCampaign(),
  ) {}

  calculateTotal(): number {
    return this.campaign.calculate(this.price, this.quantity);
  }
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npx tsx --test exercises/02-store-promotion/store-promotion-v1.test.ts`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Include all exercise test directories in the project test command**

Change `package.json` to:

```json
"test": "tsx --test exercises/**/*.test.ts"
```

- [ ] **Step 6: Run complete verification**

Run: `npm test`

Expected: 20 tests pass, 0 fail.

Run: `npm run typecheck`

Expected: exit code 0 with no TypeScript errors.

Run: `git diff --check`

Expected: exit code 0 with no whitespace errors.
