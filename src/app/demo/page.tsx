"use client";

import Link from "next/link";
import { useState } from "react";

const initialForm = {
  fullName: "",
  workEmail: "",
  company: "",
  teamSize: "",
  useCase: "",
};

export default function DemoPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-slate-700">
              <svg viewBox="0 0 80 80" className="h-7 w-7" aria-label="RankForge logo" role="img">
                <defs>
                  <linearGradient id="demo-prism-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="45%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path d="M40 6L67 24L53 68L27 68L13 24L40 6Z" fill="url(#demo-prism-gradient)" opacity="0.2" />
                <path d="M40 9L60 24L49 62H31L20 24L40 9Z" fill="none" stroke="url(#demo-prism-gradient)" strokeWidth="3.5" />
                <path d="M40 9V62M20 24H60M31 62L40 35L49 62" fill="none" stroke="#e2e8f0" strokeWidth="2.2" opacity="0.9" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold tracking-[0.22em]">RANKFORGE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI organic growth</div>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            Open dashboard
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Request a demo</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">See RankForge in action.</h1>
            <p className="mt-4 max-w-md text-slate-300">
              Connect your website, search data, and business goals to uncover the next best actions driving measurable organic growth.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Enterprise SEO intelligence",
                "AI-powered opportunity prioritization",
                "Technical, content, and ranking diagnosis",
                "Actionable workflows and executive reporting",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <div className="text-3xl font-semibold text-white">Demo request received</div>
                <p className="mt-3 text-slate-200">
                  Thanks, {form.fullName || "there"}. Our team will reach out to {form.workEmail || "your inbox"} with next steps.
                </p>
                <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
                  Continue to dashboard
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Full name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400"
                    placeholder="Alex Morgan"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Work email</label>
                  <input
                    type="email"
                    value={form.workEmail}
                    onChange={(e) => handleChange("workEmail", e.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
                    placeholder="alex@northstar.com"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
                      placeholder="Northstar Commerce"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Team size</label>
                    <select
                      value={form.teamSize}
                      onChange={(e) => handleChange("teamSize", e.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201+">201+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Primary use case</label>
                  <textarea
                    value={form.useCase}
                    onChange={(e) => handleChange("useCase", e.target.value)}
                    className="min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400"
                    placeholder="We want to diagnose technical SEO issues, improve rankings, and connect organic growth to revenue."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Request demo
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
