"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";

// Import Tab Components
import DashboardTab from "@/app/components/dashboard/DashboardTab";
import AiAgentTab from "@/app/components/dashboard/AiAgentTab";
import BriefingTab from "@/app/components/dashboard/BriefingTab";
import IntegrationsTab from "@/app/components/dashboard/IntegrationsTab";
import AlertsTab from "@/app/components/dashboard/AlertsTab";
import SettingsTab from "@/app/components/dashboard/SettingsTab";
import PricingTab from "@/app/components/dashboard/PricingTab";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/dashboard?tab=${newTab}`);
  };

  return (
    <div className="space-y-6">
      {/* Universal Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span className="capitalize">{activeTab.replace("-", " ")}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              Live Workspace
            </span>
          </h1>
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your AI autonomous agent, briefing feeds, connected platforms, and account settings.
          </p>
        </div>

        {/* Global Controls & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search features, feeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs lg:text-sm bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-56 lg:w-64 shadow-sm"
            />
          </div>

          {/* LIGHT / DARK THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 transition-colors shadow-sm"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold hidden md:inline">Dark</span>
              </>
            )}
          </button>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {user?.name?.slice(0, 2).toUpperCase() || "SA"}
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 pr-2 hidden sm:inline truncate max-w-[120px]">
              {user?.name || user?.email?.split("@")[0] || "Sathwik Godugu"}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Specific Content View */}
      <div className="pt-2">
        {activeTab === "dashboard" && (
          <DashboardTab onNavigateTab={(tab) => handleTabChange(tab)} />
        )}
        {activeTab === "ai-agent" && <AiAgentTab />}
        {activeTab === "briefing" && <BriefingTab />}
        {activeTab === "integrations" && <IntegrationsTab />}
        {activeTab === "alerts" && <AlertsTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "pricing" && <PricingTab />}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-900 dark:text-white">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
