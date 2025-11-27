"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextValue {
  user: { username: string } | null;
  signIn: (username: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>({ username: "admin" });

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: (username) => setUser({ username }),
        signOut: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
