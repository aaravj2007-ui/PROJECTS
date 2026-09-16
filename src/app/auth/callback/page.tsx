"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function AuthCallbackPage() {
  const router = useRouter(); const { isAuthenticated, isLoading } = useAuth();
  useEffect(() => { if (!isLoading) router.replace(isAuthenticated ? "/dashboard" : "/login"); }, [isAuthenticated, isLoading, router]);
  return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Completing secure sign in...</div>;
}
