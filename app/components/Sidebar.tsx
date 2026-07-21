"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DashboardSquare01Icon,
  AiBrain01Icon,
  NewsIcon,
  ApiIcon,
  Notification01Icon,
  Settings01Icon,
  DiscountTag01Icon,
  SparklesIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  bgColor: string; // Solid colored background for the icon
  badge?: string | number;
};

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
}

export const mainNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard?tab=dashboard",
    icon: DashboardSquare01Icon,
    bgColor: "bg-indigo-600 shadow-indigo-500/20",
  },
  {
    id: "ai-agent",
    label: "AI Agent",
    href: "/dashboard?tab=ai-agent",
    icon: AiBrain01Icon,
    bgColor: "bg-purple-600 shadow-purple-500/20",
    badge: "Active",
  },
  {
    id: "briefing",
    label: "Briefing",
    href: "/dashboard?tab=briefing",
    icon: NewsIcon,
    bgColor: "bg-cyan-600 shadow-cyan-500/20",
    badge: "5",
  },
  {
    id: "integrations",
    label: "Integrations",
    href: "/dashboard?tab=integrations",
    icon: ApiIcon,
    bgColor: "bg-emerald-600 shadow-emerald-500/20",
  },
  {
    id: "alerts",
    label: "Alerts",
    href: "/dashboard?tab=alerts",
    icon: Notification01Icon,
    bgColor: "bg-amber-600 shadow-amber-500/20",
    badge: "2",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard?tab=settings",
    icon: Settings01Icon,
    bgColor: "bg-slate-600 shadow-slate-500/20",
  },
];

export const bottomNavItems: NavItem[] = [
  {
    id: "pricing",
    label: "Pricing",
    href: "/dashboard?tab=pricing",
    icon: DiscountTag01Icon,
    bgColor: "bg-rose-600 shadow-rose-500/20",
    badge: "PRO",
  },
];

function SidebarInner({ activeTab: propActiveTab, onSelectTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTabFromUrl = searchParams.get("tab") || "dashboard";
  const activeTab = propActiveTab || currentTabFromUrl;

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectTab) {
      onSelectTab(item.id);
    }
    router.push(item.href);
  };

  return (
    <aside
      className={`relative flex flex-col h-full bg-white/90 dark:bg-[#0a0a12]/95 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-all duration-300 ease-in-out z-30 select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header: Logo & App Name */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-white/10">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          {/* Logo with Solid Gradient Background */}
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/30 text-white font-bold">
            <SparklesIcon className="w-6 h-6 text-white animate-pulse" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:via-indigo-100 dark:to-indigo-300">
                Saarthi AI
              </span>
              <span className="text-[10px] uppercase font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider">
                Workspace
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          {isCollapsed ? (
            <ArrowRight01Icon className="w-4 h-4" />
          ) : (
            <ArrowLeft01Icon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto px-3 gap-6 scrollbar-none">
        {/* Main Navigation Options */}
        <div className="flex flex-col gap-1.5">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Main Menu
            </div>
          )}

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                title={isCollapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-600/20 text-indigo-900 dark:text-white border border-indigo-200 dark:border-indigo-500/30 shadow-sm dark:shadow-lg dark:shadow-indigo-950/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                {/* Solid Colored Icon Background Container */}
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg ${
                    item.bgColor
                  } text-white shadow-md transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? "ring-2 ring-indigo-500/50 dark:ring-white/30" : ""
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className={`text-sm font-medium truncate ${isActive ? "font-semibold text-indigo-900 dark:text-white" : ""}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          typeof item.badge === "number" || item.badge === "Active"
                            ? "bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-400/30"
                            : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Hover indicator bar when expanded */}
                {isActive && !isCollapsed && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-l-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Bottom Section Options: Pricing & Theme Toggle */}
        <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-200 dark:border-white/10">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Account & Theme
            </div>
          )}

          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                title={isCollapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-600/20 text-indigo-900 dark:text-white border border-indigo-200 dark:border-indigo-500/30 shadow-sm dark:shadow-lg dark:shadow-indigo-950/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg ${
                    item.bgColor
                  } text-white shadow-md transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? "ring-2 ring-indigo-500/50 dark:ring-white/30" : ""
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden">
                    <span className={`text-sm font-medium truncate ${isActive ? "font-semibold text-indigo-900 dark:text-white" : ""}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-500/30 text-rose-700 dark:text-rose-200 border border-rose-300 dark:border-rose-500/40">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={<div className="w-64 bg-slate-900 border-r border-white/10" />}>
      <SidebarInner {...props} />
    </Suspense>
  );
}
