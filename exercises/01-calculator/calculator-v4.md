# Calculator V4：簡單工廠模式

## V4 是 V3 的下一個演進版本

V3 已經使用封裝、繼承、方法覆寫與多型，把四種運算分成不同的類別。不過，主程式仍然必須知道要建立哪個具體類別：

```ts
const operation: Operation = new OperationAdd();
```

V4 保留完整的 V3 類別結構，再加入 `OperationFactory`，把「選擇並建立具體運算物件」的責任從主程式移到工廠。

V4 是完整獨立版本，不會 import V3。這會產生一些重複程式碼，但能保留每個學習階段的完整樣貌，方便單獨閱讀與執行。

## 類別角色與建立流程

- `Operation`：抽象運算類別，封裝 `numberA`、`numberB`，並定義 `getResult()`。
- `OperationAdd`：實作加法。
- `OperationSubtract`：實作減法。
- `OperationMultiply`：實作乘法。
- `OperationDivide`：實作除法。
- `OperationFactory`：根據運算符建立對應的具體運算物件。

建立流程：

```text
主程式傳入運算符 "+"
        ↓
OperationFactory.createOperation("+")
        ↓
工廠建立 OperationAdd
        ↓
以 Operation 型別回傳
        ↓
主程式設定數值並呼叫 getResult()
```

主程式不需要直接建立具體類別：

```ts
const operation: Operation = OperationFactory.createOperation("+");
operation.numberA = 10;
operation.numberB = 2;

console.log(operation.getResult()); // 12
```

## 簡單工廠和 OOP 的關係

簡單工廠不是 OOP 的替代方案，也不是與 OOP 二選一。這個版本仍然使用 OOP：

- 封裝：運算資料由 `Operation` 管理。
- 抽象：`Operation` 定義所有運算共同的介面。
- 繼承：四個具體運算類別都繼承 `Operation`。
- 方法覆寫：每個子類別實作自己的 `getResult()`。
- 多型：工廠一律回傳 `Operation`，實際執行的方法由具體物件決定。

簡單工廠是在這些 OOP 基礎上，額外封裝物件的建立邏輯。

## 與 V3 的差異

V3 由主程式直接選擇具體類別：

```ts
const operation: Operation = new OperationAdd();
```

V4 由工廠選擇具體類別：

```ts
const operation: Operation = OperationFactory.createOperation("+");
```

兩個版本都使用多型。差別在於誰負責知道 `OperationAdd`、`OperationSubtract` 等具體類別。

- V3：主程式知道具體類別。
- V4：工廠知道具體類別，主程式只知道工廠和 `Operation`。

## 優點與代價

優點：

- 主程式不需要 import 或直接建立具體運算類別。
- 物件建立邏輯集中在同一個地方。
- UI、CLI 或其他呼叫端可以只傳入運算符，不必重複相同的 `switch`。
- 工廠回傳共同的 `Operation` 型別，呼叫端可以統一使用多型。

代價：

- `OperationFactory` 依賴所有具體運算類別。
- 新增平方根等運算時，除了新增子類別，也必須修改工廠的 `switch`。
- 工廠會隨著運算種類增加而變大。
- 建立規則若經常變化，工廠容易成為集中耦合點。

所以這不是絕對比較好的版本，而是把耦合從各個呼叫端集中到工廠。它降低了主程式與具體類別的耦合，但提高了工廠與具體類別的耦合。

## 適用時機

簡單工廠適合：

- 可建立的物件種類不多。
- 種類相對穩定。
- 建立規則簡單。
- 希望呼叫端不直接依賴具體類別。

如果種類很多、經常增加，或外部使用者需要加入新類型而不能修改原始工廠，之後可以再考慮工廠方法、抽象工廠或註冊表等設計。

## 執行命令

執行主程式：

```sh
npm run exercise -- exercises/01-calculator/calculator-v4-main.ts
```

執行所有測試：

```sh
npm test
```

執行型別檢查：

```sh
npm run typecheck
```
