import { DashboardShell } from '@/components/dashboard-shell';

export default function AIVVisibilityPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">AI visibility</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">AI & LLM visibility</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['Share of voice', '31%', 'Brand mentions across answer engines'],
            ['Citations', '184', 'Source-backed mentions in AI results'],
            ['Competitor gap', '14pt', 'Brand visibility lag vs market leader'],
          ].map(([title, value, detail]) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm text-slate-400">{title}</div>
              <div className="mt-3 text-4xl font-semibold text-white">{value}</div>
              <div className="mt-4 text-sm text-slate-300">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
