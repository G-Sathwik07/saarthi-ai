"use client";

import React, { useState } from "react";
import {
  Brain,
  Cpu,
  Zap,
  Sliders,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Terminal,
  Shield,
  MessageSquare,
  Sparkles,
  Save,
  Clock,
  Activity,
  Check,
} from "lucide-react";

export default function AiAgentTab() {
  const [agentStatus, setAgentStatus] = useState<"active" | "paused" | "copilot">("active");
  const [selectedModel, setSelectedModel] = useState("deepmind-v3.5");
  const [promptText, setPromptText] = useState(
    "You are Saarthi AI, an autonomous executive assistant. Prioritize urgent client inquiries from WhatsApp and Outlook. Always maintain a professional, friendly tone, concise bullet points, and extract clear action items with deadlines."
  );
  const [saveToast, setSaveToast] = useState(false);

  const [toggles, setToggles] = useState({
    autoDraft: true,
    sentimentScan: true,
    taskExtract: true,
    calendarAutoReconcile: false,
    smartSummaries: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePrompt = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Mock execution logs
  const logs = [
    {
      id: "log-1",
      time: "14:52:10",
      channel: "WhatsApp",
      action: "Extracted meeting request from Rohan -> Proposed Jul 22, 16:00",
      type: "success",
      confidence: "98.5%",
    },
    {
      id: "log-2",
      time: "14:48:05",
      channel: "Outlook",
      action: "Auto-drafted response to Sarah regarding Q3 retainer contract",
      type: "success",
      confidence: "99.2%",
    },
    {
      id: "log-3",
      time: "14:30:00",
      channel: "Gmail",
      action: "Scanned 14 incoming promotional emails -> Flagged 0 priority items",
      type: "info",
      confidence: "100%",
    },
    {
      id: "log-4",
      time: "14:12:44",
      channel: "Telegram",
      action: "Generated group chat executive summary for #saarthi-devs channel",
      type: "success",
      confidence: "97.1%",
    },
    {
      id: "log-5",
      time: "13:55:18",
      channel: "System",
      action: "Re-indexed vector embeddings for Notion knowledge base",
      type: "info",
      confidence: "100%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span>AI Agent Control Center</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
              LLM Orchestrator
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure Saarthi's autonomous reasoning engine, active capabilities, system instructions, and live execution stream.
          </p>
        </div>

        {/* Agent Operational Mode Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setAgentStatus("active")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agentStatus === "active"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Fully Autonomous</span>
          </button>

          <button
            onClick={() => setAgentStatus("copilot")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agentStatus === "copilot"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Co-Pilot Mode</span>
          </button>

          <button
            onClick={() => setAgentStatus("paused")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              agentStatus === "paused"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Paused</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tokens Processed</span>
            <Cpu className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">1,482,900</div>
          <span className="text-[11px] text-emerald-500 font-semibold">+18% this week</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Average Response Time</span>
            <Clock className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">420 ms</div>
          <span className="text-[11px] text-emerald-500 font-semibold">Sub-second synthesis</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Task Extraction Accuracy</span>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">99.4%</div>
          <span className="text-[11px] text-emerald-500 font-semibold">Zero hallucination guard</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Auto-Replies Drafted</span>
            <MessageSquare className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">288 Drafts</div>
          <span className="text-[11px] text-indigo-500 font-semibold">Ready for review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Configuration & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Base Model Selector */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                Select LLM Foundation Model
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Powered by OpenRouter</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "deepmind-v3.5",
                  name: "DeepMind Synthesizer v3.5",
                  tag: "Recommended",
                  desc: "Optimized for multi-channel inbox summarization & task extraction",
                  bg: "border-purple-500 bg-purple-500/10",
                },
                {
                  id: "gpt-4o",
                  name: "OpenAI GPT-4o",
                  tag: "High Reasoning",
                  desc: "Multimodal speed & complex email draft generation",
                  bg: "border-indigo-500 bg-indigo-500/10",
                },
                {
                  id: "claude-3.5-sonnet",
                  name: "Claude 3.5 Sonnet",
                  tag: "Writing Master",
                  desc: "Nuanced tone matching and high context window retention",
                  bg: "border-amber-500 bg-amber-500/10",
                },
                {
                  id: "llama-3.3-70b",
                  name: "Llama 3.3 70B Instruct",
                  tag: "Open Weights",
                  desc: "Fast open source inference with high privacy protection",
                  bg: "border-emerald-500 bg-emerald-500/10",
                },
              ].map((model) => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedModel === model.id
                      ? `${model.bg} shadow-md`
                      : "border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:border-purple-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{model.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">
                      {model.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Instructions / Persona Prompt */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-500" />
                System Instructions & Persona Guardrails
              </h3>
              {saveToast && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Customize how Saarthi behaves when communicating on WhatsApp, Gmail, Outlook, and Telegram.
            </p>

            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-4 text-xs lg:text-sm bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed font-mono"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSavePrompt}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Persona Prompt</span>
              </button>
            </div>
          </div>

          {/* Capability Toggles */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Autonomous Capabilities & Permissions
            </h3>

            <div className="space-y-3">
              {[
                {
                  key: "autoDraft",
                  label: "Smart Email & Message Auto-Drafting",
                  desc: "Generates draft replies in Outlook, Gmail, and WhatsApp for your review",
                },
                {
                  key: "sentimentScan",
                  label: "WhatsApp & Telegram Sentiment Scanner",
                  desc: "Flags urgent messages requiring emotional or time-critical responses",
                },
                {
                  key: "taskExtract",
                  label: "Task & Action Item Extraction",
                  desc: "Automatically extracts to-dos from chats and stores in Notion/Todoist",
                },
                {
                  key: "calendarAutoReconcile",
                  label: "Auto-Reschedule Calendar Meetings",
                  desc: "Reconciles double-booked slots on Outlook and Google Calendar",
                },
                {
                  key: "smartSummaries",
                  label: "Morning Executive Digest Synthesizer",
                  desc: "Compiles overnight activity into an 8:30 AM audio/text briefing",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>

                  <button
                    onClick={() => handleToggle(item.key as keyof typeof toggles)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                      toggles[item.key as keyof typeof toggles]
                        ? "bg-indigo-600 justify-end"
                        : "bg-slate-300 dark:bg-slate-700 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Log Stream */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-500" />
                Live Agent Execution Log
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Streaming
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 font-mono text-[11px] space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-purple-400 font-semibold">[{log.time}]</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{log.channel}</span>
                  </div>
                  <p className="text-slate-300 leading-tight">{log.action}</p>
                  <div className="text-[9px] text-emerald-400 font-medium">Confidence: {log.confidence}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
