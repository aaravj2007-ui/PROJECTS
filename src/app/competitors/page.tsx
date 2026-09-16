import { DashboardShell } from '@/components/dashboard-shell';

const competitors = [
  ['Apex Tech', '2,430 keywords', '14.2%', 'Top pages: 18'],
  ['Signal Labs', '1,980 keywords', '8.7%', 'High overlap on laptop guides'],
  ['Northwind AI', '1,420 keywords', '5.3%', 'Content gap in buyer guides'],
];

export default function CompetitorsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Competitor intelligence</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Competitors</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {competitors.map(([name, keywords, share, insight]) => (
            <div key={name} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-xl font-semibold text-white">{name}</div>
              <div className="mt-4 text-sm text-slate-400">{keywords}</div>
              <div className="mt-3 text-3xl font-semibold text-cyan-300">{share}</div>
              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">{insight}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
