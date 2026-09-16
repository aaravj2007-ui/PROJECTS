'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

function UiIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    overview: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    keywords: "M11 3a8 8 0 1 0 5.3 14L21 21M11 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    competitors: "M4 19V9m6 10V5m6 14v-7m4 7V3",
    serp: "M10.5 4a6.5 6.5 0 1 0 4.1 11.5L20 21m-5-5 5 5",
    content: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
    audit: "M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3zM9 12l2 2 4-5",
    assistant: "M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z",
    opportunities: "M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m8.2 8.2 2.8 2.8m0-13.8-2.8 2.8m-8.2 8.2-2.8 2.8",
    rankings: "M4 18V6m0 12h16M8 15l3-4 3 2 5-7",
    reports: "M6 3h9l3 3v15H6zM15 3v4h4M9 12h6M9 16h6",
    settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v3m0 11v3m9-8h-3M6 12H3",
    workspace: "M4 7h16v13H4zM8 7V4h8v3M8 12h8",
    help: "M12 18h.01M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-1 .8-1.6 1.2-1.6 2.6M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    search: "M10.5 4a6.5 6.5 0 1 0 4.1 11.5L20 21m-5-5 5 5",
    notification: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  };
  return <svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] ?? paths.help} /></svg>;
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: "overview" },
  { name: "Keyword Research", href: "/keyword-research", icon: "keywords" },
  { name: "Competitor Analysis", href: "/competitor-analysis", icon: "competitors" },
  { name: "SERP Explorer", href: "/serp-analysis", icon: "serp" },
  { name: "Content Opportunities", href: "/content-opportunities", icon: "content" },
  { name: "Site Audit", href: "/site-audit", icon: "audit" },
  { name: "AI SEO Assistant", href: "/ai-seo-assistant", icon: "assistant" },
  { name: "SEO Opportunities", href: "/opportunities", icon: "opportunities" },
  { name: "Rank Tracking", href: "/rankings", icon: "rankings" },
  { name: "Reports", href: "/reports", icon: "reports" },
  { name: "Settings", href: "/settings", icon: "settings" },
];

const insightIdeas = [
  "Traffic is concentrated in a few high-intent pages; content expansion in the mid-funnel could unlock 8.4K additional visits.",
  "Indexation issues on category pages are suppressing product discovery and conversion efficiency.",
  "Competitor overlap is strongest in commercial intent queries; new comparison content can close the gap.",
  "Your strongest opportunity is to improve CTR on ranking pages 3–10 using title and description refreshes.",
];

const quickPrompts = [
  "Why did my traffic drop?",
  "Find my biggest ranking opportunities",
  "Analyze my competitors",
  "Give me keywords I should target",
  "Find technical SEO problems",
  "Create a content brief",
];

function RankForgeLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 shadow-sm ${className}`}>
      <div className="relative h-6 w-6">
        <div className="absolute inset-0 rounded-lg border border-blue-400/70" />
        <div className="absolute inset-1 rounded-md border border-violet-400/70" />
        <div className="absolute inset-2 rounded border border-indigo-400/70" />
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [showAssistant, setShowAssistant] = useState(false);
  const [toast, setToast] = useState("");
  const [insight, setInsight] = useState(insightIdeas[0]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "I analyzed your launch campaign and found a strong opportunity in commercial-intent pages with rising impressions but weak CTR." },
  ]);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
    else if (!isLoading && user && !user.onboardingCompleted && pathname !== "/onboarding") router.replace("/onboarding");
  }, [isLoading, pathname, router, user]);

  if (isLoading || !user) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Loading your RankForge workspace...</div>;

  const exportReport = () => {
    const rows = [
      ["Metric", "Value"],
      ["Organic Traffic", "248,392"],
      ["Organic Keywords", "42,891"],
      ["Average Position", "8.4"],
      ["Domain Authority", "71"],
      ["Backlinks", "128,492"],
      ["SEO Health", "87/100"],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rankforge-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast("Executive report exported successfully.");
    setTimeout(() => setToast(""), 2400);
  };

  const generateInsight = () => {
    const nextInsight = insightIdeas[Math.floor(Math.random() * insightIdeas.length)];
    setInsight(nextInsight);
    setToast("New insight generated and queued for review.");
    setTimeout(() => setToast(""), 2400);
  };

  const sendMessage = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");

    const response =
      userText.toLowerCase().includes("drop")
        ? "Traffic likely dropped due to 3 high-intent pages losing rank after core updates. I recommend prioritizing page recovery and CTR optimization."
        : userText.toLowerCase().includes("opportunity")
          ? "The strongest opportunity is a commercial keyword cluster on your comparison pages, which shows 12.8K monthly traffic potential with moderate difficulty."
          : userText.toLowerCase().includes("competitor")
            ? "Your biggest competitor gap is in comparison and product round-up content, where they rank for 2,130 commercial queries that are missing from your site."
            : userText.toLowerCase().includes("technical")
              ? "I found 12 technical issues with moderate-to-high impact: indexation leakage, canonical conflicts, and a redirect chain across collection pages."
              : "I suggest improving your top 10 pages with strong impressions and low CTR, then expanding internal linking to the highest-value topics.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    }, 250);
  };

  return (
    <div className="rankforge-app min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-800 bg-slate-950/95 p-5 lg:block">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <RankForgeLogo className="h-10 w-10" />
            <div>
              <div className="text-xl font-bold tracking-tight text-white">RankForge</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">SEO Intelligence</div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="mb-2 px-2 text-[10px] uppercase tracking-[0.22em] text-slate-400">Overview</div>
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <UiIcon name={item.icon} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 border-t border-slate-800 pt-5">
            {[
              { label: "Workspace", icon: "workspace" },
              { label: "Settings", icon: "settings" },
              { label: "Help & Support", icon: "help" },
            ].map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => label === "Help & Support" ? setShowAssistant(true) : setToast(`${label} panel opened.`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
                <UiIcon name={Icon} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
            <div className="flex flex-col gap-4 px-4 py-4 xl:flex-row xl:items-center xl:justify-between xl:px-6">
              <div className="flex items-center gap-3">
                <div className="relative w-full max-w-md xl:w-[360px]">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><UiIcon name="search" /></span>
                  <input
                    aria-label="Global search"
                    placeholder="Search keywords, pages, reports..."
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setToast(`Searching RankForge for "${event.currentTarget.value}".`);
                        setTimeout(() => setToast(""), 2200);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400 focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => setToast("Workspace selector opened.")} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:border-slate-600">
                  <span>Northstar Commerce</span>
                  <span className="text-xs">v</span>
                </button>
                <button onClick={() => setToast("Date range selector opened.")} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:border-slate-600">
                  <span>Last 30 days</span>
                  <span className="text-xs">v</span>
                </button>
                <button aria-label="Notifications" onClick={() => setToast("You are all caught up.")} className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:border-slate-600 hover:text-white">
                  <UiIcon name="notification" />
                </button>
                <button aria-label="Help" onClick={() => setShowAssistant(true)} className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 hover:border-slate-600 hover:text-white">
                  <UiIcon name="help" />
                </button>
                <button onClick={() => { logout(); router.replace("/login"); }} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-2 py-1.5 text-left hover:border-slate-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300">A</div>
                  <div className="hidden text-left sm:block">
                    <div className="text-sm font-semibold text-white">{user.firstName}</div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Admin</div>
                  </div>
                </button>
              </div>
            </div>
          </header>

          {toast ? (
            <div className="mx-4 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:mx-6">{toast}</div>
          ) : null}

          <div className="mx-4 mt-4 rounded-2xl border border-cyan-900/70 bg-slate-900 px-4 py-3 text-sm text-slate-300 shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:mx-6">
            <span className="font-semibold text-cyan-300">AI insight:</span> {insight}
          </div>

          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {showAssistant ? (
            <div
              className="mb-4 w-[360px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            >
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">RankForge AI</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Your SEO assistant</div>
                  </div>
                </div>
                <button onClick={() => setShowAssistant(false)} className="text-sm text-slate-500 hover:text-slate-900">Close</button>
              </div>

              <div className="space-y-3 border-b border-slate-800 bg-slate-900 p-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setChatInput(prompt)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-400 hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="max-h-[260px] space-y-3 overflow-y-auto bg-slate-950 p-4">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${message.role === "user" ? "bg-blue-600 text-white" : "border border-slate-800 bg-slate-900 text-slate-300"}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={sendMessage} className="border-t border-slate-800 p-3">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2">
                  <input
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="Ask RankForge AI..."
                    className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
                  />
                  <button type="submit" className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500">
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : null}

        <button
          onClick={() => setShowAssistant(true)}
          className="flex items-center gap-3 rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-[0_20px_60px_rgba(15,23,42,0.28)] transition hover:bg-slate-800"
        >
          <span className="text-xs font-bold">AI</span>
          RankForge AI
        </button>
      </div>
    </div>
  );
}
