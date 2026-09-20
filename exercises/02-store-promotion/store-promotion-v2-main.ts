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
