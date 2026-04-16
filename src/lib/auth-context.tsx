"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type Role = "super_admin" | "admin" | "vendor_partner" | "gov" | null;

interface UserInfo {
  email: string;
  name?: string;
  role: Role;
  organization?: string;
}

interface AuthContextType {
  user: UserInfo | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for active session simulation
    const storedAuth = localStorage.getItem("sb_auth_sim");
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Mock Magic Link Validation Delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    let assignedRole: Role = null;
    let org = "Unknown";
    
    // RBAC Simulation Logic based on email domain
    if (email === "roy@strongerbuilt.us" || email.includes("super")) {
      assignedRole = "super_admin";
      org = "Stronger Built Group LLC (HQ)";
    } else if (email.endsWith("@strongerbuilt.us")) {
      assignedRole = "admin";
      org = "Stronger Built Group LLC";
    } else if (email.endsWith(".gov") || email.endsWith(".mil")) {
      assignedRole = "gov";
      org = "Government Agency";
    } else {
      // Default fallback for any other email goes to subcontractor/vendor
      assignedRole = "vendor_partner";
      org = "Partner Network Co.";
    }

    const userData: UserInfo = {
      email,
      role: assignedRole,
      organization: org
    };

    setUser(userData);
    localStorage.setItem("sb_auth_sim", JSON.stringify(userData));
    setIsLoading(false);

    // Route dynamically based on role
    if (assignedRole === "super_admin") router.push("/portal/super");
    else if (assignedRole === "admin") router.push("/portal/admin");
    else if (assignedRole === "gov") router.push("/portal/gov");
    else if (assignedRole === "vendor_partner") router.push("/portal/vendor");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sb_auth_sim");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
