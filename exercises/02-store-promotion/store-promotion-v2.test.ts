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
