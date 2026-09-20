import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CampaignContext,
  NoCampaign,
  PercentageCampaign,
  RebateCampaign,
} from "./store-promotion-v3.js";

test("context delegates to the normal pricing strategy", () => {
  const context = new CampaignContext(new NoCampaign());

  assert.equal(context.calculate(1000), 1000);
});

test("context delegates to the percentage strategy", () => {
  const context = new CampaignContext(new PercentageCampaign(0.8));

  assert.equal(context.calculate(1000), 800);
});

test("context delegates to the threshold rebate strategy", () => {
  const context = new CampaignContext(new RebateCampaign(300, 100));

  assert.equal(context.calculate(700), 500);
});
