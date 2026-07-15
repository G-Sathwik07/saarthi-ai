'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Bell,
  Settings,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Plug,
  ChevronRight,
} from 'lucide-react';
import { SectionTitle } from './section-title';
import {
  GmailIcon,
  WhatsAppIcon,
  SlackIcon,
  DiscordIcon,
  GoogleCalendarIcon,
  OutlookIcon,
} from './integration-icons';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Mail, label: 'Inbox' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Bell, label: 'Alerts', badge: 3 },
  { icon: Plug, label: 'Accounts' },
  { icon: Settings, label: 'Settings' },
];

const overviewCards = [
  { label: 'Unread messages', value: '24', delta: '-18%', icon: Mail, accent: '#2563EB' },
  { label: 'Pending approvals', value: '3', delta: '2 new', icon: CheckCircle2, accent: '#06B6D4' },
  { label: "Today's meetings", value: '5', delta: 'next 11:30', icon: Calendar, accent: '#22C55E' },
];

const emails = [
  { from: 'Sarah Chen', subject: 'Q3 roadmap review', preview: 'Attached the updated deck for tomorrow...', time: '9:42', unread: true },
  { from: 'Stripe', subject: 'Invoice #INV-204 paid', preview: 'Payment of $4,200.00 was successfully...', time: '8:15', unread: true },
  { from: 'Marcus Lee', subject: 'Re: design feedback', preview: 'Looks great - one small note on the...', time: 'Yesterday', unread: false },
];

const alerts = [
  { type: 'warning', title: 'Calendar conflict', detail: '2 meetings overlap at 2 PM', icon: AlertTriangle, color: '#F59E0B' },
  { type: 'info', title: 'Priority email', detail: 'Sarah Chen - Q3 roadmap', icon: Sparkles, color: '#06B6D4' },
];

const connectedAccounts = [
  { icon: GmailIcon, name: 'Gmail', status: '2 accounts' },
  { icon: SlackIcon, name: 'Slack', status: 'Workspace' },
  { icon: GoogleCalendarIcon, name: 'Calendar', status: 'Synced' },
  { icon: WhatsAppIcon, name: 'WhatsApp', status: 'Connected' },
];

