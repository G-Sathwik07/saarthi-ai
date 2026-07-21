"use client";

import React, { useState } from "react";

import {
  Settings,
  User,
  Shield,
  Key,
  Save,
  Check,
  Download,
  LogOut,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function SettingsTab() {
  const { user, signOut } = useAuth();

  const [name, setName] = useState(user?.name || "Sathwik Godugu");
  const [email, setEmail] = useState(user?.email || "sathwik@saarthi.ai");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [saveToast, setSaveToast] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-slate-600 dark:text-slate-400" />
            <span>Workspace & Account Settings</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your personal profile, theme preferences, AI model settings, API credentials, and account security.
          </p>
        </div>
      </div>

      {saveToast && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Settings updated successfully!</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Profile & AI Settings */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Form */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              User Profile & Preferences
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs lg:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Primary Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST - UTC +05:30)</option>
                  <option value="America/New_York (EST)">America/New_York (EST - UTC -05:00)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT - UTC +00:00)</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>

          {/* API Keys */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-500" />
              API & Integration Secret Keys
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-sans font-bold text-slate-900 dark:text-white">InsForge Anon Key</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 select-all">
                    ik_anon_live_79a281f09e...48b1
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">Active</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-sans font-bold text-slate-900 dark:text-white">OpenRouter LLM Token</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 select-all">
                    sk-or-v1-9871f32a00...c09f
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Security */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-500" />
              Security & Authentication
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Auth (2FA)</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Authenticator app enabled</div>
                </div>
                <button
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    twoFactor ? "bg-emerald-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Active Sessions</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Chrome on Windows (Current Session)
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              <button
                onClick={() => alert("Account data download initiated.")}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Workspace Data</span>
              </button>

              <button
                onClick={signOut}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center gap-2 transition-colors border border-rose-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Saarthi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
