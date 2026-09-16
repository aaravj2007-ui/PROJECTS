import { DashboardShell } from '@/components/dashboard-shell';

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Portfolio</div>
              <h1 className="mt-2 text-3xl font-semibold text-white">Projects</h1>
            </div>
            <button className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">New project</button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ['Northstar Commerce', 'Retail', 'Healthy', '14.2M crawled URLs'],
            ['Northstar Europe', 'International', 'Monitoring', '8.6M crawled URLs'],
            ['Northstar Support', 'Help center', 'Healthy', '2.1M crawled URLs'],
          ].map(([name, type, status, value]) => (
            <div key={name} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-white">{name}</div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                  {status}
                </span>
              </div>
              <div className="mt-3 text-sm text-slate-400">{type}</div>
              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
