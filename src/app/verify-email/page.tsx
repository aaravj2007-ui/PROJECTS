"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

export default function VerifyEmailPage() {
  const { user, verifyEmail } = useAuth(); const [sent, setSent] = useState(false); const [verified, setVerified] = useState(false);
  return <AuthShell title={verified ? "Email verified" : "Check your inbox"} description={verified ? "Your account is ready for workspace setup." : `We&apos;ve sent a verification link to ${user?.email || "your email"}.`}><div className="space-y-4">{verified ? <Link href="/onboarding" className="block w-full rounded-xl bg-cyan-500 px-4 py-3 text-center font-semibold text-slate-950">Continue to onboarding</Link> : <><button onClick={async () => { await verifyEmail(); setVerified(true); }} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">I&apos;ve verified my email</button><button onClick={() => setSent(true)} className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">{sent ? "Verification email sent" : "Resend verification email"}</button><Link href="/login" className="block text-center text-sm text-cyan-300">Back to login</Link></>}</div></AuthShell>;
}
