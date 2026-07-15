'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  withGlow?: boolean;
}

export function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  withGlow = false,
}: CTAButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variants = {
    primary:
      'text-white bg-brand-gradient shadow-[0_8px_30px_-8px_rgba(37,99,235,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.8)] hover:-translate-y-0.5',
    secondary:
      'text-ink bg-bg-surface border border-line hover:bg-bg-surface-hover hover:border-brand-blue/40 hover:-translate-y-0.5',
    ghost:
      'text-ink-secondary hover:text-ink hover:bg-bg-surface/60',
  };

  const content = (
    <>
      {withGlow && variant === 'primary' && (
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-brand-gradient opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={cn(base, sizes[size], variants[variant], className)} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={cn(base, sizes[size], variants[variant], className)} {...motionProps}>
      {content}
    </motion.button>
  );
}
