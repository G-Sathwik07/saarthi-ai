"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { insforge } from "@/app/lib/insforge";
import { useAuth } from "@/app/context/AuthContext";
import { SparklesIcon } from "@/app/components/Icons";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    try {
      const { data, error } = await insforge.auth.verifyEmail({
        email,
        otp,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid or expired verification code.");
      } else if (data) {
        setInfoMsg("Email verified successfully! Redirecting...");
        await refreshUser();
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMsg("Please enter your email address to resend.");
      return;
    }
    setErrorMsg("");
    setInfoMsg("");
    setResending(true);

    try {
      const { data, error } = await insforge.auth.resendVerificationEmail({
        email,
      });

      if (error) {
        setErrorMsg(error.message || "Failed to resend verification code.");
      } else if (data?.success) {
        setInfoMsg("Verification code resent successfully.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error resending verification code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs leading-relaxed">
          {errorMsg}
        </div>
      )}

      {infoMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs leading-relaxed">
          {infoMsg}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/60 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            6-Digit Verification Code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.trim())}
            placeholder="123456"
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/60 border border-white/10 text-white placeholder-zinc-600 text-sm tracking-widest font-mono text-center focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 mt-2"
        >
          {loading ? "Verifying..." : "Verify & Sign In"}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3 text-xs text-zinc-400">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors disabled:opacity-50"
        >
          {resending ? "Resending..." : "Didn't receive code? Resend Code"}
        </button>

        <Link
          href="/sign-in"
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 font-sans grid-bg flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 right-0 h-[500px] radial-glow -z-10 pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <SparklesIcon size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gradient">
              Saarthi<span className="text-indigo-400">.ai</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-white mt-2">
            Verify your email
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-zinc-500 text-sm">Loading...</div>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
