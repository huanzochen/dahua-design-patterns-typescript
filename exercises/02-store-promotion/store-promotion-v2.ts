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
