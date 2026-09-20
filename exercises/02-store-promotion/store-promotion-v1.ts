export abstract class Campaign {
  abstract calculate(price: number, quantity: number): number;
}

export class NoCampaign extends Campaign {
  override calculate(price: number, quantity: number): number {
    return price * quantity;
  }
}

export class PercentageCampaign extends Campaign {
  constructor(private readonly discountRate: number) {
    super();
  }

  override calculate(price: number, quantity: number): number {
    return price * quantity * this.discountRate;
  }
}

export class SaleItem {
  constructor(
    private readonly price: number,
    private readonly quantity: number,
    private readonly campaign: Campaign = new NoCampaign(),
  ) {}

  calculateTotal(): number {
    return this.campaign.calculate(this.price, this.quantity);
  }
}
