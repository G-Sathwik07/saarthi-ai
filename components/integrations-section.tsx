'use client';

import { motion } from 'framer-motion';
import { SectionTitle } from './section-title';
import { IntegrationCard } from './integration-card';
import {
  GmailIcon,
  WhatsAppIcon,
  SlackIcon,
  DiscordIcon,
  GoogleCalendarIcon,
  OutlookIcon,
} from './integration-icons';

const integrations = [
  {
    name: 'Gmail',
    description: 'Summaries, smart replies and inbox triage across accounts.',
    icon: GmailIcon,
    accent: '#EA4335',
  },
  {
    name: 'WhatsApp',
    description: 'Context-aware message drafting and conversation recall.',
    icon: WhatsAppIcon,
    accent: '#25D366',
  },
  {
    name: 'Slack',
    description: 'Thread summaries, mention routing and channel intelligence.',
    icon: SlackIcon,
    accent: '#E01E5A',
  },
  {
    name: 'Discord',
    description: 'Community signal detection and important message surfacing.',
    icon: DiscordIcon,
    accent: '#5865F2',
  },
  {
    name: 'Google Calendar',
    description: 'Meeting prep, conflict detection and schedule optimization.',
    icon: GoogleCalendarIcon,
    accent: '#4285F4',
  },
  {
    name: 'Outlook',
    description: 'Unified inbox triage and cross-platform email coordination.',
    icon: OutlookIcon,
    accent: '#0078D4',
  },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Supported integrations"
          title={<>One agent across the tools you already use</>}
          description="Saarthi connects to your existing accounts - no migration, no new inbox. It reads context and acts where you already work."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((int, i) => (
            <IntegrationCard key={int.name} index={i} {...int} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-ink-secondary"
        >
          <span className="h-px w-12 bg-line" />
          <span>More integrations arriving every month</span>
          <span className="h-px w-12 bg-line" />
        </motion.div>
      </div>
    </section>
  );
}
