"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { SparklesIcon } from "@/app/components/Icons";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [statusText, setStatusText] = useState("Finalizing sign in...");

  useEffect(() => {
    let isMounted = true;

    const processAuth = async () => {
      try {
        setStatusText("Verifying user session...");
        await refreshUser();
        if (isMounted) {
          setStatusText("Success! Redirecting to Saarthi AI...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 800);
        }
      } catch (err) {
        if (isMounted) {
          setStatusText("Authentication complete. Redirecting...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1200);
        }
      }
    };

    processAuth();

    return () => {
      isMounted = false;
    };
  }, [refreshUser, router]);

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 font-sans grid-bg flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 right-0 h-[500px] radial-glow -z-10 pointer-events-none" />

      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 mb-6 animate-pulse">
          <SparklesIcon size={32} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Completing Sign In
        </h1>
        <p className="text-sm text-zinc-400 mb-6">{statusText}</p>

        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  );
}
