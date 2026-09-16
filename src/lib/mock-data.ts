export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  detail: string;
};

export type Opportunity = {
  title: string;
  impact: string;
  effort: string;
  priority: number;
  description: string;
  status: "Critical" | "High" | "Medium";
};

export type Task = {
  id: string;
  title: string;
  owner: string;
  priority: "High" | "Medium" | "Low";
  status: string;
};

export const overview = {
  orgName: "Northstar Commerce",
  projectName: "northstar.com",
  healthScore: 86,
  scoreBreakdown: [
    { label: "Technical", value: 92 },
    { label: "Content", value: 81 },
    { label: "Performance", value: 88 },
    { label: "Authority", value: 76 },
  ],
  kpis: [
    { label: "Organic traffic", value: "184.2K", delta: "+12.4%", trend: "up", detail: "vs previous period" },
    { label: "Organic conversions", value: "3,420", delta: "+8.1%", trend: "up", detail: "qualified leads" },
    { label: "Organic revenue", value: "$842K", delta: "+15.7%", trend: "up", detail: "last 90 days" },
    { label: "Avg. ranking", value: "7.4", delta: "-0.6", trend: "down", detail: "for target keywords" },
    { label: "Top 3 keywords", value: "214", delta: "+22", trend: "up", detail: "across core topics" },
    { label: "AI visibility", value: "31%", delta: "+4.8 pts", trend: "up", detail: "share of voice" },
  ] as Kpi[],
  opportunities: [
    {
      title: "Fix accidental noindex on 142 product pages",
      impact: "+32,000 monthly impressions",
      effort: "Low",
      priority: 9.7,
      description: "Pages are being excluded from indexation, which suppresses the product catalog from organic discovery.",
      status: "Critical",
    },
    {
      title: "Improve CTR on high-impression category pages",
      impact: "+18,400 estimated visits",
      effort: "Medium",
      priority: 8.9,
      description: "A page cluster has strong impressions but positioning in the 3–10 range with weak title and description performance.",
      status: "High",
    },
    {
      title: "Resolve keyword cannibalization in footwear collection",
      impact: "+11,200 estimated visits",
      effort: "Medium",
      priority: 8.2,
      description: "Three collection pages compete for the same commercial intent and dilute authority and CTR.",
      status: "High",
    },
    {
      title: "Create comparison content for premium laptop buyers",
      impact: "+9,700 estimated visits",
      effort: "Medium",
      priority: 7.6,
      description: "The competitive gap analysis shows consistent buyer demand without equivalent comparison coverage.",
      status: "Medium",
    },
  ] as Opportunity[],
  tasks: [
    { id: "SEO-1421", title: "Duplicate titles on 42 product templates", owner: "Content team", priority: "High", status: "Open" },
    { id: "SEO-1487", title: "Fix canonical chain on collection pages", owner: "Development", priority: "High", status: "In progress" },
    { id: "SEO-1503", title: "Refresh high-intent comparison articles", owner: "Content team", priority: "Medium", status: "Queued" },
  ] as Task[],
};

export const projects = [
  { id: "proj-01", name: "Northstar Commerce", type: "Retail", status: "Healthy" },
  { id: "proj-02", name: "Northstar Europe", type: "International", status: "Monitoring" },
  { id: "proj-03", name: "Northstar Support", type: "Help Center", status: "Healthy" },
];

export const overviewMetrics = [
  { title: "Organic Traffic", value: "248,392", change: "+18.4%", positive: true, spark: [35, 42, 38, 56, 62, 60, 76, 74, 88, 90] },
  { title: "Organic Keywords", value: "42,891", change: "+12.7%", positive: true, spark: [28, 36, 40, 52, 48, 58, 66, 72, 78, 84] },
  { title: "Average Position", value: "8.4", change: "+1.8", positive: true, spark: [52, 49, 56, 58, 54, 60, 62, 67, 64, 70] },
  { title: "Domain Authority", value: "71", change: "+4", positive: true, spark: [44, 48, 52, 50, 58, 60, 64, 68, 66, 72] },
  { title: "Backlinks", value: "128,492", change: "+9.3%", positive: true, spark: [34, 42, 39, 48, 50, 66, 64, 72, 74, 82] },
];

export const performanceData = [
  { date: "Jan", traffic: 180 },
  { date: "Feb", traffic: 190 },
  { date: "Mar", traffic: 205 },
  { date: "Apr", traffic: 198 },
  { date: "May", traffic: 224 },
  { date: "Jun", traffic: 238 },
  { date: "Jul", traffic: 248 },
  { date: "Aug", traffic: 260 },
  { date: "Sep", traffic: 272 },
  { date: "Oct", traffic: 266 },
  { date: "Nov", traffic: 285 },
  { date: "Dec", traffic: 310 },
];

export const auditSummary = [
  { label: "Technical SEO", value: 94 },
  { label: "On-Page SEO", value: 88 },
  { label: "Performance", value: 82 },
  { label: "Content", value: 91 },
  { label: "Backlinks", value: 79 },
];

export const keywordRows = [
  { keyword: "best project management software", position: "7", previous: "9", volume: "34.2K", traffic: "14.8K", difficulty: "62", intent: "Commercial", trend: "+2.4" },
  { keyword: "AI SEO tools", position: "5", previous: "7", volume: "21.6K", traffic: "11.9K", difficulty: "58", intent: "Commercial", trend: "+1.9" },
  { keyword: "enterprise SEO platform", position: "11", previous: "14", volume: "18.4K", traffic: "9.7K", difficulty: "51", intent: "Transactional", trend: "+3.1" },
  { keyword: "technical SEO audit", position: "3", previous: "4", volume: "12.8K", traffic: "8.3K", difficulty: "49", intent: "Informational", trend: "+1.2" },
  { keyword: "SEO automation", position: "9", previous: "12", volume: "16.1K", traffic: "7.1K", difficulty: "39", intent: "Navigational", trend: "+2.9" },
];

export const opportunityRows = [
  { title: "Optimize declining pages", impact: "+8,400 estimated monthly traffic", difficulty: "Medium", priority: "High" },
  { title: "Improve internal linking", impact: "+4,200 estimated monthly traffic", difficulty: "Low", priority: "High" },
  { title: "Target missing commercial keywords", impact: "+12,800 estimated monthly traffic", difficulty: "Medium", priority: "Critical" },
];
