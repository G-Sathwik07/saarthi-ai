'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CTAButton } from './cta-button';
import { NeuralBackground } from './neural-background';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <NeuralBackground className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-0 bg-grid mask-fade-b opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-surface/50 px-4 py-1.5 text-xs font-medium text-ink-secondary backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            <span>Your AI Personal Agent - now in early access</span>
            <span className="ml-1 rounded-full bg-brand-blue/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cyan">
              Beta
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.25rem] text-balance"
          >
            Your AI personal agent for the{' '}
            <span className="text-gradient-blue">digital world</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg md:text-xl text-balance"
          >
            Connect your accounts. Saarthi understands your context and performs
            intelligent actions across your digital life - with you in the loop,
            always. Technology that amplifies you, never replaces you.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <CTAButton size="lg" href="#get-started" withGlow>
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </CTAButton>
            <CTAButton variant="secondary" size="lg" href="#how-it-works">
              See how it works
            </CTAButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-2 text-xs text-ink-secondary"
          >
            <ShieldCheck className="h-4 w-4 text-brand-success" />
            <span>Human-in-the-loop by design. Nothing happens without your approval.</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
