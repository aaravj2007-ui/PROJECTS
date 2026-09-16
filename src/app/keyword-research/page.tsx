"use client";

import { DashboardShell } from '@/components/dashboard-shell';
import { useState } from 'react';

const keywords = [
  { keyword: 'best project management software', volume: '34.2K', kd: '62', cpc: '$18.40', intent: 'Commercial', potential: '14.8K', trend: '+2.4%', serp: ['Featured Snippet', 'People Also Ask'] },
  { keyword: 'AI SEO tools', volume: '21.6K', kd: '58', cpc: '$15.20', intent: 'Commercial', potential: '11.9K', trend: '+1.9%', serp: ['Videos', 'Reviews'] },
  { keyword: 'enterprise SEO platform', volume: '18.4K', kd: '51', cpc: '$22.10', intent: 'Transactional', potential: '9.7K', trend: '+3.1%', serp: ['Featured Snippet', 'Local Pack'] },
  { keyword: 'technical SEO audit', volume: '12.8K', kd: '49', cpc: '$16.80', intent: 'Informational', potential: '8.3K', trend: '+1.2%', serp: ['People Also Ask', 'Videos'] },
];

const intentClasses: Record<string, string> = {
  Commercial: 'bg-violet-50 text-violet-700',
  Transactional: 'bg-blue-50 text-blue-700',
  Informational: 'bg-amber-50 text-amber-700',
  Navigational: 'bg-emerald-50 text-emerald-700',
};

export default function KeywordResearchPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const visibleKeywords = keywords.filter((row) => row.keyword.toLowerCase().includes(query.toLowerCase()));

  const exportKeywords = () => {
    const csv = [['Keyword', 'Volume', 'Difficulty', 'CPC', 'Intent'], ...visibleKeywords.map((row) => [row.keyword, row.volume, row.kd, row.cpc, row.intent])]
      .map((row) => row.join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rankforge-keyword-research.csv';
    link.click();
    URL.revokeObjectURL(url);
    setStatus('Keyword export downloaded.');
    setTimeout(() => setStatus(''), 2200);
  };

  const runResearch = () => {
    setStatus(`Research complete: ${visibleKeywords.length} keyword opportunities found.`);
    setTimeout(() => setStatus(''), 2600);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Keyword research</div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Keyword Research</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={exportKeywords} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">Export CSV</button>
              <button onClick={runResearch} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Run Research</button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keyword or topic..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white"
            />
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300">
              <option>Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300">
              <option>Language</option>
              <option>English</option>
              <option>German</option>
              <option>French</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300">
              <option>Search volume</option>
              <option>10K+</option>
              <option>25K+</option>
              <option>50K+</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300">
              <option>Intent</option>
              <option>Commercial</option>
              <option>Informational</option>
              <option>Transactional</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300">
              <option>CPC</option>
              <option>$10+</option>
              <option>$20+</option>
              <option>$30+</option>
            </select>
          </div>
        </div>

        {status ? <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{status}</div> : null}

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Keyword</th>
                  <th className="pb-3 pr-4 font-medium">Volume</th>
                  <th className="pb-3 pr-4 font-medium">KD</th>
                  <th className="pb-3 pr-4 font-medium">CPC</th>
                  <th className="pb-3 pr-4 font-medium">Intent</th>
                  <th className="pb-3 pr-4 font-medium">Traffic Potential</th>
                  <th className="pb-3 pr-4 font-medium">Trend</th>
                  <th className="pb-3 font-medium">SERP Features</th>
                </tr>
              </thead>
              <tbody>
                {visibleKeywords.map((row) => (
                  <tr key={row.keyword} className="border-t border-slate-200 text-sm text-slate-700">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{row.keyword}</td>
                    <td className="py-3 pr-4">{row.volume}</td>
                    <td className="py-3 pr-4">{row.kd}</td>
                    <td className="py-3 pr-4">{row.cpc}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${intentClasses[row.intent]}`}>{row.intent}</span>
                    </td>
                    <td className="py-3 pr-4">{row.potential}</td>
                    <td className="py-3 pr-4 text-emerald-600">{row.trend}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {row.serp.map((feature) => (
                          <span key={`${row.keyword}-${feature}`} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{feature}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
