import { DashboardShell } from '@/components/dashboard-shell';

const issues = [
  ['Indexation leak', '142 product pages excluded from search', 'Critical'],
  ['Canonical loop', 'Collection pages with conflicting canonical URLs', 'High'],
  ['Broken internal links', '84 orphaned URLs detected', 'Medium'],
  ['Structured data', '19 product pages missing review schema', 'Medium'],
];

export default function SiteAuditPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Technical health</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Site audit</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">SEO health score</div>
            <div className="mt-3 flex items-end gap-3">
              <div className="text-5xl font-semibold text-white">86</div>
              <div className="mb-2 text-sm text-emerald-300">Strong momentum</div>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ['Technical SEO', 92],
                ['Content quality', 81],
                ['Performance', 88],
                ['Authority', 76],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">Issue summary</div>
            <div className="mt-4 space-y-3">
              {issues.map(([title, detail, severity]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-base font-medium text-white">{title}</div>
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-rose-200">
                      {severity}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-slate-400">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
