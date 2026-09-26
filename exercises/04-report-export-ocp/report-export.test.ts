import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CsvReportRenderer,
  JsonReportRenderer,
  MarkdownReportRenderer,
  Report,
  ReportService,
  TextReportRenderer,
} from "./report-export.js";

const report: Report = {
  title: "Weekly Sales",
  rows: [
    { product: "Book", amount: 120 },
    { product: "Pen", amount: 30 },
  ],
};

test("renders a plain-text report", () => {
  const service = new ReportService(new TextReportRenderer());

  assert.equal(
    service.render(report),
    ["Weekly Sales", "Book: 120", "Pen: 30"].join("\n"),
  );
});

test("renders a CSV report", () => {
  const service = new ReportService(new CsvReportRenderer());

  assert.equal(
    service.render(report),
    ["product,amount", "Book,120", "Pen,30"].join("\n"),
  );
});

test("renders a Markdown report", () => {
  const service = new ReportService(new MarkdownReportRenderer());

  assert.equal(
    service.render(report),
    [
      "# Weekly Sales",
      "",
      "| Product | Amount |",
      "| --- | ---: |",
      "| Book | 120 |",
      "| Pen | 30 |",
    ].join("\n"),
  );
});

test("adds a JSON renderer without modifying ReportService", () => {
  const service = new ReportService(new JsonReportRenderer());

  assert.equal(
    service.render(report),
    JSON.stringify({
      title: "Weekly Sales",
      rows: [
        { product: "Book", amount: 120 },
        { product: "Pen", amount: 30 },
      ],
    }),
  );
});
