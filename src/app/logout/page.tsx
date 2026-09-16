"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LogoutPage() {
  const router = useRouter(); const { logout } = useAuth();
  useEffect(() => { logout(); router.replace("/login"); }, [logout, router]);
  return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Signing you out securely...</div>;
}
