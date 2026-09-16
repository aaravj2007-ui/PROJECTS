import Link from "next/link";

function PrismLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-label="RankForge logo" role="img">
      <defs>
        <linearGradient id="prism-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M40 6L67 24L53 68L27 68L13 24L40 6Z"
        fill="url(#prism-core-gradient)"
        opacity="0.2"
      />
      <path d="M40 9L60 24L49 62H31L20 24L40 9Z" fill="none" stroke="url(#prism-core-gradient)" strokeWidth="3.5" />
      <path d="M40 9V62M20 24H60M31 62L40 35L49 62" fill="none" stroke="#dbeafe" strokeWidth="2.2" opacity="0.9" />
    </svg>
  );
}

const stats = [
  { value: "184.2K", label: "Organic traffic", delta: "+12.4%" },
  { value: "$842K", label: "Revenue influence", delta: "+15.7%" },
  { value: "86/100", label: "SEO health", delta: "+4.3 pts" },
  { value: "31%", label: "AI visibility", delta: "+4.8 pts" },
];

const highlights = [
  "Enterprise crawler & technical audit",
  "Google Search Console + GA intelligence",
  "AI opportunity engine & action tasks",
  "Executive reporting, alerts, and API access",
];

const modules = [
  {
    title: "Crawl & Technical SEO",
    text: "Detect noindex issues, canonical loops, redirect chains, crawl drift, and page-level technical debt before they impact growth.",
    accent: "from-cyan-500/20 to-sky-500/5",
  },
  {
    title: "Keyword & Rank Intelligence",
    text: "Map intent, cluster topics, surface priority gaps, and watch ranking movement across desktop, mobile, and country segments.",
    accent: "from-violet-500/20 to-fuchsia-500/5",
  },
  {
    title: "AI SEO Analyst",
    text: "Turn actual connected data into explainable answers about traffic drops, cannibalization, and the next best actions to take.",
    accent: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "Opportunity Engine",
    text: "Prioritize recommendations using impact, effort, and business value so teams focus on the actions that move revenue.",
    accent: "from-amber-500/20 to-orange-500/5",
  },
];

const workflow = [
  { step: "01", title: "Connect", text: "Connect websites, Search Console, Analytics, and project goals." },
  { step: "02", title: "Crawl & Analyze", text: "Audit URLs, rankings, and technical signals across the full digital footprint." },
  { step: "03", title: "Diagnose", text: "Use rules, data patterns, and AI reasoning to explain why performance is changing." },
  { step: "04", title: "Prioritize & Act", text: "Convert the highest-impact opportunities into tasks, experiments, and measurable outcomes." },
];

const priorities = [
  { name: "Fix indexation issues", value: "9.7/10", detail: "142 product pages impacted" },
  { name: "Improve CTR on category pages", value: "8.9/10", detail: "+18.4K estimated visits" },
  { name: "Resolve cannibalization", value: "8.2/10", detail: "Footwear collection cluster" },
  { name: "Create comparison content", value: "7.6/10", detail: "Premium device buyer intent" },
];

