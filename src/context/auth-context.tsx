"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthResult, User, Workspace } from "@/lib/auth-types";

const userKey = "rankforge.user";
const workspaceKey = "rankforge.workspace";
const sessionKey = "rankforge.session";

const defaultWorkspace = (user: User): Workspace => ({
  id: user.workspaceId,
  name: user.company || "My SEO Workspace",
  ownerId: user.id,
  website: "",
  industry: "",
  country: "",
  language: "English",
  plan: "Free",
  createdAt: new Date().toISOString(),
});

type AuthContextValue = {
  user: User | null;
  currentWorkspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<AuthResult>;
  signup: (values: { firstName: string; lastName: string; email: string; password: string; company: string }) => Promise<AuthResult>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<AuthResult>;
  resetPassword: (password: string) => Promise<AuthResult>;
  verifyEmail: () => Promise<AuthResult>;
  completeOnboarding: (workspace: Partial<Workspace>) => void;
  continueWithProvider: (provider: "Google" | "GitHub" | "Microsoft") => Promise<AuthResult>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(userKey) || window.sessionStorage.getItem(userKey);
    const storedWorkspace = window.localStorage.getItem(workspaceKey) || window.sessionStorage.getItem(workspaceKey);
    if (storedUser) setUser(JSON.parse(storedUser) as User);
    if (storedWorkspace) setCurrentWorkspace(JSON.parse(storedWorkspace) as Workspace);
    setIsLoading(false);
  }, []);

  const persist = (nextUser: User, nextWorkspace?: Workspace, remember = true) => {
    const storage = remember ? window.localStorage : window.sessionStorage;
    storage.setItem(userKey, JSON.stringify(nextUser));
    storage.setItem(sessionKey, "mock-session");
    const workspace = nextWorkspace || currentWorkspace || defaultWorkspace(nextUser);
    storage.setItem(workspaceKey, JSON.stringify(workspace));
    setUser(nextUser);
    setCurrentWorkspace(workspace);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    currentWorkspace,
    isAuthenticated: Boolean(user),
    isLoading,
    isOnboardingComplete: Boolean(user?.onboardingCompleted),
    async login(email, password, remember) {
      if (!email.includes("@") || password.length < 8) return { ok: false, error: "Email or password is incorrect." };
      const existing = user || {
        id: crypto.randomUUID(),
        firstName: email.split("@")[0],
        lastName: "",
        email,
        role: "Owner",
        company: "My Company",
        workspaceId: crypto.randomUUID(),
        emailVerified: true,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      } satisfies User;
      persist(existing, currentWorkspace || defaultWorkspace(existing), remember);
      return { ok: true };
    },
    async signup(values) {
      if (!values.email.includes("@")) return { ok: false, error: "Enter a valid work email." };
      const nextUser: User = {
        id: crypto.randomUUID(),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: "Owner",
        company: values.company,
        workspaceId: crypto.randomUUID(),
        emailVerified: false,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };
      persist(nextUser, defaultWorkspace(nextUser));
      return { ok: true };
    },
    logout() {
      window.localStorage.removeItem(userKey);
      window.localStorage.removeItem(workspaceKey);
      window.localStorage.removeItem(sessionKey);
      window.sessionStorage.removeItem(userKey);
      window.sessionStorage.removeItem(workspaceKey);
      window.sessionStorage.removeItem(sessionKey);
      setUser(null);
      setCurrentWorkspace(null);
    },
    async forgotPassword(email) {
      return email.includes("@") ? { ok: true } : { ok: false, error: "Enter a valid email address." };
    },
    async resetPassword(password) {
      return password.length >= 8 ? { ok: true } : { ok: false, error: "Password must be at least 8 characters." };
    },
    async verifyEmail() {
      if (!user) return { ok: false, error: "Your session has expired. Please sign in again." };
      const verified = { ...user, emailVerified: true };
      persist(verified);
      return { ok: true };
    },
    completeOnboarding(workspace) {
      if (!user) return;
      const nextUser = { ...user, onboardingCompleted: true };
      const nextWorkspace = { ...defaultWorkspace(nextUser), ...currentWorkspace, ...workspace };
      persist(nextUser, nextWorkspace);
    },
    async continueWithProvider(provider) {
      const socialUser: User = {
        id: crypto.randomUUID(), firstName: provider, lastName: "User", email: `${provider.toLowerCase()}@example.com`, role: "Owner", company: "My Company", workspaceId: crypto.randomUUID(), emailVerified: true, onboardingCompleted: false, createdAt: new Date().toISOString(),
      };
      persist(socialUser, defaultWorkspace(socialUser));
      return { ok: true };
    },
  }), [currentWorkspace, isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
