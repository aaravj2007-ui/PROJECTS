import { RankForgeSection } from "@/components/rankforge-section";

export default function SerpAnalysisPage() {
  return <RankForgeSection eyebrow="Search results" title="SERP Explorer" description="Inspect the real search landscape behind target queries, including intent, result features, ranking pages, and opportunities to outperform the current leaders." action="Analyze SERP" stats={[{ label: "Queries analyzed", value: "1,842", change: "+18.2%" }, { label: "Featured snippets", value: "38", change: "+7 won" }, { label: "SERP opportunities", value: "214", change: "+32 found" }]} rows={[{ name: "AI SEO tools", value: "Position 5", detail: "Reviews and videos dominate the SERP", status: "Optimize" }, { name: "Enterprise SEO platform", value: "Position 11", detail: "Commercial pages have strong opportunity", status: "Prioritize" }, { name: "Technical SEO audit", value: "Position 3", detail: "People Also Ask expansion available", status: "Expand" }]} />;
}
