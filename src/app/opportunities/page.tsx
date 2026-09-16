import { DashboardShell } from '@/components/dashboard-shell';

const opportunities = [
  ['Fix accidental noindex on 142 product pages', '+32,000 impressions', '9.7/10', 'Critical'],
  ['Improve CTR on high-impression category pages', '+18,400 visits', '8.9/10', 'High'],
  ['Resolve keyword cannibalization', '+11,200 visits', '8.2/10', 'High'],
  ['Create comparison content', '+9,700 visits', '7.6/10', 'Medium'],
];

export default function OpportunitiesPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Opportunity engine</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Opportunities</h1>
        </div>

        <div className="space-y-4">
          {opportunities.map(([title, impact, score, label]) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm text-slate-400">{impact}</div>
                </div>
                <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
                  {score}
                </div>
              </div>
              <div className="mt-4 inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-200">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
