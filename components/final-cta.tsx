'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CTAButton } from './cta-button';

export function FinalCTA() {
  return (
    <section id="get-started" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-line bg-bg-surface/60 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          {/* animated background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/20 blur-[120px]"
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-1/4 top-1/3 h-[260px] w-[260px] rounded-full bg-brand-cyan/15 blur-[100px]"
              animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-primary/60 px-4 py-1.5 text-xs font-medium text-ink-secondary backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            Start your cognitive genesis
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl text-balance"
          >
            Let Saarthi amplify how you work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg text-balance"
          >
            Connect your accounts in minutes. Saarthi starts understanding your context
            and proposing actions - always with you in the loop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTAButton size="lg" href="#get-started" withGlow>
              Get Started - it's free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </CTAButton>
            <CTAButton variant="secondary" size="lg" href="#dashboard-preview">
              Explore the dashboard
            </CTAButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 text-xs text-ink-secondary"
          >
            No credit card required. Your data stays encrypted and yours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
