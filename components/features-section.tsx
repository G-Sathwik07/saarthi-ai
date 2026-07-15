'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Reply,
  Inbox,
  BellRing,
  Users,
  CalendarClock,
} from 'lucide-react';
import { SectionTitle } from './section-title';
import { FeatureCard } from './feature-card';

const features = [
  {
    icon: FileText,
    title: 'AI Email Summaries',
    description:
      'Long threads condensed into three-line briefings with action items highlighted.',
    accent: '#2563EB',
  },
  {
    icon: Reply,
    title: 'Quick Replies',
    description:
      'Context-aware drafts in your tone - approve, tweak or regenerate in one click.',
    accent: '#06B6D4',
  },
  {
    icon: Inbox,
    title: 'Unified Inbox',
    description:
      'Gmail, Outlook and Slack messages in one calm view, ranked by what actually matters.',
    accent: '#22C55E',
  },
  {
    icon: BellRing,
    title: 'Smart Alerts',
    description:
      'Saarthi surfaces only what needs your attention - conflicts, deadlines and priority senders.',
    accent: '#F59E0B',
  },
  {
    icon: Users,
    title: 'Multi-Account Management',
    description:
      'Switch between work and personal contexts without switching apps or losing context.',
    accent: '#EF4444',
  },
  {
    icon: CalendarClock,
    title: 'Calendar Intelligence',
    description:
      'Meeting prep, travel-time buffers and proactive rescheduling when conflicts arise.',
    accent: '#2563EB',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Features"
          title={<>Everything you need to run your digital life</>}
          description="Each capability is designed to reduce noise and amplify your judgment - not to add another tab to your day."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} index={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
