import { DashboardShell } from '@/components/dashboard-shell';

const tasks = [
  ['SEO-1421', 'Duplicate titles on 42 product templates', 'Content team', 'High', 'Open'],
  ['SEO-1487', 'Fix canonical chain on collection pages', 'Development', 'High', 'In progress'],
  ['SEO-1503', 'Refresh high-intent comparison articles', 'Content team', 'Medium', 'Queued'],
];

export default function TasksPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Workflow</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Tasks</h1>
        </div>

        <div className="space-y-4">
          {tasks.map(([id, title, owner, priority, status]) => (
            <div key={id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-400">{id}</div>
                  <div className="mt-1 text-xl font-semibold text-white">{title}</div>
                </div>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-200">
                  {priority}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>{owner}</span>
                <span>{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
