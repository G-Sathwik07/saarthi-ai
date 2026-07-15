interface IconProps {
  className?: string;
}

export function GmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="#1E293B" />
      <path d="M3 6.5 12 13l9-6.5" stroke="#EA4335" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19l6-6M20 19l-6-6" stroke="#C5221F" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 5l8 6 8-6" stroke="#EA4335" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" fill="#25D366" />
      <path d="M8.5 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.2.5.7 1.2 1.3 1.6.6.4 1 .5 1.2.6.2 0 .4 0 .5-.1l.5-.6c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .3-.1 1-.6 1.4-.5.4-1.2.6-1.8.5-.6-.1-1.7-.4-2.9-1.3-1.4-1-2.3-2.2-2.6-2.6-.3-.4-.6-1.2-.6-1.9 0-.7.3-1.1.5-1.4Z" fill="#0B1120" />
    </svg>
  );
}

export function SlackIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M5 14.5a1.5 1.5 0 1 1 0-3h3a1.5 1.5 0 0 1 0 3H5Z" fill="#E01E5A" />
      <path d="M9.5 5a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-3 0V5Z" fill="#36C5F0" />
      <path d="M19 9.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3H19Z" fill="#2EB67D" />
      <path d="M14.5 19a1.5 1.5 0 0 1-3 0v-3a1.5 1.5 0 0 1 3 0V19Z" fill="#ECB22E" />
      <path d="M5 9.5a1.5 1.5 0 0 1 0-3h3a1.5 1.5 0 0 1 0 3H5Z" fill="#36C5F0" opacity="0.9" />
      <path d="M9.5 19a1.5 1.5 0 0 1-3 0v-3a1.5 1.5 0 0 1 3 0V19Z" fill="#E01E5A" opacity="0.9" />
      <path d="M19 14.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1 0-3H19Z" fill="#ECB22E" opacity="0.9" />
      <path d="M14.5 5a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-3 0V5Z" fill="#2EB67D" opacity="0.9" />
    </svg>
  );
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M19.5 5.5A16 16 0 0 0 15.5 4l-.3.5a12 12 0 0 1 3.5 1.2 12 12 0 0 0-12.4 0A12 12 0 0 1 9.8 4.5L9.5 4a16 16 0 0 0-4 1.5C2.5 9 2 12.5 2.2 16a16 16 0 0 0 5 2.5l.6-1c-.6-.2-1.2-.5-1.7-.8l.4-.3a11 11 0 0 0 9 0l.4.3c-.5.3-1.1.6-1.7.8l.6 1a16 16 0 0 0 5-2.5c.3-4-.2-7.5-2.3-10.5ZM8.5 14c-.8 0-1.5-.7-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7S9.3 14 8.5 14Zm7 0c-.8 0-1.5-.7-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7S16.3 14 15.5 14Z" fill="#5865F2" />
    </svg>
  );
}

export function GoogleCalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" />
      <rect x="3" y="3" width="18" height="4" rx="2" fill="#4285F4" />
      <path d="M3 6h18v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z" fill="#1E293B" />
      <rect x="5" y="8" width="14" height="11" rx="1.5" fill="#0B1120" stroke="#4285F4" strokeWidth="1.2" />
      <path d="M8 12h2M8 15h2M13 12h3M13 15h3" stroke="#4285F4" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 3h4v4H3zM17 3h4v4h-4z" fill="#4285F4" />
      <path d="M3 3h4v4H3zM17 3h4v4h-4z" fill="#34A853" opacity="0.6" />
    </svg>
  );
}

export function OutlookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect x="3" y="5" width="13" height="14" rx="2" fill="#0078D4" />
      <rect x="5" y="7" width="9" height="10" rx="1" fill="#0B1120" />
      <path d="M7 10h5M7 12h5M7 14h3" stroke="#0078D4" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="14" y="6" width="7" height="12" rx="1.5" fill="#106EBE" />
      <path d="M16.5 9.5l4 5M20.5 9.5l-4 5" stroke="#0B1120" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18.5"  cy="12" r="1.2" fill="#0B1120" />
    </svg>
  );
}
