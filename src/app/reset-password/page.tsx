"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthError, AuthShell } from "@/components/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth(); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [done, setDone] = useState(false); const [error, setError] = useState("");
  const submit = async (event: FormEvent) => { event.preventDefault(); if (password !== confirm) return setError("Passwords do not match."); const result = await resetPassword(password); if (!result.ok) setError(result.error); else setDone(true); };
  return <AuthShell title="Create a new password" description="Choose a strong password for your RankForge account.">{done ? <div className="space-y-5 rounded-2xl border border-emerald-900/60 bg-emerald-950/30 p-5"><div className="text-xl font-semibold text-white">Password updated successfully.</div><Link href="/login" className="inline-flex rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Continue to RankForge</Link></div> : <form onSubmit={submit} className="space-y-5"><AuthError>{error}</AuthError><label className="block text-sm text-slate-300">New password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 h-13 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-white outline-none focus:border-cyan-500" required /></label><label className="block text-sm text-slate-300">Confirm new password<input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-2 h-13 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 text-white outline-none focus:border-cyan-500" required /></label><button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Update Password</button></form>}</AuthShell>;
}
