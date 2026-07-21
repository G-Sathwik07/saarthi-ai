"use client";

import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  Filter,
  Check,
  Trash2,
  ShieldAlert,
  Smartphone,
  Mail,
  Zap,
} from "lucide-react";

export default function AlertsTab() {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      title: "WhatsApp Business Token Expiring",
      severity: "critical",
      time: "10 mins ago",
      source: "WhatsApp Webhook Listener",
      message:
        "WhatsApp Business Webhook credentials require re-authentication within 48 hours to prevent message dropouts.",
      resolved: false,
    },
    {
      id: "alert-2",
      title: "OpenRouter API Quota Threshold Reached",
      severity: "high",
      time: "45 mins ago",
      source: "LLM Orchestrator",
      message:
        "OpenRouter key utilization reached 82% of monthly allocated token cap ($25.00 limit). Upgrade recommended.",
      resolved: false,
    },
    {
      id: "alert-3",
      title: "Outlook Push Notification Renewed",
      severity: "info",
      time: "2 hours ago",
      source: "Microsoft Graph Service",
      message:
        "Successfully extended push subscription token for office365 tenant until July 28, 2026.",
      resolved: true,
    },
    {
      id: "alert-4",
      title: "Unrecognized Client Phone Format on Telegram",
      severity: "medium",
      time: "5 hours ago",
      source: "Telegram Bot",
      message:
        "Client sent international number without country code (+91). Saarthi normalized to default location.",
      resolved: false,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: true,
    whatsappAlerts: false,
  });

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    );
  };

  const handleDelete = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter === "all") return true;
    return a.severity === severityFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Bell className="w-8 h-8 text-amber-500" />
            <span>Priority Alerts & System Security Center</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
              {alerts.filter((a) => !a.resolved).length} Unresolved
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time security warnings, API rate limit monitors, integration status alerts, and dispatch notification rules.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-x-auto">
          {[
            { id: "all", label: "All Alerts" },
            { id: "critical", label: "Critical" },
            { id: "high", label: "High" },
            { id: "medium", label: "Medium" },
            { id: "info", label: "Info" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSeverityFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                severityFilter === tab.id
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Alert List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <div className="text-base font-bold text-slate-900 dark:text-white">All Clear! No alerts found.</div>
              <p className="text-xs mt-1">No alerts matching filter criteria.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const isCritical = alert.severity === "critical";
              const isHigh = alert.severity === "high";
              const isMedium = alert.severity === "medium";

              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    alert.resolved
                      ? "bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-white/5 opacity-70"
                      : isCritical
                      ? "bg-rose-500/10 border-rose-500/30 shadow-md"
                      : isHigh
                      ? "bg-amber-500/10 border-amber-500/30"
                      : isMedium
                      ? "bg-indigo-500/10 border-indigo-500/30"
                      : "bg-cyan-500/10 border-cyan-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${
                          isCritical
                            ? "bg-rose-600"
                            : isHigh
                            ? "bg-amber-600"
                            : isMedium
                            ? "bg-indigo-600"
                            : "bg-cyan-600"
                        }`}
                      >
                        {isCritical || isHigh ? (
                          <AlertTriangle className="w-5 h-5" />
                        ) : (
                          <Info className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {alert.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              isCritical
                                ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                                : isHigh
                                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                                : "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                            }`}
                          >
                            {alert.severity}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          Source: {alert.source} • {alert.time}
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 pt-1 leading-relaxed">
                          {alert.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!alert.resolved && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Notification Dispatch Settings */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-500" />
              Dispatch Notification Channels
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Choose how priority alerts get delivered to you in real-time.
            </p>

            <div className="space-y-3">
              {[
                { key: "emailAlerts", label: "Email Alerts (Digest & Critical)", icon: Mail },
                { key: "smsAlerts", label: "SMS Urgent Alerts (+91 **** 8820)", icon: Smartphone },
                { key: "pushNotifications", label: "Web Push Notifications", icon: Bell },
                { key: "whatsappAlerts", label: "WhatsApp Bot Urgent Ping", icon: Zap },
              ].map((item) => {
                const Icon = item.icon;
                const isEnabled = notificationSettings[item.key as keyof typeof notificationSettings];

                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</span>
                    </div>

                    <button
                      onClick={() => toggleNotification(item.key as keyof typeof notificationSettings)}
                      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        isEnabled ? "bg-amber-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white shadow" />
                    </button>
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
