"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { AuthError, AuthShell, Field } from "@/components/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, continueWithProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(""); const result = await login(email, password, remember); setLoading(false); if (!result.ok) return setError(result.error); router.push(searchParams.get("next") || "/dashboard"); };
  return <AuthShell title="Welcome back" description="Sign in to access your SEO workspace."><form onSubmit={submit} className="space-y-5"><AuthError>{error}</AuthError><Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required /><label className="block text-sm font-medium text-slate-300">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="mt-2 h-13 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none focus:border-cyan-500" /></label><div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-400"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-cyan-500" />Remember me</label><Link href="/forgot-password" className="text-cyan-300 hover:text-cyan-200">Forgot password?</Link></div><button disabled={loading} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60">{loading ? "Signing in..." : "Sign In"}</button></form><div className="my-7 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600"><span className="h-px flex-1 bg-slate-800" />OR<span className="h-px flex-1 bg-slate-800" /></div><div className="grid gap-2 sm:grid-cols-3">{(["Google", "GitHub", "Microsoft"] as const).map((provider) => <button key={provider} onClick={async () => { await continueWithProvider(provider); router.push("/onboarding"); }} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 hover:border-cyan-700">{provider}</button>)}</div><p className="mt-8 text-center text-sm text-slate-400">Don&apos;t have a RankForge account? <Link href="/signup" className="font-semibold text-cyan-300">Create free account</Link></p></AuthShell>;
}

export default function LoginPage() {
  return <Suspense><LoginContent /></Suspense>;
}
