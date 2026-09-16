"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthError, AuthShell, Field } from "@/components/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  const submit = async (event: FormEvent) => { event.preventDefault(); const result = await forgotPassword(email); if (!result.ok) setError(result.error); else setSent(true); };
  return <AuthShell title="Reset your password" description="Enter your email and we&apos;ll send you a secure password reset link.">{sent ? <div className="space-y-5 rounded-2xl border border-emerald-900/60 bg-emerald-950/30 p-5"><div className="text-xl font-semibold text-white">Check your email</div><p className="text-sm leading-6 text-slate-300">Password reset instructions have been sent to {email}.</p><Link href="/login" className="inline-flex rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950">Back to login</Link></div> : <form onSubmit={submit} className="space-y-5"><AuthError>{error}</AuthError><Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required /><button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400">Send Reset Link</button><Link href="/login" className="block text-center text-sm text-cyan-300">Back to login</Link></form>}</AuthShell>;
}
