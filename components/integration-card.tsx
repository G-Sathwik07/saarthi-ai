'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  className?: string;
  index?: number;
}

export function IntegrationCard({
  name,
  description,
  icon: Icon,
  accent,
  index = 0,
}: IntegrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-surface/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-line/80 hover:bg-bg-surface/70"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${accent}22` }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-bg-primary/60 transition-transform duration-300 group-hover:scale-105"
        >
          <Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base font-semibold text-ink">{name}</h3>
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{description}</p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-1.5 text-xs text-ink-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="h-px w-6" style={{ background: `${accent}55` }} />
        <span className="uppercase tracking-wider" style={{ color: accent }}>Connected</span>
      </div>
    </motion.div>
  );
}
