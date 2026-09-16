import { DashboardShell } from "@/components/dashboard-shell";

type Row = { name: string; value: string; detail: string; status: string };

type SectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  rows: Row[];
  stats: { label: string; value: string; change: string }[];
};

export function RankForgeSection({ eyebrow, title, description, action, rows, stats }: SectionProps) {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{eyebrow}</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          </div>
          <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">{action}</button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</div>
                <div className="text-xs font-semibold text-emerald-600">{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Priority queue</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Recommended next actions</h2>
            </div>
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-slate-300">Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Opportunity</th>
                  <th className="pb-3 pr-4 font-medium">Value</th>
                  <th className="pb-3 pr-4 font-medium">Context</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-t border-slate-200 text-sm text-slate-700">
                    <td className="py-4 pr-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="py-4 pr-4">{row.value}</td>
                    <td className="py-4 pr-4 text-slate-500">{row.detail}</td>
                    <td className="py-4"><span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">{row.status}</span></td>
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
