# Store Promotion V3 Strategy Design

## Goal

Implement the pure Strategy pattern shown in section 2.5 of the book. Preserve the client-side strategy selection so the next version can demonstrate why Strategy and Simple Factory may be combined.

## Structure

- `Campaign` is the Strategy abstraction and defines `apply(amount)`.
- `NoCampaign`, `PercentageCampaign`, and `RebateCampaign` are concrete strategies.
- `CampaignContext` receives one `Campaign` through its constructor and delegates `calculate(amount)` to it.
- The runnable client uses a `switch` to choose a concrete strategy and inject it into `CampaignContext`.

V3 is self-contained and does not import V2.

## Behavior

- Normal pricing leaves the amount unchanged.
- A percentage strategy multiplies the amount by its rate.
- A rebate strategy subtracts one rebate for every complete threshold.
- The client calculates `price * quantity` before calling the context.

## Scope

V3 does not contain a campaign factory, typed factory configuration, campaign stacking, input validation, UI controls, cart totals, currency rounding, or persistence. Its client-side `switch` is intentional and matches the book's section 2.5 progression.

## Documentation

Add a Chinese Markdown guide explaining the Strategy, ConcreteStrategy, and Context roles; delegation and polymorphism; the difference from V2 Simple Factory; why the client still has a `switch`; tradeoffs; and why stacking is a separate concern.
