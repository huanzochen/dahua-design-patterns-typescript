import assert from "node:assert/strict";
import { test } from "node:test";

import { CampaignContext } from "./store-promotion-v4.js";

test("context creates and executes the normal strategy", () => {
  const context = new CampaignContext({ type: "normal" });

  assert.equal(context.calculate(1000), 1000);
});

test("context creates and executes the percentage strategy", () => {
  const context = new CampaignContext({
    type: "percentage",
    rate: 0.8,
  });

  assert.equal(context.calculate(1000), 800);
});

test("context creates and executes the threshold rebate strategy", () => {
  const context = new CampaignContext({
    type: "rebate",
    threshold: 300,
    rebate: 100,
  });

  assert.equal(context.calculate(700), 500);
});
