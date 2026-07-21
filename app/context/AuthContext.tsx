"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { insforge } from "@/app/lib/insforge";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const ensureUserInDatabase = async (userData: any) => {
    if (!userData || !userData.id) return;
    try {
      const { data, error } = await insforge.database
        .from("Users")
        .select("id")
        .eq("id", userData.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking Users table:", error);
        return;
      }

      if (!data) {
        const { error: insertError } = await insforge.database
          .from("Users")
          .insert([
            {
              id: userData.id,
              email: userData.email,
              name: userData.profile?.name || userData.email?.split("@")[0] || "User",
              avatar_url: userData.profile?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          console.error("Error inserting user into Users table:", insertError);
        } else {
          console.log("Successfully created user record in Users table");
        }
      }
    } catch (err) {
      console.error("Failed to ensure user in DB:", err);
    }
  };

  const refreshUser = async () => {
    try {
      const { data, error } = await insforge.auth.getCurrentUser();
      if (data?.user) {
        setUser(data.user);
        await ensureUserInDatabase(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await insforge.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut: handleSignOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
