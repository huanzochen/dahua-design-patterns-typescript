# Store Promotion V2 Simple Factory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an independent v2 in which a typed simple factory creates one normal, percentage, or threshold-rebate Campaign for a client program.

**Architecture:** The client calculates `price * quantity` and passes the resulting amount to one `Campaign`. `CampaignFactory` switches only on a discriminated configuration type to construct the correct concrete campaign; pricing formulas stay in the campaign subclasses.

**Tech Stack:** TypeScript 7, Node.js test runner, `tsx`

## Global Constraints

- Keep v1 unchanged and implement v2 in separate files.
- `CampaignFactory.create(config)` returns exactly one `Campaign`.
- Use typed configuration rather than display labels or UI indexes.
- Do not add campaign stacking, `CampaignPipeline`, UI controls, input validation, cart totals, currency rounding, or persistence.
- Leave all changes uncommitted unless the user explicitly requests a commit.

---

### Task 1: Typed Campaign Simple Factory

**Files:**
- Create: `exercises/02-store-promotion/store-promotion-v2.ts`
- Create: `exercises/02-store-promotion/store-promotion-v2.test.ts`
- Create: `exercises/02-store-promotion/store-promotion-v2-main.ts`

**Interfaces:**
- Produces: `Campaign.apply(amount: number): number`
- Produces: `NoCampaign`, `PercentageCampaign`, and `RebateCampaign`
- Produces: `CampaignConfig` discriminated union
- Produces: `CampaignFactory.create(config: CampaignConfig): Campaign`

- [ ] **Step 1: Write the failing tests**

```ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { CampaignFactory } from "./store-promotion-v2.js";

test("factory creates a normal campaign", () => {
  const campaign = CampaignFactory.create({ type: "normal" });

  assert.equal(campaign.apply(1000), 1000);
});

test("factory creates a percentage campaign", () => {
  const campaign = CampaignFactory.create({
    type: "percentage",
    rate: 0.8,
  });

  assert.equal(campaign.apply(1000), 800);
});

test("factory creates a threshold rebate campaign", () => {
  const campaign = CampaignFactory.create({
    type: "rebate",
    threshold: 300,
    rebate: 100,
  });

  assert.equal(campaign.apply(700), 500);
});

```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npx tsx --test exercises/02-store-promotion/store-promotion-v2.test.ts`

Expected: FAIL because `store-promotion-v2.js` does not exist.

- [ ] **Step 3: Implement the campaign hierarchy and factory**

```ts
export abstract class Campaign {
  abstract apply(amount: number): number;
}

export class NoCampaign extends Campaign {
  override apply(amount: number): number {
    return amount;
  }
}

export class PercentageCampaign extends Campaign {
  constructor(private readonly rate: number) {
    super();
  }

  override apply(amount: number): number {
    return amount * this.rate;
  }
}

export class RebateCampaign extends Campaign {
  constructor(
    private readonly threshold: number,
    private readonly rebate: number,
  ) {
    super();
  }

  override apply(amount: number): number {
    return amount - Math.floor(amount / this.threshold) * this.rebate;
  }
}

export type CampaignConfig =
  | { type: "normal" }
  | { type: "percentage"; rate: number }
  | { type: "rebate"; threshold: number; rebate: number };

export class CampaignFactory {
  static create(config: CampaignConfig): Campaign {
    switch (config.type) {
      case "normal":
        return new NoCampaign();
      case "percentage":
        return new PercentageCampaign(config.rate);
      case "rebate":
        return new RebateCampaign(config.threshold, config.rebate);
    }
  }
}

```

- [ ] **Step 4: Add the runnable client**

```ts
import { CampaignFactory } from "./store-promotion-v2.js";
import type { CampaignConfig } from "./store-promotion-v2.js";

function calculateTotal(
  price: number,
  quantity: number,
  config: CampaignConfig,
): number {
  const campaign = CampaignFactory.create(config);
  return campaign.apply(price * quantity);
}

console.log(`Normal: ${calculateTotal(500, 2, { type: "normal" })}`);
console.log(
  `Percentage: ${calculateTotal(500, 2, {
    type: "percentage",
    rate: 0.8,
  })}`,
);
console.log(
  `Rebate: ${calculateTotal(350, 2, {
    type: "rebate",
    threshold: 300,
    rebate: 100,
  })}`,
);
```

- [ ] **Step 5: Run the focused tests and main, then verify GREEN**

Run: `npx tsx --test exercises/02-store-promotion/store-promotion-v2.test.ts`

Expected: 3 tests pass, 0 fail.

Run: `npm run exercise -- exercises/02-store-promotion/store-promotion-v2-main.ts`

Expected output:

```text
Normal: 1000
Percentage: 800
Rebate: 500
```

- [ ] **Step 6: Run complete verification**

Run: `npm test`

Expected: 23 tests pass, 0 fail.

Run: `npm run typecheck`

Expected: exit code 0 with no TypeScript errors.

Run: `git diff --check`

Expected: exit code 0 with no whitespace errors.
