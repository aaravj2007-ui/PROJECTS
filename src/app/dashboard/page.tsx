"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { overviewMetrics, performanceData, keywordRows, opportunityRows, auditSummary } from "@/lib/mock-data";

function MetricCard({
  title,
  value,
  change,
  positive,
  spark,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  spark: number[];
}) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500">{title}</div>
        <div className={`rounded-full px-2 py-1 text-[10px] font-semibold ${positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {change}
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div className="text-3xl font-bold tracking-tight text-slate-900">{value}</div>
        <div className="flex h-8 w-16 items-end gap-1">
          {spark.map((bar, index) => (
            <div key={`${title}-${index}`} className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-violet-500/70" style={{ height: `${Math.max(18, bar)}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeMetric, setActiveMetric] = useState("Traffic");
  const [activeRange, setActiveRange] = useState("30 days");
  const [notice, setNotice] = useState("");

  const generateReport = () => {
    const report = [
      ["RankForge Executive Report", new Date().toLocaleDateString()],
      ["Organic traffic", "248,392"],
      ["Organic keywords", "42,891"],
      ["Average position", "8.4"],
      ["SEO health", "87/100"],
    ].map((row) => row.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([report], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "rankforge-executive-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Executive report downloaded.");
    setTimeout(() => setNotice(""), 2200);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {notice ? <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{notice}</div> : null}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-sm text-slate-500">Good evening, Aarav</div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Here&apos;s what&apos;s happening across your SEO projects.</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300">
              <span aria-hidden="true" className="text-xs font-bold">+</span>
              Add Project
            </Link>
            <button onClick={generateReport} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
              Generate Report
            </button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {overviewMetrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              positive={metric.positive}
              spark={metric.spark}
            />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Performance</div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Organic Search Performance</h2>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-medium text-slate-600">
                {['Traffic', 'Keywords', 'Clicks', 'Impressions', 'CTR'].map((tab) => (
                  <button key={tab} onClick={() => setActiveMetric(tab)} className={`rounded-lg px-2.5 py-1.5 ${activeMetric === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
              {['30 days', '3 months', '6 months', '1 year'].map((range) => (
                <button key={range} onClick={() => setActiveRange(range)} className={`rounded-full px-2.5 py-1 ${activeRange === range ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                  {range}
                </button>
              ))}
            </div>

            <div className="mb-2 text-xs text-slate-400">Showing {activeMetric.toLowerCase()} for {activeRange}</div>
            <div className="h-[280px] w-full">
              <div className="flex h-full items-end gap-2 border-b border-l border-slate-200 px-3 pb-2">
                {performanceData.map((point) => (
                  <div key={point.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-violet-400" style={{ height: `${(point.traffic / 320) * 100}%` }} />
                    <span className="text-[10px] text-slate-400">{point.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">SEO health</div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold tracking-tight text-slate-900">87</div>
                <div className="text-sm text-slate-500">/ 100</div>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_0deg,#2563eb_313deg,#e2e8f0_313deg_360deg)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900">87%</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {auditSummary.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/site-audit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
              <span className="text-xs font-bold">OK</span>
              View Full Audit
            </Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Keyword performance</div>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Keyword Performance</h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    <th className="pb-3 pr-4 font-medium">Keyword</th>
                    <th className="pb-3 pr-4 font-medium">Position</th>
                    <th className="pb-3 pr-4 font-medium">Previous</th>
                    <th className="pb-3 pr-4 font-medium">Volume</th>
                    <th className="pb-3 pr-4 font-medium">Traffic</th>
                    <th className="pb-3 pr-4 font-medium">Difficulty</th>
                    <th className="pb-3 pr-4 font-medium">Intent</th>
                    <th className="pb-3 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordRows.map((row) => (
                    <tr key={row.keyword} className="border-t border-slate-200 text-sm">
                      <td className="py-3 pr-4 font-medium text-slate-900">{row.keyword}</td>
                      <td className="py-3 pr-4 text-slate-600">{row.position}</td>
                      <td className="py-3 pr-4 text-slate-600">{row.previous}</td>
                      <td className="py-3 pr-4 text-slate-600">{row.volume}</td>
                      <td className="py-3 pr-4 text-slate-600">{row.traffic}</td>
                      <td className="py-3 pr-4 text-slate-600">{row.difficulty}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${row.intent === 'Commercial' ? 'bg-violet-50 text-violet-700' : row.intent === 'Transactional' ? 'bg-blue-50 text-blue-700' : row.intent === 'Informational' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                          {row.intent}
                        </span>
                      </td>
                      <td className="py-3 text-emerald-600">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-xs">^</span>
                          {row.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Site audit</div>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Critical Issues</span>
                  <span className="font-semibold text-rose-600">12</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Warnings</span>
                  <span className="font-semibold text-amber-600">38</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Notices</span>
                  <span className="font-semibold text-slate-700">74</span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Passed Checks</span>
                  <span className="font-semibold text-emerald-600">421</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-slate-400">Competitor intelligence</div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">Competitor Intelligence</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {['Competitor A', 'Competitor B', 'Competitor C'].map((name) => (
                <div key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-medium text-slate-700">{name}</div>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between"><span>Traffic</span><span className="font-semibold text-slate-900">318K</span></div>
                    <div className="flex justify-between"><span>Keywords</span><span className="font-semibold text-slate-900">61K</span></div>
                    <div className="flex justify-between"><span>Backlinks</span><span className="font-semibold text-slate-900">420K</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI detected opportunities</div>
            <div className="mt-4 space-y-4">
              {opportunityRows.map((opportunity) => (
                <div key={opportunity.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-slate-900">{opportunity.title}</div>
                      <div className="mt-2 text-sm text-slate-600">{opportunity.impact}</div>
                    </div>
                    <div className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">{opportunity.priority}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>Difficulty: {opportunity.difficulty}</span>
                    <Link href="/opportunities" className="text-blue-700 hover:text-blue-800">View Opportunity</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
