import { RankForgeSection } from "@/components/rankforge-section";

export default function ReportsPage() {
  return <RankForgeSection eyebrow="Executive reporting" title="Reports" description="Package SEO performance into clear, repeatable reporting for leadership, marketing, product, and client stakeholders." action="Create report" stats={[{ label: "Reports generated", value: "48", change: "+8 this quarter" }, { label: "Scheduled reports", value: "6", change: "All healthy" }, { label: "Stakeholders", value: "24", change: "+3 added" }]} rows={[{ name: "Northstar monthly executive report", value: "September 2026", detail: "Traffic, rankings, health, revenue influence", status: "Ready" }, { name: "Technical SEO health report", value: "August 2026", detail: "Crawl issues and remediation progress", status: "Scheduled" }, { name: "Content growth report", value: "Q3 2026", detail: "Topic coverage and opportunity pipeline", status: "Draft" }]} />;
}
