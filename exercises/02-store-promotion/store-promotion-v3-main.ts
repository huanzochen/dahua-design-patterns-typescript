import {
  CampaignContext,
  NoCampaign,
  PercentageCampaign,
  RebateCampaign,
} from "./store-promotion-v3.js";

type CampaignType = "normal" | "percentage" | "rebate";

function calculateTotal(
  price: number,
  quantity: number,
  campaignType: CampaignType,
): number {
  let context: CampaignContext;

  switch (campaignType) {
    case "normal":
      context = new CampaignContext(new NoCampaign());
      break;
    case "percentage":
      context = new CampaignContext(new PercentageCampaign(0.8));
      break;
    case "rebate":
      context = new CampaignContext(new RebateCampaign(300, 100));
      break;
  }

  return context.calculate(price * quantity);
}

console.log(`Normal: ${calculateTotal(500, 2, "normal")}`);
console.log(`Percentage: ${calculateTotal(500, 2, "percentage")}`);
console.log(`Rebate: ${calculateTotal(350, 2, "rebate")}`);