export default function Home() {
  return (
    <main className="rankforge-home min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <header className="rounded-full border border-slate-800/80 bg-slate-900/70 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/80 ring-1 ring-slate-700">
                <PrismLogo className="h-8 w-8" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-[0.26em] text-white">RANKFORGE</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">AI Organic Growth Intelligence</div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#platform" className="transition hover:text-white">Platform</a>
              <a href="#workflow" className="transition hover:text-white">Workflow</a>
              <a href="#dashboard" className="transition hover:text-white">Dashboard</a>
              <a href="#insights" className="transition hover:text-white">Insights</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 md:inline-flex"
              >
                Open dashboard
              </Link>
              <Link
                href="/demo"
                className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Request demo
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-200">
              AI Operating System for Organic Growth
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              RankForge turns search data into business growth.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Built for enterprise teams that need a clear answer to one question: what should we do next to increase traffic, visibility, leads, and revenue?
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-full bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore dashboard
              </Link>
              <Link
                href="#platform"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-center font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
              >
                View platform
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div key={item} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="dashboard" className="rounded-[30px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 shadow-[0_30px_80px_rgba(6,182,212,0.12)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/80 ring-1 ring-slate-700">
                  <PrismLogo className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Northstar Commerce</div>
                  <div className="mt-2 text-2xl font-semibold text-white">Executive dashboard</div>
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                +15.7% revenue
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <div className="text-sm text-slate-400">{stat.label}</div>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="text-xs font-medium text-emerald-300">{stat.delta}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-slate-300">Visibility & revenue trend</div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Q1-Q4</div>
              </div>

              <div className="flex h-28 items-end gap-2">
                {[28, 42, 36, 60, 55, 88, 76, 98, 90, 118, 128, 146].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 via-cyan-400 to-emerald-400"
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Crawled URLs", value: "1.4M", meta: "Monitored" },
            { label: "Critical issues", value: "23", meta: "Need attention" },
            { label: "Opportunity score", value: "9.4", meta: "Top priorities" },
            { label: "Tasks generated", value: "148", meta: "Actionable" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="text-sm text-slate-400">{item.label}</div>
              <div className="mt-4 text-3xl font-semibold text-white">{item.value}</div>
              <div className="mt-2 text-xs text-slate-400">{item.meta}</div>
            </div>
          ))}
        </section>

        <section id="platform" className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Platform overview</div>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              A unified digital twin for organic growth.
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              RankForge connects website structure, rankings, technical health, content, revenue, competitors, and AI visibility into a single operating system that turns raw data into business action.
            </p>

            <div className="mt-8 space-y-4">
              {modules.map((module) => (
                <div key={module.title} className={`rounded-2xl border border-slate-800 bg-gradient-to-r ${module.accent} p-[1px]`}>
                  <div className="rounded-2xl bg-slate-950/90 p-4">
                    <div className="text-lg font-semibold text-white">{module.title}</div>
                    <div className="mt-2 text-sm text-slate-300">{module.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Opportunity engine</div>
            <div className="mt-4 space-y-4">
              {priorities.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-medium text-white">{item.name}</div>
                      <div className="mt-2 text-xs text-slate-400">{item.detail}</div>
                    </div>
                    <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs font-medium text-cyan-200">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="mt-20 rounded-[30px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Operating loop</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Connect → Crawl → Analyze → Act</h3>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              AI + rules + evidence
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {workflow.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">{item.step}</div>
                <div className="mt-4 text-xl font-semibold text-white">{item.title}</div>
                <div className="mt-3 text-sm text-slate-300">{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="insights" className="mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">AI analyst</div>
            <div className="mt-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
              <div className="text-sm text-cyan-100">Organic traffic dropped 18% primarily because 3 high-performing pages lost rankings between August 20 and August 28.</div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                <span>View affected pages</span>
                <span className="text-cyan-300">→</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                <span>See ranking recovery plan</span>
                <span className="text-cyan-300">→</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                <span>Export evidence-backed brief</span>
                <span className="text-cyan-300">→</span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-800 bg-slate-900/80 p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">What makes it different</div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">From dashboard to decision-making system.</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="text-sm font-medium text-white">Traditional SEO</div>
                <div className="mt-2 text-sm text-slate-300">Data → Dashboard → Human interpretation</div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="text-sm font-medium text-white">RANKFORGE</div>
                <div className="mt-2 text-sm text-slate-300">Data → Intelligence → Opportunity → Action → Measurement</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 rounded-[30px] border border-slate-800 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-violet-500/10 p-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Product vision</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">RankForge gives enterprise teams the answer to what to do next.</h3>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Open the platform
            </Link>
            <Link href="/demo" className="rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800">
              Book a demo
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
