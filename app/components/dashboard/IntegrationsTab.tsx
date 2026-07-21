"use client";

import React, { useState } from "react";
import {
  GmailIcon,
  WhatsAppIcon,
  TelegramIcon,
  OutlookIcon,
  SlackIcon,
  NotionIcon,
  CalendarIcon,
} from "@/app/components/Icons";
import {
  Radio,
  Search,
  CheckCircle2,
  Key,
  X,
  Video,
  Database,
} from "lucide-react";

export default function IntegrationsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [configModal, setConfigModal] = useState<any | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const platforms = [
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      category: "messaging",
      icon: WhatsAppIcon,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      status: "connected",
      desc: "Listens to incoming business chats, synthesizes client inquiries, and auto-drafts replies.",
      lastSync: "2 mins ago",
      syncType: "Realtime Webhook",
    },
    {
      id: "outlook",
      name: "Microsoft Outlook & Office 365",
      category: "email",
      icon: OutlookIcon,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      status: "connected",
      desc: "Syncs corporate email, reconciles Outlook calendar invites, and detects high-priority threads.",
      lastSync: "Just now",
      syncType: "Graph API Push",
    },
    {
      id: "gmail",
      name: "Google Workspace Gmail",
      category: "email",
      icon: GmailIcon,
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10 border-red-500/20",
      status: "connected",
      desc: "Monitors personal & workspace inboxes, categorizes promotional clutter, and flags flight/invoice updates.",
      lastSync: "10 mins ago",
      syncType: "Google Pub/Sub",
    },
    {
      id: "telegram",
      name: "Telegram Assistant Bot",
      category: "messaging",
      icon: TelegramIcon,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-500/10 border-sky-500/20",
      status: "connected",
      desc: "Captures messages from developer channels, extracts to-do items, and sends daily summaries.",
      lastSync: "5 mins ago",
      syncType: "Telegram Bot API",
    },
    {
      id: "slack",
      name: "Slack Enterprise Grid",
      category: "messaging",
      icon: SlackIcon,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10 border-amber-500/20",
      status: "connected",
      desc: "Summarizes busy Slack channels, detects @mentions, and sends high-priority pings to your digest.",
      lastSync: "15 mins ago",
      syncType: "Slack Events API",
    },
    {
      id: "notion",
      name: "Notion Knowledge Base",
      category: "productivity",
      icon: NotionIcon,
      iconColor: "text-slate-700 dark:text-slate-300",
      bgColor: "bg-slate-500/10 border-slate-500/20",
      status: "connected",
      desc: "Indexes meeting notes, team roadmaps, and project tasks into Saarthi's RAG vector database.",
      lastSync: "1 hour ago",
      syncType: "Notion API",
    },
    {
      id: "gcal",
      name: "Google Calendar",
      category: "calendar",
      icon: CalendarIcon,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-600/10 border-blue-600/20",
      status: "disconnected",
      desc: "Synchronizes event schedules, finds meeting slots for clients, and prevents double bookings.",
      lastSync: "Never",
      syncType: "OAuth 2.0",
    },
    {
      id: "zoom",
      name: "Zoom Meetings",
      category: "calendar",
      icon: Video,
      iconColor: "text-sky-600",
      bgColor: "bg-sky-600/10 border-sky-600/20",
      status: "disconnected",
      desc: "Auto-fetches call transcripts, generates meeting key takeaways, and emails action item summaries.",
      lastSync: "Never",
      syncType: "Zoom Webhooks",
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      category: "productivity",
      icon: Database,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10 border-orange-500/20",
      status: "disconnected",
      desc: "Logs WhatsApp and email conversations automatically under client deal cards in HubSpot.",
      lastSync: "Never",
      syncType: "CRM Sync",
    },
  ];

  const filtered = platforms.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  const handleSaveConfig = () => {
    setToastMessage(`Saved configuration for ${configModal.name}`);
    setConfigModal(null);
    setApiKeyInput("");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Radio className="w-8 h-8 text-emerald-500" />
            <span>Integrations & Channel Manager</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
              6 Active
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Connect your communication platforms, email accounts, calendars, and CRM tools to enable Saarthi's cross-channel intelligence.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs lg:text-sm bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
        {[
          { id: "all", label: "All Integrations" },
          { id: "messaging", label: "Messaging (WhatsApp, Telegram, Slack)" },
          { id: "email", label: "Email (Outlook, Gmail)" },
          { id: "calendar", label: "Calendar & Video" },
          { id: "productivity", label: "Productivity & CRM" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === "connected";

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl glass-card border ${item.bgColor} bg-white/80 dark:bg-slate-900/30 flex flex-col justify-between space-y-4 relative group hover:border-emerald-500/40 transition-all`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-md">
                      <Icon size={22} className={item.iconColor} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h3>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.syncType}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                      isConnected
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
                    }`}
                  >
                    {isConnected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Sync: {item.lastSync}
                </span>

                <button
                  onClick={() => setConfigModal(item)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all shadow-sm ${
                    isConnected
                      ? "bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  {isConnected ? "Configure Webhook" : "Connect Platform"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      {configModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <configModal.icon size={24} className={configModal.iconColor} />
                <h3 className="text-lg font-bold">Configure {configModal.name}</h3>
              </div>
              <button
                onClick={() => setConfigModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs lg:text-sm">
              <p className="text-slate-600 dark:text-slate-300">
                Enter your secret API Key, Webhook Token, or OAuth Client Secret for {configModal.name}.
              </p>

              <div className="space-y-1.5">
                <label className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-500" /> API Access Key / Secret Token
                </label>
                <input
                  type="password"
                  placeholder={`e.g. sk_live_${configModal.id}_secret_key`}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Target Webhook Listener Endpoint</div>
                <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-200 select-all">
                  https://saarthi-ai.app/api/webhooks/{configModal.id}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={() => setConfigModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
              >
                Save Integration Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
