"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  GmailIcon,
  WhatsAppIcon,
  TelegramIcon,
  OutlookIcon,
  SlackIcon,
  NotionIcon,
  SparklesIcon,
  LockIcon,
  BellIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  CalendarIcon,
  ShieldIcon,
  UserIcon
} from "@/app/components/Icons";

// Mock data for AI prompt playground
const PLAYGROUND_PROMPTS = [
  {
    id: "digest",
    tab: "📧 Daily Digest",
    title: "Summarize my last 5 emails",
    promptText: "Summarize my unread emails from Gmail and Outlook. Categorize them by urgency.",
    aiResponse: `Here is your Unified Daily Digest:

🔥 URGENT ACTION REQUIRED
• Flight Change (Gmail): Air India AI-102 rescheduled to July 26, 14:30. Seat confirmation needed.
• Contract Review (Outlook): Sarah sent Q3 retainer draft. Edits requested by Friday EOD.

💬 INFO & UPDATE
• Server Monitor: Weekly health check completed successfully. CPU at 12%.
• Billing: Stripe invoice #4028 generated ($29.00). Auto-paid.

📅 MEETINGS SYNCED
• Rescheduled: Sync with Dev Team moved to Wednesday 15:00.`
  },
  {
    id: "reply",
    tab: "💬 WhatsApp Reply",
    title: "Draft reply to client on WhatsApp",
    promptText: "Draft a friendly, professional reply to Rohan on WhatsApp. Tell him I received the wireframes and will review them by 6 PM.",
    aiResponse: `Suggested WhatsApp reply to Rohan:

"Hey Rohan! Hope you're doing well. Just wanted to confirm that I've received the wireframes. They look great at first glance. I'll do a detailed review now and send over my feedback by 6:00 PM today. Talk soon! 👍"`
  },
  {
    id: "reminders",
    tab: "🔔 Extract Reminders",
    title: "Find action items & tasks",
    promptText: "Scan my Telegram chats from today and list all the reminders or tasks I agreed to.",
    aiResponse: `Extracted Reminders from Telegram:

1. 📅 Call Dr. Verma (Chat with Father)
   - Schedule appointment for checkup.
   - Due: Tomorrow morning.

2. 📝 Send PDF slides (Group: Saarthi-Devs)
   - Share deck for the onboarding process.
   - Due: Today by 10 PM.

3. 🛒 Bring keys (Chat with Priya)
   - Remember to grab the spare office keys.
   - Status: Pending.`
  },
  {
    id: "calendar",
    tab: "📅 Schedule Meeting",
    title: "Check calendar and propose slot",
    promptText: "Check my Outlook calendar for tomorrow afternoon and find a free 30min slot for a client demo.",
    aiResponse: `Scanning Calendar...

Tomorrow afternoon (Jul 21) availability:
• 14:00 - 14:30 (Free)
• 16:00 - 17:00 (Free)

Email Draft for client:
"Hi there, I'd love to jump on a demo. I have free slots tomorrow afternoon at 2:00 PM or between 4:00 PM and 5:00 PM. Let me know what works best for you!"`
  }
];

