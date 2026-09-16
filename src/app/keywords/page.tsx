import { DashboardShell } from '@/components/dashboard-shell';

const keywords = [
  ['best gaming laptop', 'Commercial', '7.2', '41.8K'],
  ['gaming laptop under 1000', 'Transactional', '3.4', '18.6K'],
  ['gaming laptop comparison', 'Informational', '9.1', '12.9K'],
  ['best ultrabook 2026', 'Commercial', '5.8', '10.4K'],
];

export default function KeywordsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Keyword intelligence</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Keywords</h1>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Keyword</span>
            <span>Intent</span>
            <span>Position</span>
            <span>Volume</span>
          </div>

          <div className="mt-4 space-y-3">
            {keywords.map(([keyword, intent, position, volume]) => (
              <div key={keyword} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200">
                <span className="font-medium text-white">{keyword}</span>
                <span>{intent}</span>
                <span>{position}</span>
                <span>{volume}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
