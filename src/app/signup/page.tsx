"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthError, AuthShell, Field } from "@/components/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = values.password.length >= 8 && /[A-Z]/.test(values.password) && /[a-z]/.test(values.password) && /\d/.test(values.password) && /[^A-Za-z0-9]/.test(values.password);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!valid || values.password !== values.confirm) return setError("Check your password requirements and confirmation."); setLoading(true); const result = await signup(values); setLoading(false); if (!result.ok) return setError(result.error); router.push("/verify-email"); };
  return <AuthShell title="Create your workspace" description="Start building a sharper SEO operating system for your team."><form onSubmit={submit} className="space-y-4"><AuthError>{error}</AuthError><div className="grid gap-4 sm:grid-cols-2"><Field label="First name" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} required /><Field label="Last name" value={values.lastName} onChange={(e) => update("lastName", e.target.value)} required /></div><Field label="Work email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" required /><Field label="Company name" value={values.company} onChange={(e) => update("company", e.target.value)} required /><label className="block text-sm font-medium text-slate-300">Password<input type="password" value={values.password} onChange={(e) => update("password", e.target.value)} required className="mt-2 h-13 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-500" /></label><div className="grid grid-cols-2 gap-2 text-xs text-slate-500">{[["8+ characters", values.password.length >= 8], ["Uppercase", /[A-Z]/.test(values.password)], ["Lowercase", /[a-z]/.test(values.password)], ["Number / symbol", /\d/.test(values.password) && /[^A-Za-z0-9]/.test(values.password)]].map(([label, complete]) => <span key={String(label)} className={complete ? "text-emerald-300" : ""}>{complete ? "✓" : "○"} {label}</span>)}</div><label className="block text-sm font-medium text-slate-300">Confirm password<input type="password" value={values.confirm} onChange={(e) => update("confirm", e.target.value)} required className="mt-2 h-13 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-500" /></label><label className="flex items-start gap-2 text-xs leading-5 text-slate-400"><input type="checkbox" required className="mt-1 accent-cyan-500" />I agree to the Terms of Service and Privacy Policy.</label><button disabled={loading} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60">{loading ? "Creating account..." : "Create Account"}</button></form><p className="mt-7 text-center text-sm text-slate-400">Already have an account? <Link href="/login" className="font-semibold text-cyan-300">Sign in</Link></p></AuthShell>;
}
