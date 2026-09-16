import { DashboardShell } from '@/components/dashboard-shell';

const rankings = [
  ['Gaming laptops', '6.4', '+1.2', 'Featured snippet'],
  ['Laptop buying guide', '4.8', '+2.3', 'Top 10'],
  ['Best gaming laptop under 1000', '2.9', '+0.6', 'Top 3'],
  ['Laptop comparison chart', '8.1', '-0.4', 'SERP feature'],
];

export default function RankingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Rank tracking</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Rankings</h1>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Keyword</span>
            <span>Position</span>
            <span>Change</span>
            <span>SERP</span>
          </div>

          <div className="mt-4 space-y-3">
            {rankings.map(([keyword, position, change, serp]) => (
              <div key={keyword} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200">
                <span className="font-medium text-white">{keyword}</span>
                <span>{position}</span>
                <span className={Number(change) >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{change}</span>
                <span>{serp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
