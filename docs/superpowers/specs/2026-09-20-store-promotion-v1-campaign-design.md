# Store Promotion V1 Campaign Design

## Goal

Implement the user's version of the chapter 2 checkout example without coupling promotion calculations to a UI dropdown or `switch` statement.

## Design

`SaleItem` represents one checkout line. It owns a unit price, quantity, and a `Campaign`. Its `calculateTotal()` method delegates the calculation to that campaign.

`Campaign` is an abstract class with this operation:

```ts
abstract calculate(price: number, quantity: number): number;
```

The first version provides two implementations:

- `NoCampaign` returns `price * quantity`.
- `PercentageCampaign` returns `price * quantity * discountRate`.

`SaleItem` defaults to `NoCampaign` when the caller does not provide a campaign. A caller selects a promotion by injecting the appropriate campaign object; `SaleItem` does not inspect campaign names, UI indexes, or type flags.

## API

```ts
export abstract class Campaign {
  abstract calculate(price: number, quantity: number): number;
}

export class NoCampaign extends Campaign {
  calculate(price: number, quantity: number): number;
}

export class PercentageCampaign extends Campaign {
  constructor(discountRate: number);
  calculate(price: number, quantity: number): number;
}

export class SaleItem {
  constructor(price: number, quantity: number, campaign?: Campaign);
  calculateTotal(): number;
}
```

## Tests

- An item without an explicit campaign uses the original price.
- An item with `NoCampaign` uses the original price.
- An item with `PercentageCampaign(0.8)` receives a 20% discount.

## Scope

This version calculates one sale item's total only. It does not include input validation, UI controls, campaign lookup, cart-wide totals, campaign stacking, currency rounding, or persistence.
