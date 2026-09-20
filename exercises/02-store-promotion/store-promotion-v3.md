# Store Promotion V3：策略模式

## 先用一句話理解

策略模式做的事情是：

> 把一段可能被替換的計算方式放進獨立物件，讓使用者只透過共同介面執行它。

在商場促銷範例中，「正常收費」、「八折」與「滿 300 減 100」都是不同的計算方式，也就是不同策略。

策略模式不是為了消滅所有 `switch`，也不是負責自動找到最優惠的活動。它主要處理的是：選定一個演算法之後，系統如何用相同方式執行它。

## 從沒有策略模式開始

最直接的寫法會把所有公式放在一起：

```ts
function calculate(amount: number, campaignType: string): number {
  switch (campaignType) {
    case "normal":
      return amount;
    case "percentage":
      return amount * 0.8;
    case "rebate":
      return amount - Math.floor(amount / 300) * 100;
    default:
      throw new Error(`Unsupported campaign: ${campaignType}`);
  }
}
```

這裡混合了兩個不同問題：

1. 要使用哪一種促銷？
2. 每種促銷如何計算？

每新增一種促銷，都要回到同一個函式增加分支與公式。選擇邏輯和計算邏輯綁在一起。

## 第一步：找出會變化的部分

三種促銷都有相同形狀：

```text
輸入原始金額 → 執行某種計算 → 回傳實收金額
```

因此可以定義共同操作：

```ts
abstract apply(amount: number): number;
```

這個操作就是所有策略之間的約定。只要一個物件遵守這個約定，Context 就能使用它。

## 第二步：把每個公式搬進獨立物件

原本 `switch` 裡的三段公式被拆成三個類別：

```ts
class NoCampaign extends Campaign {
  apply(amount: number): number {
    return amount;
  }
}

class PercentageCampaign extends Campaign {
  apply(amount: number): number {
    return amount * 0.8;
  }
}

class RebateCampaign extends Campaign {
  apply(amount: number): number {
    return amount - Math.floor(amount / 300) * 100;
  }
}
```

現在每個類別只負責一個演算法。修改百分比折扣時，不需要碰滿額折抵的公式。

這一步就是策略模式最核心的動作：**封裝會變化的演算法**。

## 第三步：讓 Context 使用抽象策略

`CampaignContext` 不判斷策略種類，也不知道八折或滿額折抵的公式：

```ts
class CampaignContext {
  constructor(private readonly campaign: Campaign) {}

  calculate(amount: number): number {
    return this.campaign.apply(amount);
  }
}
```

建立 Context 時，外部把策略放進去：

```ts
const context = new CampaignContext(
  new PercentageCampaign(0.8),
);
```

之後 Context 只做委派：

```ts
context.calculate(1000);
```

Context 不必詢問策略是哪個類別。實際物件是 `PercentageCampaign`，所以執行它的 `apply()`；換成 `RebateCampaign`，同一行 Context 程式就會執行滿額折抵。

```ts
const percentageContext = new CampaignContext(
  new PercentageCampaign(0.8),
);

const rebateContext = new CampaignContext(
  new RebateCampaign(300, 100),
);

percentageContext.calculate(1000); // 800
rebateContext.calculate(1000); // 700
```

這就是「策略可以互相替換」的意思：Context 的程式碼不變，只替換注入的物件。

## 策略模式究竟改變了什麼

改寫前：

```text
Client
  └── switch
      ├── 正常收費公式
      ├── 百分比公式
      └── 滿額折抵公式
```

改寫後：

```text
Client 選擇策略
        ↓
CampaignContext
        ↓
Campaign 共同介面
        ↓
某一個具體策略物件
```

真正的變化有四點：

1. 每個演算法有自己的類別。
2. 所有演算法提供相同的操作。
3. Context 依賴抽象 `Campaign`，不依賴具體公式。
4. 使用哪個演算法，改由外部透過建構子注入。

換句話說，策略模式把「演算法的選擇」和「演算法的執行」分開：

- Client 選擇策略。
- Context 執行策略。
- ConcreteStrategy 保存公式。

## Context 只有一行，真的有必要嗎

在目前的小範例裡，直接呼叫策略也能得到答案：

```ts
const campaign = new PercentageCampaign(0.8);
campaign.apply(1000);
```

所以如果只看這個三十行左右的練習，`CampaignContext` 的確顯得很薄。這是合理的觀察，不需要為了模式而假裝它很複雜。

Context 的價值通常在真實流程變大後出現。例如所有策略都需要相同的前後處理：

```ts
class CampaignContext {
  calculate(amount: number): number {
    console.log(`Original amount: ${amount}`);

    const result = this.campaign.apply(amount);

    console.log(`Final amount: ${result}`);
    return result;
  }
}
```

這些共通流程只需要放在 Context，不必散落在每個 client，也不必重複到每個策略類別。

因此可以這樣判斷：

- 只有一個簡單函式呼叫時，Context 可能沒有太大價值。
- 有固定流程但其中一個步驟需要替換時，Context 很有價值。
- 策略模式的核心是可替換演算法；Context 是管理及使用策略的角色。

## 策略模式沒有做什麼

策略模式本身沒有負責：

- 從字串或設定檔建立策略。
- 自動決定哪個策略最優惠。
- 消除 client 選擇策略的程式。
- 同時疊加多個策略。
- 驗證折扣率或處理金額精度。

這些是其他責任，可能分別需要 Factory、規則引擎、Pipeline、Composite、Decorator 或金額型別等設計。

## 一個生活化比喻

可以把 Context 想成導航程式，把 Strategy 想成路線演算法：

```text
導航 Context
├── 最快路線 Strategy
├── 最短路線 Strategy
└── 避開收費道路 Strategy
```

導航流程都是「輸入起點與終點，取得路線」，但計算路線的演算法可以替換。導航程式不需要把三套尋路公式寫在同一個 `switch` 裡。

商場範例也是相同概念：Context 的使用流程固定，但實收金額的演算法可以替換。

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
