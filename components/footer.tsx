import { Logo } from './logo';

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-primary">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Your AI personal agent for the digital world. Technology that amplifies
              human potential - never replaces it.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink-secondary transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-ink-secondary">
            &copy; {new Date().getFullYear()} Saarthi.ai. All rights reserved.
          </p>
          <p className="text-xs text-ink-secondary">
            Built for the cognitive genesis - human + AI, together.
          </p>
        </div>
      </div>
    </footer>
  );
}
