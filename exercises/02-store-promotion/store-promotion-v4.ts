export abstract class Campaign {
  abstract apply(amount: number): number;
}

export class NoCampaign extends Campaign {
  constructor() {
    super();
  }

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

export class CampaignContext {
  private readonly campaign: Campaign;

  constructor(config: CampaignConfig) {
    switch (config.type) {
      case "normal":
        this.campaign = new NoCampaign();
        break;
      case "percentage":
        this.campaign = new PercentageCampaign(config.rate);
        break;
      case "rebate":
        this.campaign = new RebateCampaign(config.threshold, config.rebate);
        break;
    }
  }

  calculate(amount: number): number {
    return this.campaign.apply(amount);
  }
}