export function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Inside Saarthi"
          title={<>Your day, distilled into one calm dashboard</>}
          description="A unified view across every connected account - your AI briefing, messages, alerts and approvals in one place."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mt-14"
        >
          {/* glow behind */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-10 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-line bg-bg-surface/70 shadow-2xl backdrop-blur-xl">
            {/* top bar */}
            <div className="flex items-center justify-between border-b border-line bg-bg-primary/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#EF4444]/70" />
                  <span className="h-3 w-3 rounded-full bg-[#F59E0B]/70" />
                  <span className="h-3 w-3 rounded-full bg-[#22C55E]/70" />
                </div>
                <span className="ml-3 hidden text-xs text-ink-secondary sm:inline">app.saarthi.ai/overview</span>
              </div>
              <div className="flex items-center gap-2 text-ink-secondary">
                <Search className="h-4 w-4" />
                <span className="hidden text-xs sm:inline">Quick search</span>
                <kbd className="hidden rounded border border-line bg-bg-surface px-1.5 py-0.5 text-[10px] sm:inline">Ctrl+K</kbd>
              </div>
            </div>

            <div className="flex min-h-[560px]">
              {/* Sidebar */}
              <aside className="hidden w-56 shrink-0 flex-col border-r border-line bg-bg-primary/40 p-4 sm:flex">
                <div className="flex items-center gap-2 px-2 py-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-display text-sm font-semibold text-ink">Saarthi</span>
                </div>

                <nav className="mt-6 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href="#"
                        className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          item.active
                            ? 'bg-brand-blue/10 text-ink'
                            : 'text-ink-secondary hover:bg-bg-surface hover:text-ink'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${item.active ? 'text-brand-cyan' : ''}`} />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full bg-brand-blue px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-auto rounded-xl border border-line bg-bg-surface/60 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-brand-gradient" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-ink">Aarav Mehta</p>
                      <p className="truncate text-[10px] text-ink-secondary">Pro plan</p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main */}
              <div className="flex-1 overflow-hidden p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-ink-secondary">Good morning, Aarav</p>
                    <h3 className="font-display text-xl font-semibold text-ink">Today's overview</h3>
                  </div>
                  <div className="hidden items-center gap-2 rounded-full border border-line bg-bg-surface/60 px-3 py-1.5 text-xs text-ink-secondary sm:flex">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Tue, Jul 15</span>
                  </div>
                </div>

                {/* Overview cards */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {overviewCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.label}
                        className="rounded-xl border border-line bg-bg-primary/40 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line"
                            style={{ boxShadow: `0 0 20px -8px ${card.accent}` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: card.accent }} />
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 text-ink-secondary" />
                        </div>
                        <p className="mt-3 font-display text-2xl font-semibold text-ink">{card.value}</p>
                        <p className="text-xs text-ink-secondary">{card.label}</p>
                        <p className="mt-1 text-[11px]" style={{ color: card.accent }}>{card.delta}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                  {/* AI Briefing */}
                  <div className="lg:col-span-2 rounded-xl border border-line bg-bg-primary/40 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-display text-sm font-semibold text-ink">AI Briefing</h4>
                      <span className="ml-auto text-[10px] text-ink-secondary">Updated 2 min ago</span>
                    </div>
                    <div className="mt-3 space-y-2.5">
                      <div className="flex gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                        <p className="text-sm leading-relaxed text-ink-secondary">
                          <span className="text-ink">Sarah Chen</span> sent the Q3 roadmap deck. Saarthi drafted a reply and prepared talking points for your 11:30 meeting.
                        </p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-warning" />
                        <p className="text-sm leading-relaxed text-ink-secondary">
                          <span className="text-ink">Calendar conflict</span> detected at 2 PM - two overlapping meetings. Saarthi suggests rescheduling the internal sync.
                        </p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-success" />
                        <p className="text-sm leading-relaxed text-ink-secondary">
                          <span className="text-ink">Stripe invoice</span> #INV-204 was paid. Saarthi filed it under Q3 finance and notified your accountant.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button className="rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white transition-transform hover:scale-[1.02]">
                        Review 3 actions
                      </button>
                      <button className="rounded-lg border border-line bg-bg-surface px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:text-ink">
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Alerts */}
                  <div className="rounded-xl border border-line bg-bg-primary/40 p-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-brand-warning" />
                      <h4 className="font-display text-sm font-semibold text-ink">Alerts</h4>
                    </div>
                    <div className="mt-3 space-y-2">
                      {alerts.map((alert) => {
                        const Icon = alert.icon;
                        return (
                          <div
                            key={alert.title}
                            className="flex items-start gap-2.5 rounded-lg border border-line bg-bg-surface/40 p-2.5"
                          >
                            <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: alert.color }} />
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-ink">{alert.title}</p>
                              <p className="text-[11px] text-ink-secondary">{alert.detail}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent emails + Connected accounts */}
                <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="lg:col-span-2 rounded-xl border border-line bg-bg-primary/40 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-semibold text-ink">Recent emails</h4>
                      <a href="#" className="flex items-center gap-1 text-[11px] text-ink-secondary hover:text-ink">
                        View all <ChevronRight className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="mt-3 space-y-1">
                      {emails.map((email) => (
                        <div
                          key={email.subject}
                          className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-bg-surface/50"
                        >
                          <div className="relative">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-bg-surface-hover to-bg-surface" />
                            {email.unread && (
                              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg-surface bg-brand-blue" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className={`truncate text-sm ${email.unread ? 'font-medium text-ink' : 'text-ink-secondary'}`}>
                                {email.from}
                              </p>
                              <span className="shrink-0 text-[11px] text-ink-secondary">{email.time}</span>
                            </div>
                            <p className={`truncate text-sm ${email.unread ? 'text-ink' : 'text-ink-secondary'}`}>
                              {email.subject}
                            </p>
                            <p className="truncate text-[11px] text-ink-secondary">{email.preview}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-bg-primary/40 p-4">
                    <div className="flex items-center gap-2">
                      <Plug className="h-4 w-4 text-brand-cyan" />
                      <h4 className="font-display text-sm font-semibold text-ink">Connected</h4>
                    </div>
                    <div className="mt-3 space-y-2">
                      {connectedAccounts.map((acc) => {
                        const Icon = acc.icon;
                        return (
                          <div key={acc.name} className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-surface/40 p-2">
                            <Icon className="h-6 w-6" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-ink">{acc.name}</p>
                              <p className="truncate text-[10px] text-ink-secondary">{acc.status}</p>
                            </div>
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-success" />
                          </div>
                        );
                      })}
                    </div>
                    <button className="mt-2.5 w-full rounded-lg border border-dashed border-line py-2 text-[11px] text-ink-secondary transition-colors hover:border-brand-blue/40 hover:text-ink">
                      + Add account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
