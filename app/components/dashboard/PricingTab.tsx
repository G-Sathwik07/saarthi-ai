"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Star,
} from "lucide-react";

export default function PricingTab() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activePlan, setActivePlan] = useState("pro");

  const plans = [
    {
      id: "starter",
      name: "Starter AI",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever free",
      desc: "Ideal for individual freelancers scanning basic email noise and getting daily digests.",
      badge: "Free Tier",
      features: [
        "Up to 2 Connected Channels (Gmail & Outlook)",
        "50 AI Digest Summaries / mo",
        "DeepMind Synthesizer v3.5 Lite",
        "Standard Community Support",
        "Manual Task Extraction",
      ],
      cta: "Current Free Tier",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro Agent",
      priceMonthly: "$29",
      priceAnnual: "$23",
      period: "per user / month",
      desc: "For busy executives, founders, and managers needing 24/7 autonomous inbox triage & WhatsApp replies.",
      badge: "ACTIVE PLAN",
      features: [
        "Unlimited Channels (WhatsApp, Outlook, Gmail, Telegram, Slack)",
        "Unlimited Daily Executive Digests & Audio Briefings",
        "DeepMind Synthesizer v3.5 Pro + GPT-4o Access",
        "Autonomous Draft Replies & Calendar Auto-Rescheduling",
        "Notion & CRM RAG Knowledge Base Sync",
        "Priority 24/7 SLA Support",
      ],
      cta: "Current Active Plan",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Custom",
      priceMonthly: "$99",
      priceAnnual: "$79",
      period: "per user / month",
      desc: "For teams and organizations requiring custom LLM fine-tuning, SOC-2 compliance, and dedicated nodes.",
      badge: "Enterprise",
      features: [
        "Everything in Pro Tier",
        "Custom Fine-Tuned Domain LLM Models",
        "SOC-2 Type II & HIPAA Compliance",
        "Custom Webhook & API Endpoint Provisioning",
        "Dedicated Account Success Manager",
        "99.99% Guaranteed Uptime SLA",
      ],
      cta: "Contact Enterprise Sales",
      popular: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-rose-500" />
            <span>Subscriptions & Pricing Plans</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20">
              Pro Active
            </span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Choose the perfect plan for your autonomous AI workflow. Upgrade or downgrade anytime with 0 lock-in.
          </p>
        </div>

        {/* Annual / Monthly Billing Switch */}
        <div className="flex items-center gap-3 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isAnnual
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isAnnual
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] bg-rose-500/30 text-rose-200 px-1.5 py-0.5 rounded font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Active Subscription Status Banner */}
      <div className="p-6 rounded-2xl glass-card border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-indigo-500/5 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-300">
              <Star className="w-3.5 h-3.5 fill-current text-rose-500" /> Current Plan: Pro Agent ($23/mo billed annually)
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Next billing date: August 21, 2026 • Card ending in •••• 4028
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Billing portal session initiated via Stripe.")}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md"
          >
            Manage Billing & Payment Method
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.id === activePlan;
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl glass-card border flex flex-col justify-between space-y-6 relative transition-all ${
                plan.popular
                  ? "border-rose-500 bg-white/90 dark:bg-slate-900/60 shadow-xl scale-[1.02]"
                  : "border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ {plan.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Included Features:</div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActivePlan(plan.id)}
                className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all shadow-md ${
                  isCurrent
                    ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white cursor-default border border-slate-300 dark:border-white/20"
                    : plan.popular
                    ? "bg-rose-600 hover:bg-rose-500 text-white"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                }`}
              >
                {isCurrent ? "Active Plan" : plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/30 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          Detailed Feature Comparison Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-3 px-4">Feature Capability</th>
                <th className="py-3 px-4">Starter Free</th>
                <th className="py-3 px-4 text-rose-600 dark:text-rose-400 font-bold">Pro Agent ($23/mo)</th>
                <th className="py-3 px-4">Enterprise Custom</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">WhatsApp & Outlook Integration</td>
                <td className="py-3 px-4 text-slate-400">Basic</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Full Realtime Webhook</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Full Realtime Webhook</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Executive Morning Audio Briefing</td>
                <td className="py-3 px-4 text-slate-400">—</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Daily HD Voice Digest</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Daily HD Voice Digest</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Autonomous Draft Replies</td>
                <td className="py-3 px-4 text-slate-400">—</td>
                <td className="py-3 px-4 font-bold text-emerald-500 font-bold">Included</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Included</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Custom Fine-Tuned Models</td>
                <td className="py-3 px-4 text-slate-400">—</td>
                <td className="py-3 px-4 text-slate-400">—</td>
                <td className="py-3 px-4 font-bold text-emerald-500">Dedicated Fine-Tune</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Support SLA</td>
                <td className="py-3 px-4 text-slate-400">Community</td>
                <td className="py-3 px-4 font-bold text-indigo-500">24/7 Priority Email</td>
                <td className="py-3 px-4 font-bold text-purple-500">Dedicated Account Manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
