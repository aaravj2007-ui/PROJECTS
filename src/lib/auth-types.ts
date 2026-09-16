export type UserRole = "Owner" | "Admin" | "Manager" | "Editor" | "Viewer";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  company: string;
  workspaceId: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
};

export type Workspace = {
  id: string;
  name: string;
  ownerId: string;
  website: string;
  industry: string;
  country: string;
  language: string;
  plan: "Free" | "Pro" | "Enterprise";
  createdAt: string;
};

export type AuthResult = { ok: true } | { ok: false; error: string };
