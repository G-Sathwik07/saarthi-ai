"use client";

import React from "react";
import {
  GmailIcon,
  WhatsAppIcon,
  TelegramIcon,
  OutlookIcon,
  SlackIcon,
  NotionIcon,
} from "@/app/components/Icons";
import {
  Brain,
  FileText,
  Radio,
  AlertCircle,
  CheckCircle2,
  Mail,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
  Plus,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface DashboardTabProps {
  onNavigateTab: (tabId: string) => void;
}

export default function DashboardTab({ onNavigateTab }: DashboardTabProps) {
  const { user } = useAuth();

  const metrics = [
    {
      title: "Active AI Workflows",
      value: "14 Running",
      change: "+25% from yesterday",
      icon: Brain,
      bgColor: "bg-purple-600 shadow-purple-500/20",
    },
    {
      title: "Daily Briefings Synthesized",
      value: "38 Summaries",
      change: "Updated 5 mins ago",
      icon: FileText,
      bgColor: "bg-cyan-600 shadow-cyan-500/20",
    },
    {
      title: "Connected Channels",
      value: "6 Active Integrations",
      change: "WhatsApp, Outlook, Gmail, Slack...",
      icon: Radio,
      bgColor: "bg-emerald-600 shadow-emerald-500/20",
    },
    {
      title: "Critical Priority Alerts",
      value: "2 Unread",
      change: "Requires immediate review",
      icon: AlertCircle,
      bgColor: "bg-amber-600 shadow-amber-500/20",
    },
  ];

  // Connected integrations using custom SVG & Lucide icons
  const connectedPlatforms = [
    {
      name: "WhatsApp Business",
      status: "Connected",
      icon: WhatsAppIcon,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      desc: "Auto-reply & thread monitoring active",
      lastSync: "2 mins ago",
    },
    {
      name: "Microsoft Outlook",
      status: "Connected",
      icon: OutlookIcon,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      desc: "Calendar sync & inbox digest active",
      lastSync: "Just now",
    },
    {
      name: "Gmail Workspace",
      status: "Connected",
      icon: GmailIcon,
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10 border-red-500/20",
      desc: "Smart filter & priority scan active",
      lastSync: "12 mins ago",
    },
    {
      name: "Telegram Assistant Bot",
      status: "Connected",
      icon: TelegramIcon,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-500/10 border-sky-500/20",
      desc: "Group summarizer & command listener",
      lastSync: "5 mins ago",
    },
    {
      name: "Slack Enterprise",
      status: "Connected",
      icon: SlackIcon,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10 border-amber-500/20",
      desc: "Channel digest & priority ping active",
      lastSync: "15 mins ago",
    },
    {
      name: "Notion Knowledge Base",
      status: "Connected",
      icon: NotionIcon,
      iconColor: "text-slate-700 dark:text-slate-300",
      bgColor: "bg-slate-500/10 border-slate-500/20",
      desc: "Task extraction & memory bank sync",
      lastSync: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl glass-card border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DeepMind Synthesizer Active</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user?.name || user?.email?.split("@")[0] || "Sathwik"}! 👋
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Saarthi has synthesized 38 items today across WhatsApp, Outlook, Gmail, and Telegram. You saved ~4.2 hours of inbox triage today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab("briefing")}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
            >
              <span>View Executive Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{m.title}</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{m.value}</div>
                </div>

                <div
                  className={`w-11 h-11 rounded-xl ${m.bgColor} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: AI Agent Control & Integrations Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Connected Platforms Grid with Real Brand Icons */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-emerald-500" />
                  Connected Platforms & Channels
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time sync status across WhatsApp, Outlook, Gmail, and productivity suites
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("integrations")}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Manage Channels</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {connectedPlatforms.map((platform, i) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={i}
                    onClick={() => onNavigateTab("integrations")}
                    className={`p-4 rounded-xl border ${platform.bgColor} bg-slate-50/50 dark:bg-white/5 flex flex-col justify-between hover:border-indigo-500/40 cursor-pointer transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                          <Icon size={20} className={platform.iconColor} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{platform.name}</div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{platform.lastSync}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Live
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                      {platform.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Agent Quick Status */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saarthi Autonomous Agent</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">Model: DeepMind Synthesizer v3.5</p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab("ai-agent")}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md flex items-center gap-1"
              >
                <span>Agent Controls</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Saarthi AI is listening to connected channels to summarize priority messages, automatically generate draft responses, and flag calendar conflicts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Emails Scanned</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">1,420</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Drafts Ready</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">28 Drafts</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Time Saved</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">4.2 Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Briefing & Alerts Preview */}
        <div className="space-y-6">
          {/* Daily Briefing Card */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Executive Digest</h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-300">Generated 8:30 AM</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab("briefing")}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Full Feed →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigateTab("briefing")}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">WhatsApp Client Inquiry</span>
                  <span className="text-slate-500 dark:text-slate-400">9:15 AM</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Rohan requested product demo deck via WhatsApp. Draft reply prepared for approval.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigateTab("briefing")}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">Outlook Calendar Sync</span>
                  <span className="text-slate-500 dark:text-slate-400">11:00 AM</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  3 meeting invitations reconciled automatically. No overlap detected.
                </p>
              </div>
            </div>
          </div>

          {/* System Alerts Preview */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Alerts</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-300">2 priority items</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab("alerts")}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Alert Center →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <span>WhatsApp Token Expiring</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 text-[10px]">High</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-200/80">
                  WhatsApp Business Webhook credentials require re-authentication in 48 hours.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                  <span>Outlook Webhook Refreshed</span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 text-[10px]">Info</span>
                </div>
                <p className="text-xs text-indigo-800 dark:text-indigo-200/80">
                  Subscribed to inbox push notifications for office365 tenant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
