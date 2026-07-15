'use client';

import { motion } from 'framer-motion';
import { Layers, UserCheck, Lock, BrainCircuit } from 'lucide-react';
import { SectionTitle } from './section-title';

const capabilities = [
  {
    icon: Layers,
    title: 'Multi-Account Support',
    description:
      'Connect Gmail, WhatsApp, Slack, Calendar and more into one unified agent layer.',
    accent: 'text-brand-blue',
    glow: 'rgba(37, 99, 235, 0.15)',
  },
  {
    icon: UserCheck,
    title: 'Human-in-the-Loop AI',
    description:
      'Every action is proposed, not executed. You review, you approve, Saarthi proceeds.',
    accent: 'text-brand-cyan',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Your data stays yours. End-to-end encrypted, scoped credentials, no training on your content.',
    accent: 'text-brand-success',
    glow: 'rgba(34, 197, 94, 0.15)',
  },
  {
    icon: BrainCircuit,
    title: 'Context-Aware Intelligence',
    description:
      'Saarthi understands the thread of your day - meetings, messages, priorities and intent.',
    accent: 'text-brand-warning',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
];

export function TrustSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Why Saarthi"
          title={<>Built on trust, designed for partnership</>}
          description="Saarthi is not another inbox. It is a cognitive layer that sits between you and your digital world - amplifying your judgment instead of replacing it."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-bg-surface/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-line/80 hover:bg-bg-surface/70"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: cap.glow }}
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg-primary/60">
                    <Icon className={`h-5 w-5 ${cap.accent}`} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