export default function Home() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Playground state
  const [activeTab, setActiveTab] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Connections state
  const [connections, setConnections] = useState<{
    [key: string]: "idle" | "connecting" | "connected";
  }>({
    gmail: "idle",
    whatsapp: "idle",
    telegram: "idle",
    outlook: "idle"
  });

  // Connection activity logs
  const [activityLogs, setActivityLogs] = useState<string[]>([
    "Connect your accounts above to see Saarthi AI process active streams..."
  ]);

  // Pricing state
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Newsletter state
  const [emailInput, setEmailInput] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Effect to handle playground typing simulation
  useEffect(() => {
    setIsTyping(true);
    setTypedPrompt("");
    setTypedResponse("");

    const targetPrompt = PLAYGROUND_PROMPTS[activeTab].promptText;
    const targetResponse = PLAYGROUND_PROMPTS[activeTab].aiResponse;

    let promptIndex = 0;
    let promptInterval: NodeJS.Timeout;

    // Simulate typing prompt
    promptInterval = setInterval(() => {
      if (promptIndex < targetPrompt.length) {
        setTypedPrompt((prev) => prev + targetPrompt.charAt(promptIndex));
        promptIndex++;
      } else {
        clearInterval(promptInterval);
        
        // Brief delay, then simulate typing response
        setTimeout(() => {
          setIsTyping(false);
          let responseIndex = 0;
          // Faster chunk-based typing for long responses
          const responseInterval = setInterval(() => {
            if (responseIndex < targetResponse.length) {
              const nextChunk = targetResponse.substring(responseIndex, responseIndex + 8);
              setTypedResponse((prev) => prev + nextChunk);
              responseIndex += 8;
            } else {
              clearInterval(responseInterval);
            }
          }, 15);
        }, 300);
      }
    }, 15);

    return () => {
      clearInterval(promptInterval);
    };
  }, [activeTab]);

  // Connect handler
  const handleConnect = (platform: string) => {
    if (connections[platform] !== "idle") return;

    setConnections((prev) => ({ ...prev, [platform]: "connecting" }));

    // Simulate connection lag
    setTimeout(() => {
      setConnections((prev) => ({ ...prev, [platform]: "connected" }));

      // Add a custom log entry
      let newLog = "";
      const platformNames: { [key: string]: string } = {
        gmail: "Gmail",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        outlook: "Outlook"
      };

      if (platform === "gmail") {
        newLog = "📧 [Gmail] Connected. Synced 18 unread messages. Created reminder: 'Review Q3 retention document with Sarah' (Due Friday).";
      } else if (platform === "whatsapp") {
        newLog = "💬 [WhatsApp] Connected. Analyzed last active thread. Extracted task: 'Send Rohan final wireframes before 6 PM today'.";
      } else if (platform === "telegram") {
        newLog = "✈️ [Telegram] Connected. Scanned 4 developer channels. Created draft: Reply to Dev team about onboarding checklist.";
      } else if (platform === "outlook") {
        newLog = "📅 [Outlook] Connected. Checked calendars for overlaps. Found conflict resolved: Shifting Client Sync to 15:00.";
      }

      setActivityLogs((prev) => {
        // Remove the default placeholder log if it exists
        const filtered = prev.filter(
          (log) => log !== "Connect your accounts above to see Saarthi AI process active streams..."
        );
        return [newLog, ...filtered];
      });
    }, 1500);
  };

  // Newsletter submit
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmailInput("");
    }, 1200);
  };

  // Helper to copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Response copied to clipboard!");
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 font-sans grid-bg selection:bg-indigo-500 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-[600px] radial-glow -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] radial-glow-accent -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[700px] radial-glow-bottom -z-10 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <SparklesIcon size={18} className="text-white" />
              <div className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">
              Saarthi<span className="text-indigo-400">.ai</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">Features</a>
            <a href="#integrations" className="hover:text-zinc-100 transition-colors">Integrations</a>
            <a href="#playground" className="hover:text-zinc-100 transition-colors">Interactive Demo</a>
            <a href="#pricing" className="hover:text-zinc-100 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-zinc-100 transition-colors">FAQs</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#playground" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sign In
            </a>
            <a
              href="#pricing"
              className="relative group overflow-hidden rounded-full p-px font-semibold text-xs text-white uppercase tracking-wider"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              <div className="relative px-6 py-2.5 bg-black rounded-full transition-colors group-hover:bg-transparent duration-300">
                Launch App
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 text-center">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-2"
            >
              Features
            </a>
            <a
              href="#integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-2"
            >
              Integrations
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-2"
            >
              Interactive Demo
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-2"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white py-2"
            >
              FAQs
            </a>
            <div className="h-px bg-white/5 my-2" />
            <div className="flex flex-col gap-2.5">
              <a
                href="#playground"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white py-2"
              >
                Sign In
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-sm font-bold text-white shadow-lg shadow-indigo-500/25"
              >
                Launch App
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Badge Announcement */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
              Saarthi AI v1.0 is Live
            </span>
            <div className="w-px h-3 bg-white/10" />
            <a href="#playground" className="text-xs font-medium text-indigo-400 hover:underline flex items-center gap-1">
              Try Interactive Playground <ArrowRightIcon size={12} />
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight mb-8">
            Your Unified <span className="text-gradient">AI Companion</span> for Emails, Chats & Life
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Connect your Gmail, WhatsApp, Telegram, and Outlook securely. Let Saarthi synthesize your inbox, draft context-aware replies, extract critical reminders, and keep your life perfectly organized.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white text-base shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 group transition-all hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#playground"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 font-semibold text-zinc-300 hover:text-white text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              Interactive Demo
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            </a>
          </div>

          {/* Interactive Hero Preview - Connected accounts mockup dashboard */}
          <div className="relative max-w-5xl mx-auto bg-black/40 border border-white/10 rounded-2xl p-2 shadow-2xl shadow-indigo-500/10">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            {/* Dashboard Mock Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/80 rounded-t-xl border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-zinc-500 ml-4 font-mono">saarthi-command-center v1.0</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] text-zinc-400 font-semibold font-mono tracking-wider uppercase">
                  Connected Stream Live
                </span>
              </div>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 md:p-6 bg-zinc-950/40 rounded-b-xl backdrop-blur-md">
              {/* Left Column: Account Connect Buttons */}
              <div className="lg:col-span-5 flex flex-col gap-4 text-left">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                    <SparklesIcon size={14} className="text-indigo-400" />
                    Quick Integration Playground
                  </h3>
                  <p className="text-xs text-zinc-500 leading-normal">
                    Click connect to establish instant secure bridge. Watch the live AI stream update.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  {/* Gmail Connect Button */}
                  <button
                    onClick={() => handleConnect("gmail")}
                    className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                      connections.gmail === "connected"
                        ? "bg-rose-950/15 border-rose-500/40 text-rose-200"
                        : connections.gmail === "connecting"
                        ? "bg-zinc-900 border-zinc-700 animate-pulse"
                        : "bg-zinc-950 hover:bg-zinc-900/80 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 group-hover:scale-105 transition-transform">
                        <GmailIcon size={18} />
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          connections.gmail === "connected"
                            ? "bg-rose-500/20 text-rose-300"
                            : connections.gmail === "connecting"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {connections.gmail === "connected"
                          ? "Linked"
                          : connections.gmail === "connecting"
                          ? "Syncing"
                          : "Connect"}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Gmail Account</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Emails & Digests</div>
                    </div>
                  </button>

                  {/* WhatsApp Connect Button */}
                  <button
                    onClick={() => handleConnect("whatsapp")}
                    className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                      connections.whatsapp === "connected"
                        ? "bg-emerald-950/15 border-emerald-500/40 text-emerald-200"
                        : connections.whatsapp === "connecting"
                        ? "bg-zinc-900 border-zinc-700 animate-pulse"
                        : "bg-zinc-950 hover:bg-zinc-900/80 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                        <WhatsAppIcon size={18} />
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          connections.whatsapp === "connected"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : connections.whatsapp === "connecting"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {connections.whatsapp === "connected"
                          ? "Linked"
                          : connections.whatsapp === "connecting"
                          ? "Syncing"
                          : "Connect"}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">WhatsApp</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Chats & Actions</div>
                    </div>
                  </button>

                  {/* Telegram Connect Button */}
                  <button
                    onClick={() => handleConnect("telegram")}
                    className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                      connections.telegram === "connected"
                        ? "bg-sky-950/15 border-sky-500/40 text-sky-200"
                        : connections.telegram === "connecting"
                        ? "bg-zinc-900 border-zinc-700 animate-pulse"
                        : "bg-zinc-950 hover:bg-zinc-900/80 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                        <TelegramIcon size={18} />
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          connections.telegram === "connected"
                            ? "bg-sky-500/20 text-sky-300"
                            : connections.telegram === "connecting"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {connections.telegram === "connected"
                          ? "Linked"
                          : connections.telegram === "connecting"
                          ? "Syncing"
                          : "Connect"}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Telegram</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Groups & Alerts</div>
                    </div>
                  </button>

                  {/* Outlook Connect Button */}
                  <button
                    onClick={() => handleConnect("outlook")}
                    className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                      connections.outlook === "connected"
                        ? "bg-blue-950/15 border-blue-500/40 text-blue-200"
                        : connections.outlook === "connecting"
                        ? "bg-zinc-900 border-zinc-700 animate-pulse"
                        : "bg-zinc-950 hover:bg-zinc-900/80 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform">
                        <OutlookIcon size={18} />
                      </span>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          connections.outlook === "connected"
                            ? "bg-blue-500/20 text-blue-300"
                            : connections.outlook === "connecting"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {connections.outlook === "connected"
                          ? "Linked"
                          : connections.outlook === "connecting"
                          ? "Syncing"
                          : "Connect"}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Outlook Mail</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">Work Calendar</div>
                    </div>
                  </button>
                </div>

                {/* Additional Platform Badges */}
                <div className="mt-2">
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase block mb-2">
                    Coming Soon
                  </span>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-400">
                      <SlackIcon size={12} className="text-orange-400" />
                      Slack
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-400">
                      <NotionIcon size={12} className="text-white/80" />
                      Notion Workspace
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live AI Synthesis Log Stream */}
              <div className="lg:col-span-7 flex flex-col bg-zinc-950 border border-white/5 rounded-xl p-4 text-left">
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-zinc-300">Live AI Stream Output</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Status: Awaiting Actions</span>
                </div>

                {/* Logs window */}
                <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto max-h-[220px] pr-2 font-mono scrollbar-thin">
                  {activityLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`text-xs p-3 rounded-lg border leading-relaxed transition-all duration-500 translate-y-0 opacity-100 ${
                        index === 0
                          ? "bg-indigo-950/20 border-indigo-500/30 text-indigo-200 shadow-sm shadow-indigo-500/5 animate-fade-in"
                          : "bg-zinc-900/50 border-white/5 text-zinc-400"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout Section */}
      <section id="features" className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
              Comprehensive Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4">
              Designed for High-Performance Personal Operations
            </p>
            <p className="text-base text-zinc-400 leading-relaxed">
              Saarthi consolidates your fragmented communication streams into a single dashboard, extracting raw intelligence without violating your workspace boundaries.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Unified Stream (Large - Spans 2 columns on medium+) */}
            <div className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
              
              <div>
                <span className="inline-flex items-center justify-center p-3 rounded-xl bg-indigo-500/10 text-indigo-400 mb-6">
                  <BellIcon size={24} />
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">Unified Intelligence Feed</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                  No more jumping between WhatsApp, Telegram, Gmail, and Outlook. Saarthi reads across your authorized platforms asynchronously, building a timeline of digests, urgent queries, and notifications.
                </p>
              </div>

              {/* Graphical element: Hover Stack cards */}
              <div className="mt-8 relative h-40 flex items-center justify-center">
                <div className="absolute bottom-0 w-11/12 h-36 bg-zinc-900 border border-white/5 rounded-xl translate-y-3 z-0 scale-95 opacity-50" />
                <div className="absolute bottom-0 w-23/24 h-36 bg-zinc-900/90 border border-white/5 rounded-xl translate-y-1.5 z-10 scale-98 opacity-80" />
                
                {/* Active top card */}
                <div className="absolute bottom-0 w-full h-36 bg-zinc-950 border border-indigo-500/25 rounded-xl z-20 p-4 flex flex-col justify-between shadow-xl shadow-black/60 group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-rose-500/10 text-rose-500">
                        <GmailIcon size={12} />
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Gmail synthesis
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-indigo-400">Processed 2m ago</span>
                  </div>
                  <div className="text-xs text-zinc-300 font-medium line-clamp-2">
                    "Meeting reschedule: Sarah needs to push our demo back 1 hour tomorrow afternoon. Can you confirm if 3:00 PM works?"
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold uppercase">
                      Urgent Action
                    </span>
                    <span className="text-[9px] text-zinc-500">Auto-extracted reply draft ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Smart Task Detection (Medium - 1 col) */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between group">
              <div>
                <span className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-6">
                  <CalendarIcon size={24} />
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">Smart Reminder Sync</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Natural language details are automatically processed. When someone says "let's do coffee tomorrow at 2 PM" on WhatsApp, Saarthi schedules it instantly.
                </p>
              </div>

              {/* Graphical element: Chat to event card */}
              <div className="mt-8 flex flex-col gap-3 font-sans">
                <div className="self-start max-w-[80%] bg-zinc-900 border border-white/5 rounded-2xl rounded-tl-none p-3 text-xs text-zinc-300 leading-normal">
                  "Hey, let's sync up on Zoom tomorrow afternoon at 3 PM to review the deck."
                </div>
                <div className="self-end max-w-[90%] bg-indigo-950/20 border border-indigo-500/30 rounded-2xl rounded-br-none p-3 text-xs text-indigo-200 flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-300 mt-0.5">
                    <CheckIcon size={12} />
                  </span>
                  <div>
                    <div className="font-bold text-[10px] text-white uppercase tracking-wider">
                      Event Created
                    </div>
                    <div className="font-semibold text-xs mt-0.5">Zoom Team Sync</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">Tomorrow, 3:00 PM - 3:30 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Deep Security & Encryption (Medium - 1 col) */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between group">
              <div>
                <span className="inline-flex items-center justify-center p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-6">
                  <ShieldIcon size={24} />
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">Privacy-First Core</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Your raw personal messages never hit cloud servers. All parsing, entity extraction, and draft summarizations are executed either locally or via zero-trust secure proxies.
                </p>
              </div>

              {/* Graphical element: Privacy lock visual */}
              <div className="mt-6 flex items-center justify-center relative py-6">
                <div className="absolute inset-0 flex items-center justify-center animate-pulse-slow">
                  <div className="w-24 h-24 rounded-full border border-purple-500/20" />
                  <div className="w-32 h-32 rounded-full border border-indigo-500/10 absolute" />
                </div>
                <div className="z-10 bg-zinc-950 p-4 rounded-full border border-white/10 shadow-lg shadow-black group-hover:scale-105 transition-transform duration-300">
                  <LockIcon size={24} className="text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Bento Card 4: Semantic Search (Large - Spans 2 columns) */}
            <div className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
              
              <div>
                <span className="inline-flex items-center justify-center p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-6">
                  <SearchIcon size={24} />
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">Cross-Channel Semantic Search</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                  Ask natural questions like "Where did I mention the budget numbers?" and search across Gmail files, Slack chats, WhatsApp text messages, and calendar entries simultaneously.
                </p>
              </div>

              {/* Graphical element: Search layout */}
              <div className="mt-8 flex flex-col gap-3">
                {/* Mock Search Bar */}
                <div className="flex items-center gap-2.5 px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs text-zinc-400">
                  <SearchIcon size={14} className="text-indigo-400" />
                  <span>"Where did I mention the budget numbers?"</span>
                  <span className="ml-auto text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-zinc-500">
                    Search
                  </span>
                </div>

                {/* Mock Results */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2.5 rounded bg-zinc-950 border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-1.5 text-rose-500 font-bold mb-1">
                      <GmailIcon size={10} />
                      <span>Email Attachment</span>
                    </div>
                    <div className="text-zinc-300 font-medium truncate">Q3 Budget final.xlsx</div>
                    <div className="text-zinc-500 mt-0.5 font-mono">July 18, 14:22</div>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-white/5 hover:border-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold mb-1">
                      <WhatsAppIcon size={10} />
                      <span>Rohan K. (Chat)</span>
                    </div>
                    <div className="text-zinc-300 font-medium truncate">"Hey, the budget is capped..."</div>
                    <div className="text-zinc-500 mt-0.5 font-mono">Yesterday, 19:02</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Grid Section */}
      <section id="integrations" className="py-20 bg-zinc-950/40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
              Platform Integration Matrix
            </h2>
            <p className="text-3xl font-extrabold text-gradient mb-4">
              Integrate Your Digital Workspace in Seconds
            </p>
            <p className="text-sm text-zinc-400">
              Hover over the active connectors below to see operational parameters and secure auth indicators.
            </p>
          </div>

          {/* Grid of integrations */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {/* Gmail */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 transition-transform">
                <GmailIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">Gmail</div>
              <div className="text-[9px] text-zinc-500">API Sync • Secure OAuth</div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                <WhatsAppIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">WhatsApp</div>
              <div className="text-[9px] text-zinc-500">Node proxy • Local Key</div>
            </div>

            {/* Telegram */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                <TelegramIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">Telegram</div>
              <div className="text-[9px] text-zinc-500">Client MTProto • encrypted</div>
            </div>

            {/* Outlook */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <OutlookIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">Outlook</div>
              <div className="text-[9px] text-zinc-500">Microsoft Graph • OAuth</div>
            </div>

            {/* Slack */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                <SlackIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">Slack</div>
              <div className="text-[9px] text-zinc-500">Workspace App • Webhook</div>
            </div>

            {/* Notion */}
            <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-zinc-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <NotionIcon size={24} />
              </div>
              <div className="text-xs font-bold text-white mb-1">Notion</div>
              <div className="text-[9px] text-zinc-500">Official SDK Integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Prompt & Response Showcase */}
      <section id="playground" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
              Interactive Sandbox
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4">
              Experience the Intelligence Engine Live
            </p>
            <p className="text-sm text-zinc-400">
              Select one of the query presets below to watch the Saarthi engine parse prompts, extract intent, and formulate outputs in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Preset Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {PLAYGROUND_PROMPTS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    activeTab === idx
                      ? "bg-indigo-950/25 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/5"
                      : "bg-zinc-950 border-white/5 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold">{item.tab}</span>
                    <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className={`p-1.5 rounded-lg transition-colors ${
                    activeTab === idx ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-zinc-600 group-hover:text-zinc-400"
                  }`}>
                    <ArrowRightIcon size={14} />
                  </span>
                </button>
              ))}
            </div>

            {/* Right Column: Console Output */}
            <div className="lg:col-span-8 bg-zinc-950 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
              
              {/* Console header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
                    <SparklesIcon size={16} />
                  </span>
                  <span className="text-xs font-bold text-zinc-300 font-mono">saarthi_model_v1.0.exe</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
              </div>

              {/* Console body */}
              <div className="flex-1 flex flex-col gap-5 text-left font-mono min-h-[300px] justify-start">
                {/* User Input Prompt */}
                <div className="flex items-start gap-3">
                  <span className="text-zinc-600 font-bold select-none">&gt;_</span>
                  <div className="text-xs text-zinc-200 leading-relaxed">
                    <span className="text-indigo-400 font-semibold font-sans">User: </span>
                    {typedPrompt}
                    {isTyping && <span className="inline-block w-1.5 h-4 bg-indigo-400 animate-pulse ml-0.5" />}
                  </div>
                </div>

                {/* AI Response Output */}
                {typedResponse && (
                  <div className="flex items-start gap-3 border-t border-white/5 pt-4 mt-1">
                    <span className="text-indigo-500 font-bold select-none">✨</span>
                    <div className="flex-1">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                        Saarthi Agent Response
                      </div>
                      <pre className="text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">
                        {typedResponse}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Console Action Bar */}
              {typedResponse && !isTyping && (
                <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5 font-sans">
                    <ClockIcon size={12} className="text-indigo-500" />
                    Inference: 140ms • 512 tokens
                  </span>
                  <div className="flex gap-2.5 font-sans">
                    <button
                      onClick={() => handleCopy(PLAYGROUND_PROMPTS[activeTab].aiResponse)}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                    >
                      <CopyIcon size={12} />
                      Copy Draft
                    </button>
                    <button
                      onClick={() => alert("Action triggered! Integrated with workspace.")}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <CheckIcon size={12} />
                      Sync Action
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-zinc-950/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
              Pricing Options
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4">
              Flexible Plans to Match Your Flow
            </p>
            
            {/* Monthly/Yearly Toggle */}
            <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 border border-white/10 mt-4">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingPeriod === "monthly" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingPeriod === "yearly" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-white"
                }`}
              >
                Yearly Billing
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase tracking-wide">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Plan 1: Free */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Starter</h3>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  Basic AI stream organization for individuals testing their workflow boundaries.
                </p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-zinc-500 font-medium">/ lifetime</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <ul className="flex flex-col gap-4 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Link up to 1 account per platform
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Hourly digest synthesis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Basic web console dashboard
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-600 line-through">
                    <span className="p-0.5 rounded-full bg-zinc-900 text-zinc-700">
                      <CheckIcon size={12} />
                    </span>
                    Natural language calendar scheduling
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-600 line-through">
                    <span className="p-0.5 rounded-full bg-zinc-900 text-zinc-700">
                      <CheckIcon size={12} />
                    </span>
                    Secure local proxying keys
                  </li>
                </ul>
              </div>
              <a
                href="#playground"
                className="mt-8 w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors block"
              >
                Sign Up Free
              </a>
            </div>

            {/* Plan 2: Pro (Featured) */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border-indigo-500/40 ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-500/5">
              {/* Featured Ribbon Badge */}
              <div className="absolute top-0 right-0 bg-indigo-600 text-[9px] font-bold text-white uppercase tracking-wider px-3.5 py-1 rounded-bl-lg">
                Most Popular
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Pro Power</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Deep contextual memory across your personal integrations. Essential for productivity hackers.
                </p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${billingPeriod === "monthly" ? "15" : "12"}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">/ month</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <ul className="flex flex-col gap-4 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5 font-medium text-white">
                    <span className="p-0.5 rounded-full bg-indigo-500 text-white">
                      <CheckIcon size={12} />
                    </span>
                    Unlimited connected accounts
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Real-time AI stream synthesis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Smart calendar scheduling & sync
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Auto reply drafts with tone config
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Zero-Trust proxy storage (100GB)
                  </li>
                </ul>
              </div>
              <button
                onClick={() => alert("Redirecting to Stripe checkout...")}
                className="mt-8 w-full text-center py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-500/25 block transition-transform group-hover:scale-[1.02]"
              >
                Go Pro Now
              </button>
            </div>

            {/* Plan 3: Ultimate */}
            <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Enterprise / Local</h3>
                <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                  Self-hosted and local-first architecture for ultimate security and offline operation.
                </p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    ${billingPeriod === "monthly" ? "39" : "31"}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">/ month</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <ul className="flex flex-col gap-4 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Self-hosted docker container option
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Local LLM connectivity (Ollama / Llama.cpp)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Custom system instructions & templates
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Unlimited local semantic search
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <CheckIcon size={12} />
                    </span>
                    Premium support & custom connectors
                  </li>
                </ul>
              </div>
              <button
                onClick={() => alert("Our team will reach out to schedule setup call.")}
                className="mt-8 w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-colors block"
              >
                Deploy Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-24 border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">
              Common Questions
            </h2>
            <p className="text-3xl font-extrabold text-gradient mb-4">
              Frequently Asked Questions
            </p>
            <p className="text-sm text-zinc-400">
              Clear up any doubts regarding how Saarthi coordinates with your private channels.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4">
            {[
              {
                q: "How does Saarthi connect to my private WhatsApp and Telegram accounts?",
                a: "Saarthi connects to WhatsApp via a secure local-first WhatsApp Web interface (using session tokens stored securely on your device). For Telegram, it establishes a secure MTProto client bridge using your own Telegram API App ID, ensuring messages are streamed and processed inside an encrypted boundary that you control."
              },
              {
                q: "Is my personal message data shared with the AI models to train them?",
                a: "Absolutely not. Saarthi enforces a strict privacy policy: your message logs are never stored, saved, or uploaded to any model training loop. We utilize zero-data-retention APIs from our backend partners, and if you choose the Ultimate self-hosted package, all LLM calculations run completely offline on your own machine using local models."
              },
              {
                q: "Can I choose which chats or email folders are scanned by the agent?",
                a: "Yes. The onboarding interface allows you to define strict folders/labels filtering. For example, you can instruct Saarthi to only check emails labeled 'Work' or chats from specific contacts, ensuring your personal threads remain entirely private and ignored."
              },
              {
                q: "Does Saarthi automatically write and send replies on my behalf?",
                a: "No. By default, Saarthi is configured in 'Copilot' mode. It drafts context-aware responses and queues them in your dashboard. You have absolute control to review, edit, copy, or click 'Approved Send' before any draft is pushed back to WhatsApp, Telegram, or Gmail."
              },
              {
                q: "What is your local encryption architecture?",
                a: "All tokens, credentials, and message caches are encrypted locally on your hard drive using AES-256 GCM. The keys are managed directly by your operating system's native keychain (Keychain on macOS / Credentials Manager on Windows), ensuring no third-party can read them."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-950/60 border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-sm text-zinc-200"
                >
                  <span>{faq.q}</span>
                  <span className={`p-1 rounded-md bg-white/5 text-zinc-400 transition-transform duration-300 ${
                    expandedFaq === index ? "rotate-180 text-indigo-400" : ""
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden text-xs text-zinc-400 leading-relaxed ${
                    expandedFaq === index ? "max-h-[300px] p-5 pt-0 border-t border-white/5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 border-t border-white/5 bg-zinc-950/60 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center justify-center p-3.5 rounded-full bg-indigo-500/10 text-indigo-400 mb-6 animate-bounce">
            <SparklesIcon size={28} />
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient mb-6">
            Take Control of Your Digital Stream Today
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of professionals who have consolidated their chat noise, simplified scheduling, and regained peace of mind using Saarthi AI.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            Start Your 14-Day Pro Free Trial
            <ArrowRightIcon size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo & description */}
          <div className="md:col-span-4 text-left flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                  <SparklesIcon size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">
                  Saarthi<span className="text-indigo-400">.ai</span>
                </span>
              </a>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                Saarthi.ai is the premier local-first personal artificial intelligence assistant bridging chat communication, email stream aggregation, and proactive life organization.
              </p>
            </div>
            <div className="text-[10px] text-zinc-600 mt-6 md:mt-0 font-mono">
              © 2026 Saarthi AI. All rights reserved.
            </div>
          </div>

          {/* Structured links */}
          <div className="md:col-span-5 grid grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
                <li><a href="#features" className="hover:text-zinc-300 transition-colors">Features</a></li>
                <li><a href="#integrations" className="hover:text-zinc-300 transition-colors">Integrations</a></li>
                <li><a href="#playground" className="hover:text-zinc-300 transition-colors">Sandbox Demo</a></li>
                <li><a href="#pricing" className="hover:text-zinc-300 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Developer API</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Status Feed</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">Security</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">Zero-Trust Audit</a></li>
                <li><a href="#" className="hover:text-zinc-300 transition-colors">GDPR / Compliance</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription form */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-4">
              Subscribe to Updates
            </h4>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              Receive notifications about feature deployments, security updates, and beta opportunities.
            </p>

            {newsletterStatus === "success" ? (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <CheckIcon size={14} />
                Successfully subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-white/5 hover:border-white/10 focus:border-indigo-500/50 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "submitting"}
                  className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 rounded-lg text-xs font-bold text-white transition-colors"
                >
                  {newsletterStatus === "submitting" ? "Submitting..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
