import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn('h-8 w-8', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="16" cy="16" r="9" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="16" cy="16" r="3.5" fill="url(#logo-grad)" />
      <circle cx="16" cy="2.5" r="1.5" fill="#06B6D4" />
      <circle cx="29.5" cy="16" r="1.5" fill="#2563EB" />
      <circle cx="16" cy="29.5" r="1.5" fill="#06B6D4" />
      <circle cx="2.5" cy="16" r="1.5" fill="#2563EB" />
      <path d="M16 2.5L16 16M29.5 16L16 16M16 29.5L16 16M2.5 16L16 16" stroke="url(#logo-grad)" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className="h-8 w-8" />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Saarthi<span className="text-brand-cyan">.ai</span>
        </span>
      )}
    </div>
  );
}
