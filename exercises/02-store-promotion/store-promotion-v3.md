# Store Promotion V3：策略模式

## 策略模式解決什麼問題

商場可能使用不同方式計算實收金額：

- 正常收費：原價不變。
- 百分比折扣：例如八折。
- 滿額折抵：例如每滿 300 減 100。

這些規則的共同點是輸入一個原始金額，再回傳計算後的金額；不同點是計算演算法。策略模式將每個演算法封裝成獨立物件，讓它們可以透過相同介面互相替換。

> 策略模式定義一系列演算法，分別封裝它們，並使它們可以互相替換。演算法的變化不會影響使用演算法的 Context。

## V3 的類別角色

```text
CampaignContext
      │ 持有
      ▼
   Campaign
   ├── NoCampaign
   ├── PercentageCampaign
   └── RebateCampaign
```

### Strategy：Campaign

`Campaign` 定義所有促銷策略共同遵守的操作：

```ts
export abstract class Campaign {
  abstract apply(amount: number): number;
}
```

Context 只需要知道這個抽象類別，不需要知道每種策略如何計算。

### ConcreteStrategy：具體 Campaign

每個子類別封裝一種演算法：

```ts
new NoCampaign();
new PercentageCampaign(0.8);
new RebateCampaign(300, 100);
```

加入新的促銷演算法時，可以新增另一個 `Campaign` 子類別，而不必修改 `CampaignContext`。

### Context：CampaignContext

Context 持有一個 Strategy，並提供 client 使用的統一入口：

```ts
export class CampaignContext {
  constructor(private readonly campaign: Campaign) {}

  calculate(amount: number): number {
    return this.campaign.apply(amount);
  }
}
```

它的程式碼目前只有一行委派，但它建立了一個重要邊界：client 使用 Context，Context 使用抽象 Strategy。未來若所有策略都需要記錄、監控或統一前後處理，可以在 Context 加入，而不必修改每個 client。

## 計算流程

```text
client 選擇具體策略
        ↓
new CampaignContext(strategy)
        ↓
client 計算 price * quantity
        ↓
context.calculate(amount)
        ↓
campaign.apply(amount)
        ↓
實收金額
```

例如八折：

```ts
const context = new CampaignContext(
  new PercentageCampaign(0.8),
);

const total = context.calculate(500 * 2); // 800
```

`CampaignContext` 的欄位型別是 `Campaign`，但實際物件是 `PercentageCampaign`。呼叫 `apply()` 時，JavaScript 會執行實際物件覆寫的方法，這就是多型與 dynamic dispatch。

## 為什麼 Client 還有 Switch

書中 2.5 的 client 仍然負責選擇具體策略：

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

這不是策略模式失敗，而是因為策略模式處理的是「如何執行可替換演算法」，不是「如何建立或選擇物件」。

- Strategy 封裝演算法。
- Context 執行被注入的 Strategy。
- Client 選擇要注入哪個 Strategy。

這個 `switch` 是本版刻意保留的限制。下一版可以把選擇邏輯移入結合簡單工廠的 Context，讓 client 不再認識所有具體策略。

## V2 與 V3 的差異

V2 使用簡單工廠：

```ts
const campaign = CampaignFactory.create(config);
const total = campaign.apply(price * quantity);
```

V3 使用策略模式：

```ts
const context = new CampaignContext(
  new PercentageCampaign(0.8),
);
const total = context.calculate(price * quantity);
```

| V2：簡單工廠 | V3：策略模式 |
|---|---|
| 解決建立哪個物件 | 解決如何替換演算法 |
| 工廠依設定建立 Campaign | Context 接收 Campaign |
| Client 不直接建立具體類別 | Client 選擇並建立具體策略 |
| 新增種類通常要修改工廠 | 新增策略不必修改 Context |
| 沒有 Context | Context 統一使用策略 |

兩種模式不是互相取代。簡單工廠管理建立，策略模式管理演算法的使用與替換。後續也可以組合兩者。

## 優點

- 每個計價演算法有獨立類別，責任清楚。
- 不同策略使用相同的 `Campaign` 介面。
- Context 不依賴具體策略。
- 新策略可以在不修改 Context 的情況下加入。
- 可以在測試中將不同策略注入同一種 Context API。

## 代價

- Client 必須知道有哪些具體策略，才能選擇正確物件。
- 每個演算法都會增加一個類別。
- 如果演算法很少而且永遠不變，策略模式可能比直接條件判斷更複雜。
- 本版仍在 client 保留選擇策略的 `switch`。

## 策略替換不等於策略疊加

本版 Context 一次持有一個 Campaign：

```ts
new CampaignContext(new PercentageCampaign(0.8));
```

它表示在多個策略中選擇一個，不表示同時套用八折與滿額折抵。多個促銷依序執行需要 Pipeline、Composite 或 Decorator 等額外設計，應留到另一個版本處理。

## 執行方式

執行 v3 client：

```sh
npm run exercise -- exercises/02-store-promotion/store-promotion-v3-main.ts
```

執行全部測試：

```sh
npm test
```

執行型別檢查：

```sh
npm run typecheck
```
