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

export class CampaignContext {
  constructor(private readonly campaign: Campaign) {}

  calculate(amount: number): number {
    return this.campaign.apply(amount);
  }
}
