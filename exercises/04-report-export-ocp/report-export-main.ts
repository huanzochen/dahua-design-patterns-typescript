import {
  Report,
  ReportService,
  TextReportRenderer,
} from "./report-export.js";

const weeklySales: Report = {
  title: "Weekly Sales",
  rows: [
    { product: "Book", amount: 120 },
    { product: "Pen", amount: 30 },
  ],
};

const service = new ReportService(new TextReportRenderer());
console.log(service.render(weeklySales));
