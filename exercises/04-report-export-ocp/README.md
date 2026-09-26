# 第四章練習：報表匯出與開放－封閉原則

## 情境

系統目前可以把銷售報表匯出成純文字或 CSV。新的需求是加入 Markdown 格式，而且產品經理說之後可能還會有 JSON、HTML 等格式。

目前所有格式都寫在 `ReportService.render()` 的 `switch` 裡。這個版本並沒有錯，而且在格式固定時很容易閱讀；問題是每增加一種格式，都必須修改這個已經有測試的函式。

## 開始前

先執行目前的程式與測試：

```sh
npm run exercise -- exercises/04-report-export-ocp/report-export-main.ts
npm test
```

閱讀 `report-export.ts`，回答：

1. 新增 Markdown 時，需要修改哪些既有型別與程式碼？
2. 如果修改 CSV 時不小心影響純文字格式，哪個測試會發現？
3. 這裡真正會變化的是報表資料、匯出格式，還是整個服務流程？

## 第一階段：先直接加入需求

先不要抽象，直接在目前的 `switch` 加入 `markdown`：

```text
# Weekly Sales

| Product | Amount |
| --- | ---: |
| Book | 120 |
| Pen | 30 |
```

為 Markdown 補上測試。完成後觀察：你為了增加功能，修改了哪些既有程式碼？

這一步不是故意寫壞程式，而是先確認變化真的存在。沒有感受到修改成本以前，不急著套用抽象。

## 第二階段：套用 OCP

重構程式，使 `ReportService` 對新的輸出格式保持穩定：

1. 定義一個只有 `render(report: Report): string` 的 `ReportRenderer` 介面。
2. 建立 `TextReportRenderer`、`CsvReportRenderer` 與 `MarkdownReportRenderer`。
3. 讓 `ReportService` 從 constructor 接收 `ReportRenderer`。
4. 讓 `ReportService.render()` 只委派工作，不再用 `switch` 判斷格式。
5. 更新測試，確認三種格式的輸出與重構前相同。

預期使用方式：

```ts
const service = new ReportService(new MarkdownReportRenderer());
const output = service.render(report);
```

## 驗收挑戰

再加入一個 `JsonReportRenderer`。完成後應符合：

- 只新增 renderer 與它的測試。
- 不修改 `ReportService`。
- 不修改其他 renderer。
- 原有測試仍然通過。

如果做到了，穩定的 `ReportService` 就是「對修改封閉」，renderer 的共同介面則讓系統「對擴充開放」。這不代表程式永遠不修改，而是新增格式時，不必反覆碰核心流程。

## 限制

這個練習只需要一個小介面，不需要：

- 抽象基底類別。
- Factory 或 registry。
- 泛型。
- Dependency Injection framework。
- 每個類別各拆一個檔案。

如果重構後比原本更難說明，先停下來檢查抽象是否超過需求。

## 思考題

1. 如果系統永遠只支援 CSV，而且格式不會增加，原本的 `switch` 是否反而更適合？
2. OCP 消除了 `if` 嗎，還是把「選擇哪個 renderer」留給呼叫端？
3. 如果所有 renderer 都要先檢查空報表，這個規則應該放在哪裡？為什麼？
