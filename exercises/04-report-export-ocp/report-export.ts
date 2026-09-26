export interface ReportRow {
  product: string;
  amount: number;
}

export interface Report {
  title: string;
  rows: ReportRow[];
}

export interface ReportRenderer {
  render(report: Report): string;
}

export class TextReportRenderer implements ReportRenderer {
  render(report: Report): string {
    return [
      report.title,
      ...report.rows.map((row) => `${row.product}: ${row.amount}`),
    ].join("\n");
  }
}

export class CsvReportRenderer implements ReportRenderer {
  render(report: Report): string {
    return [
      "product,amount",
      ...report.rows.map((row) => `${row.product},${row.amount}`),
    ].join("\n");
  }
}

export class MarkdownReportRenderer implements ReportRenderer {
  render(report: Report): string {
    return [
      `# ${report.title}`,
      "",
      "| Product | Amount |",
      "| --- | ---: |",
      ...report.rows.map((row) => `| ${row.product} | ${row.amount} |`),
    ].join("\n");
  }
}

export class JsonReportRenderer implements ReportRenderer {
  render(report: Report): string {
    return JSON.stringify(report);
  }
}

export class ReportService {
  constructor(private readonly renderer: ReportRenderer) {}

  render(report: Report): string {
    return this.renderer.render(report);
  }
}
