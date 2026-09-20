import { CampaignContext } from "./store-promotion-v4.js";
import type { CampaignConfig } from "./store-promotion-v4.js";

function calculateTotal(
  price: number,
  quantity: number,
  config: CampaignConfig,
): number {
  const context = new CampaignContext(config);
  return context.calculate(price * quantity);
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
