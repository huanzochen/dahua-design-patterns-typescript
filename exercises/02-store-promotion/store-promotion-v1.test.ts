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
