"use client";

import React, { useState } from "react";
import {
  FileText,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Check,
  Copy,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  GmailIcon,
  WhatsAppIcon,
  TelegramIcon,
  OutlookIcon,
  SlackIcon,
} from "@/app/components/Icons";

export default function BriefingTab() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState("1x");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyDraft = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const actionItems = [
    {
      id: "action-1",
      title: "Approve Air India Rescheduled Flight Ticket",
      source: "Gmail",
      icon: GmailIcon,
      iconColor: "text-red-500",
      deadline: "Today 18:00",
      urgency: "High",
    },
    {
      id: "action-2",
      title: "Review Q3 Contract Retainer Draft from Sarah",
      source: "Outlook",
      icon: OutlookIcon,
      iconColor: "text-blue-500",
      deadline: "Friday EOD",
      urgency: "High",
    },
    {
      id: "action-3",
      title: "Send Wireframe Feedback to Rohan on WhatsApp",
      source: "WhatsApp",
      icon: WhatsAppIcon,
      iconColor: "text-emerald-500",
      deadline: "Today 18:00",
      urgency: "Medium",
    },
    {
      id: "action-4",
      title: "Share Onboarding PDF Deck in Saarthi Devs Group",
      source: "Telegram",
      icon: TelegramIcon,
      iconColor: "text-sky-500",
      deadline: "Tonight 22:00",
      urgency: "Medium",
    },
  ];

  const digestItems = [
    {
      id: "digest-1",
      category: "WhatsApp Client Inquiries",
      channel: "WhatsApp",
      icon: WhatsAppIcon,
      iconColor: "text-emerald-500",
      time: "9:15 AM",
      summary:
        "Rohan sent 3 audio notes requesting product demo deck for team onboarding. Auto-drafted a friendly response offering slots tomorrow.",
      draft:
        "Hey Rohan! Received your voice notes. I have prepared the demo deck and sent it over email. Let me know if tomorrow 2:00 PM works for a quick walkthrough!",
    },
    {
      id: "digest-2",
      category: "Outlook Executive Mail",
      channel: "Outlook",
      icon: OutlookIcon,
      iconColor: "text-blue-500",
      time: "10:30 AM",
      summary:
        "Sarah from Legal sent updated Q3 retainer agreement. Needs confirmation on Clause 4 (IP Assignment).",
      draft:
        "Hi Sarah, thanks for sharing the draft. I've reviewed Clause 4 with our legal advisor and everything looks good. Please proceed with sending the final Signature link.",
    },
    {
      id: "digest-3",
      category: "Telegram Dev Group Summary",
      channel: "Telegram",
      icon: TelegramIcon,
      iconColor: "text-sky-500",
      time: "11:45 AM",
      summary:
        "Team discussed backend deployment of InsForge SDK v1.4.5. All tests passed with zero regression.",
      draft: null,
    },
  ];

  const filteredDigest =
    selectedFilter === "all"
      ? digestItems
      : digestItems.filter((item) => item.channel.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Briefing Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-cyan-500" />
            <span>Executive Briefing Hub</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
              Daily Digest
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Synthesized audio & text executive summaries compiled from WhatsApp, Outlook, Gmail, and Telegram.
          </p>
        </div>

        {/* Source Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-x-auto">
          {[
            { id: "all", label: "All Feeds" },
            { id: "whatsapp", label: "WhatsApp" },
            { id: "outlook", label: "Outlook" },
            { id: "telegram", label: "Telegram" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Executive Summary Player */}
      <div className="p-6 rounded-2xl glass-card border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30 transition-transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Voice Synthesis • 8:30 AM Digest</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Morning Executive Audio Briefing (2 mins 45 secs)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Covers Air India flight change, Q3 contract review, and WhatsApp demo request.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={() =>
                setAudioSpeed(audioSpeed === "1x" ? "1.5x" : audioSpeed === "1.5x" ? "2x" : "1x")
              }
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
            >
              Speed: {audioSpeed}
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs">
              <Volume2 className="w-4 h-4 text-cyan-500" />
              <span>HD Voice</span>
            </div>
          </div>
        </div>

        {/* Audio scrub bar representation */}
        <div className="mt-5 space-y-1">
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden cursor-pointer">
            <div
              className={`h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300 ${
                isPlaying ? "w-2/3" : "w-1/4"
              }`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>{isPlaying ? "01:12" : "00:00"}</span>
            <span>02:45</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Categorized Digest & Ready Drafts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-500" />
              Categorized Digest & Context Drafts
            </h3>

            <div className="space-y-4">
              {filteredDigest.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                          <Icon size={18} className={item.iconColor} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{item.category}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.time}</div>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                        {item.channel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.summary}
                    </p>

                    {item.draft && (
                      <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          <span>Auto-Generated Reply Draft</span>
                          <button
                            onClick={() => copyDraft(item.id, item.draft)}
                            className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedId === item.id ? "Copied!" : "Copy Draft"}</span>
                          </button>
                        </div>
                        <p className="text-xs italic text-slate-600 dark:text-slate-300 font-mono">
                          "{item.draft}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Action Items Checklist */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Action Items Checklist
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {Object.values(completedItems).filter(Boolean).length} / {actionItems.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {actionItems.map((item) => {
                const Icon = item.icon;
                const isDone = !!completedItems[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 line-through opacity-70"
                        : "bg-slate-50/70 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${
                        isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {isDone && <Check className="w-3 h-3" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            {item.deadline}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <Icon size={14} className={item.iconColor} />
                          <span>{item.source}</span>
                          <span>•</span>
                          <span className="capitalize">{item.urgency} Urgency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
