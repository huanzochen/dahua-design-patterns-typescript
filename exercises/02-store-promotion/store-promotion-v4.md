# Store Promotion V4：策略模式與簡單工廠結合

## V3 留下的問題

V3 已經將促銷公式封裝成可替換的 Strategy，但 client 仍然知道所有具體策略：

```ts
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
```

因此 client 必須 import 具體策略、知道它們的 constructor，並負責建立物件。這段程式正在做類似簡單工廠的工作，但責任還留在 client。

## V4 如何調整

V4 把選擇及建立具體策略的 `switch` 移進 `CampaignContext`：

```ts
const context = new CampaignContext({
  type: "percentage",
  rate: 0.8,
});

const total = context.calculate(1000); // 800
```

client 只需要知道：

- 要使用哪一種業務選項。
- 該選項需要哪些設定值。
- 使用 `CampaignContext.calculate()` 取得結果。

client 不再知道：

- `NoCampaign`、`PercentageCampaign` 或 `RebateCampaign` 類別。
- 具體策略如何建立。
- 每種策略的計算公式。

## 結構

```text
Client
  │ CampaignConfig
  ▼
CampaignContext
  ├── switch：選擇並建立 Strategy（簡單工廠責任）
  └── calculate：委派給 Strategy（Context 責任）
          │
          ▼
       Campaign
       ├── NoCampaign
       ├── PercentageCampaign
       └── RebateCampaign
```

`CampaignContext` 的 constructor 是簡單工廠部分：

```ts
constructor(config: CampaignConfig) {
  switch (config.type) {
    case "normal":
      this.campaign = new NoCampaign();
      break;
    case "percentage":
      this.campaign = new PercentageCampaign(config.rate);
      break;
    case "rebate":
      this.campaign = new RebateCampaign(
        config.threshold,
        config.rebate,
      );
      break;
  }
}
```

`calculate()` 是策略模式的 Context 部分：

```ts
calculate(amount: number): number {
  return this.campaign.apply(amount);
}
```

## 為什麼仍然是策略模式

把工廠邏輯加進 Context，不會讓 Strategy 消失：

- `Campaign` 仍然定義共同演算法介面。
- 三個具體 Campaign 仍然各自封裝公式。
- Context 仍然只透過 `Campaign` 型別執行演算法。
- `calculate()` 不需要判斷目前是哪個具體策略。

簡單工廠只負責「建立哪個 Strategy」；策略模式仍負責「如何以相同方式使用可替換演算法」。

## 為什麼沒有獨立 CampaignFactory

書中 2.6 將簡單工廠邏輯直接放進 `CashContext`，所以本版也讓 `CampaignContext` 接收設定並建立策略：

```ts
new CampaignContext(config);
```

也可以設計獨立工廠：

```ts
const campaign = CampaignFactory.create(config);
const context = new CampaignContext(campaign);
```

兩者都能組合 Strategy 與 Simple Factory。書中的版本讓 client 只接觸一個 `CashContext` 類別，因此 API 更短；獨立工廠則能讓建立與執行的責任分得更清楚。

## V3 與 V4 的差異

### V3：純策略模式

```ts
const context = new CampaignContext(
  new PercentageCampaign(0.8),
);
```

Client 依賴：

```text
CampaignContext
PercentageCampaign
```

### V4：策略模式加簡單工廠

```ts
const context = new CampaignContext({
  type: "percentage",
  rate: 0.8,
});
```

Client 依賴：

```text
CampaignContext
CampaignConfig
```

| V3 | V4 |
|---|---|
| Client 建立具體策略 | Context 建立具體策略 |
| Client import 具體策略 | Client 不 import 具體策略 |
| `switch` 在 client | `switch` 在 Context |
| Context 只執行策略 | Context 建立並執行策略 |
| 建立與使用責任分散 | 對 client 提供單一入口 |

## 耦合並沒有消失，只是移動了

V4 降低了 client 與具體策略的耦合，但 `CampaignContext` 現在知道所有具體策略：

```text
V3：Client → ConcreteStrategy
V4：CampaignContext → ConcreteStrategy
```

新增策略時：

1. 新增一個 `Campaign` 子類別。
2. 在 `CampaignConfig` 增加設定型別。
3. 修改 `CampaignContext` 的 `switch`。

所以 V4 並沒有做到「新增策略時完全不用修改既有程式」。它的主要改善是讓 client 更簡單，並集中物件建立邏輯。

## 優點

- Client 不需要認識具體策略類別。
- Client 不需要知道策略 constructor。
- 選擇和建立策略的邏輯集中在 Context。
- 計算公式仍然封裝在各個 Strategy。
- 對 client 只提供一個主要入口。

## 代價

- `CampaignContext` 同時負責建立策略和使用策略。
- Context 依賴所有具體策略。
- 新增策略時必須修改 Context 的 `switch`。
- 如果策略種類很多，Context constructor 會逐漸膨脹。

這是一種取捨，不是絕對比 V3 更好的設計。它用較高的 Context 耦合，換取較低的 client 耦合。

## 本版仍不包含策略疊加

V4 一次仍然只建立一個 Campaign：

```ts
new CampaignContext({ type: "percentage", rate: 0.8 });
```

Strategy 與 Simple Factory 的組合處理的是「選擇、建立並執行一個策略」，不是依序執行多個促銷。策略疊加仍需要 Pipeline、Composite 或 Decorator 等額外設計。

## 執行方式

執行 v4 client：

```sh
npm run exercise -- exercises/02-store-promotion/store-promotion-v4-main.ts
```

執行所有測試：

```sh
npm test
```

執行型別檢查：

```sh
npm run typecheck
```
