'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  accent?: string;
  index?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = '#2563EB',
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-bg-surface/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-line/80 hover:bg-bg-surface/70"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${accent}22` }}
      />
      <div className="relative">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-bg-primary/60 transition-transform duration-300 group-hover:scale-105"
          style={{ boxShadow: `0 0 24px -10px ${accent}` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{description}</p>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />
    </motion.div>
  );
}
