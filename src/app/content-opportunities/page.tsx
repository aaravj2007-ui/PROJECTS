import { RankForgeSection } from "@/components/rankforge-section";

export default function ContentOpportunitiesPage() {
  return <RankForgeSection eyebrow="Content intelligence" title="Content Opportunities" description="Turn keyword demand and competitor gaps into a prioritized editorial roadmap for writers, strategists, and revenue teams." action="Create content brief" stats={[{ label: "Topics to cover", value: "184", change: "+22 this week" }, { label: "Traffic potential", value: "86.4K", change: "+14.1%" }, { label: "Briefs ready", value: "32", change: "12 assigned" }]} rows={[{ name: "SEO automation comparison", value: "18.4K volume", detail: "Commercial topic with moderate difficulty", status: "Brief ready" }, { name: "Technical audit checklist", value: "12.8K volume", detail: "Existing page can be refreshed", status: "Refresh" }, { name: "Enterprise SEO workflows", value: "9.7K volume", detail: "No dedicated landing page exists", status: "Create" }]} />;
}
