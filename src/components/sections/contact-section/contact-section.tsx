'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { profile } from '@/content/profile';
import { SignalBeacon } from '@/components/three/signal-beacon/signal-beacon';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  function handleCopyEmail() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  }

  function handleCopyPhone() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }
  }

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: profile.whatsapp,
      label: '+94 77 034 1303',
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      hoverBorder: 'hover:border-emerald-400',
      hoverText: 'hover:text-emerald-400',
      hoverGlow: 'hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)]',
    },
    {
      name: 'GitHub',
      href: profile.github,
      label: '@venslyg',
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
      hoverBorder: 'hover:border-accent',
      hoverText: 'hover:text-accent',
      hoverGlow: 'hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)]',
    },
    {
      name: 'LinkedIn',
      href: profile.linkedin,
      label: 'gvbenaya',
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      hoverBorder: 'hover:border-accent-secondary',
      hoverText: 'hover:text-accent-secondary',
      hoverGlow: 'hover:shadow-[0_4px_20px_rgba(103,232,249,0.25)]',
    },
    {
      name: 'Email',
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      hoverBorder: 'hover:border-accent',
      hoverText: 'hover:text-accent',
      hoverGlow: 'hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)]',
    },
  ];

  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-white/[0.08] bg-white/[0.01] backdrop-blur-md">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex-1">
            <SectionHeading
              id="contact-heading"
              eyebrow="06 // Get in touch"
              title="Have an idea? Let’s compose something great."
              description="Whether you have an upcoming project, an engineering role, or a conversation about software and audio tech, my inbox is open."
            />
          </div>
          <div className="hidden sm:flex shrink-0 items-center justify-center">
            <SignalBeacon />
          </div>
        </div>

        {/* Minimalist, Clean Contact Card */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 lg:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Primary Details: Email & Phone */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <p className="font-mono text-xs tracking-wider text-muted uppercase">Email</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-lg sm:text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-xs text-muted hover:border-accent hover:text-accent hover:bg-white/[0.1] transition-all cursor-pointer"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="font-mono text-xs tracking-wider text-muted uppercase">Phone / WhatsApp</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <a
                    href={`tel:${profile.phoneRaw}`}
                    className="font-mono text-lg sm:text-2xl font-bold tracking-tight text-foreground hover:text-emerald-400 transition-colors"
                  >
                    {profile.phone}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-xs text-muted hover:border-emerald-400 hover:text-emerald-400 hover:bg-white/[0.1] transition-all cursor-pointer"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center gap-2 text-xs font-mono text-muted/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span>Available for calls, WhatsApp messages & engineering contracts</span>
              </div>
            </div>

            {/* Quick Connect Icons */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">Connect</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 ${link.hoverBorder} ${link.hoverText} ${link.hoverGlow} hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer`}
                    title={`${link.name}: ${link.label}`}
                    aria-label={`${link.name}: ${link.label}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
