# Store Promotion V2 Simple Factory Design

## Goal

Implement the book's simple-factory stage as an independent v2. A client provides typed configuration, and `CampaignFactory` creates one pricing campaign.

## Design

The client calculates the original amount as `price * quantity`, then passes that amount to one `Campaign`.

`Campaign` is an abstract class:

```ts
abstract apply(amount: number): number;
```

The concrete campaigns are:

- `NoCampaign`: returns the original amount.
- `PercentageCampaign`: multiplies the amount by a rate; `0.8` means the customer pays 80%.
- `RebateCampaign`: subtracts a rebate for every complete threshold; a threshold of `300` and rebate of `100` turns `700` into `500`.

`CampaignFactory.create(config)` returns exactly one `Campaign`. It may switch on `config.type`, but pricing formulas remain inside the concrete campaign classes.

## Typed Configuration

```ts
type CampaignConfig =
  | { type: "normal" }
  | { type: "percentage"; rate: number }
  | { type: "rebate"; threshold: number; rebate: number };
```

The factory does not accept display labels or UI indexes.

## Public API

```ts
export abstract class Campaign {
  abstract apply(amount: number): number;
}

export class NoCampaign extends Campaign {
  apply(amount: number): number;
}

export class PercentageCampaign extends Campaign {
  constructor(rate: number);
  apply(amount: number): number;
}

export class RebateCampaign extends Campaign {
  constructor(threshold: number, rebate: number);
  apply(amount: number): number;
}

export type CampaignConfig =
  | { type: "normal" }
  | { type: "percentage"; rate: number }
  | { type: "rebate"; threshold: number; rebate: number };

export class CampaignFactory {
  static create(config: CampaignConfig): Campaign;
}

```

## Data Flow

```text
CampaignConfig
      ↓
CampaignFactory.create()
      ↓
one Campaign object
      ↓
client calculates price * quantity
      ↓
Campaign.apply(original amount)
      ↓
final amount
```

## Tests

- A `normal` configuration creates behavior that leaves `1000` unchanged.
- A `percentage` configuration with rate `0.8` turns `1000` into `800`.
- A `rebate` configuration with threshold `300` and rebate `100` turns `700` into `500`.
- The runnable client multiplies price by quantity before applying the factory-created campaign.

## Scope

V1 remains unchanged. V2 includes a separate runnable main client, but no `SaleItem` domain wrapper. It does not include campaign stacking, `CampaignPipeline`, UI controls, display-label parsing, input validation, cart-wide totals, currency rounding, or persistence. Campaign stacking is reserved for a later v3.
