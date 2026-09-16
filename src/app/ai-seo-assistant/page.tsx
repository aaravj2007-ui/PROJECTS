"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { useState } from "react";

const suggestions = ['Explain my traffic change', 'Find quick-win keywords', 'Create a content brief', 'Audit my highest-value pages'];

export default function AiSeoAssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('Ask RankForge about rankings, traffic, competitors, content, or technical SEO. I will ground the answer in your connected workspace data.');
  const ask = (value = prompt) => { if (!value.trim()) return; setAnswer(`Based on your workspace data, ${value.toLowerCase()} is most closely connected to the commercial keyword cluster around enterprise SEO. I recommend prioritizing the 12 pages ranking between positions 4 and 10, then measuring CTR and assisted conversions over the next 30 days.`); setPrompt(''); };
  return <DashboardShell><div className="mx-auto max-w-5xl space-y-6"><div><div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI workspace</div><h1 className="mt-2 text-3xl font-bold tracking-tight text-white">AI SEO Assistant</h1><p className="mt-3 text-sm text-slate-400">Ask complex SEO questions and turn the answer into a clear next action.</p></div><div className="rounded-[28px] border border-slate-800 bg-slate-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"><div className="rounded-2xl border border-cyan-900/60 bg-slate-900 p-5"><div className="text-sm font-semibold text-cyan-300">RankForge Intelligence</div><p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{answer}</p></div><div className="mt-5 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => ask(suggestion)} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:border-cyan-700 hover:bg-slate-800">{suggestion}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); ask(); }} className="mt-5 flex gap-3"><input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask a question about your SEO performance..." className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-500" /><button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">Ask AI</button></form></div></div></DashboardShell>;
}
