'use client';

import { motion } from 'framer-motion';
import { User, Bot, Plug, CheckCircle2, Zap } from 'lucide-react';
import { SectionTitle } from './section-title';

const steps = [
  {
    icon: User,
    label: 'You',
    description: 'Go about your day. Saarthi watches for things that matter.',
    color: '#2563EB',
  },
  {
    icon: Bot,
    label: 'AI Agent',
    description: 'Understands context across all connected accounts.',
    color: '#06B6D4',
  },
  {
    icon: Plug,
    label: 'Connected Services',
    description: 'Pulls signals from Gmail, Slack, Calendar and more.',
    color: '#22C55E',
  },
  {
    icon: CheckCircle2,
    label: 'Your Approval',
    description: 'Proposes an action. You confirm with one tap.',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    label: 'Action Executed',
    description: 'Saarthi completes it across the right service - cleanly.',
    color: '#EF4444',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="How it works"
          title={<>From intent to action, in five calm steps</>}
          description="Saarthi never acts alone. Every step is visible, reviewable and reversible - a partnership loop between you and your agent."
        />

        <div className="mt-16">
          {/* Desktop horizontal flow */}
          <div className="hidden lg:block">
            <div className="relative flex items-start justify-between">
              {/* connection line */}
              <svg
                className="absolute left-0 right-0 top-12 z-0 h-24 w-full"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="flow-grad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" stopOpacity="0.1" />
                    <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#EF4444" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path d="M 60 40 Q 300 0, 360 40 T 660 40 T 960 40 T 1140 40" stroke="url(#flow-grad)" strokeWidth="2" fill="none" />
                <path d="M 60 40 Q 300 0, 360 40 T 660 40 T 960 40 T 1140 40" stroke="#06B6D4" strokeWidth="2" fill="none" className="animate-dash-flow" opacity="0.5" />
              </svg>

              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative z-10 flex w-[18%] flex-col items-center text-center"
                  >
                    <div
                      className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-line bg-bg-surface/70 backdrop-blur-sm transition-transform duration-300 hover:scale-105"
                      style={{ boxShadow: `0 0 30px -12px ${step.color}55` }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-20"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${step.color}, transparent 70%)` }}
                      />
                      <Icon className="relative h-8 w-8" style={{ color: step.color }} />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-bg-primary text-xs font-semibold text-ink-secondary">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile vertical flow */}
          <div className="lg:hidden">
            <div className="relative flex flex-col gap-6">
              <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-brand-blue/40 via-brand-cyan/40 to-brand-error/40" aria-hidden />
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative flex items-start gap-4"
                  >
                    <div
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-bg-surface/80"
                      style={{ boxShadow: `0 0 24px -10px ${step.color}55` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: step.color }} />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-display text-base font-semibold text-ink">
                        <span className="text-ink-secondary mr-2 text-sm font-normal">{i + 1}.</span>
                        {step.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
