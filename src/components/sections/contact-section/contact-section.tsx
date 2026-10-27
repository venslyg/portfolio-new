'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { profile } from '@/content/profile';

import { SignalBeacon } from '@/components/three/signal-beacon/signal-beacon';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }

  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-border/80 bg-surface/20">
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

        {/* ================= MAIN INTERACTIVE CONTACT CARD ================= */}
        <div className="mt-12 rounded-3xl border border-border/80 bg-gradient-to-b from-surface/80 via-surface/40 to-background/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            {/* Left: Email Action Hub */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <p className="font-mono text-xs tracking-wider text-accent uppercase">
                    Direct Email Communication
                  </p>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {profile.email}
                </h3>

                <p className="mt-2 text-xs text-muted sm:text-sm">
                  Click below to open your preferred mail client or copy the address directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-accent px-6 text-sm font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span>Send an Email</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-control border px-5 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
                    copied
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                      : 'border-border bg-surface text-foreground hover:border-accent hover:bg-surface/80'
                  }`}
                  aria-label="Copy email address to clipboard"
                >
                  <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Address'}</span>
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-muted/70">
                <span className="h-2 w-2 rounded-full bg-accent-secondary" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>

            {/* Right: Social & Professional Connect Cards */}
            <div className="flex flex-col gap-4 border-t border-border/60 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">
                Professional Networks
              </p>

              {/* GitHub Card */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/80 bg-surface/50 p-4 transition-all duration-300 hover:border-accent hover:bg-surface hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-accent">
                      GitHub
                    </h4>
                    <p className="font-mono text-xs text-muted">@venslyg</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              {/* LinkedIn Card */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/80 bg-surface/50 p-4 transition-all duration-300 hover:border-accent hover:bg-surface hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-accent">
                      LinkedIn
                    </h4>
                    <p className="font-mono text-xs text-muted">Vensly Gunasekara</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-accent transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Discussion Topic Starters */}
          <div className="mt-8 border-t border-border/60 pt-6">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              Areas of Discussion & Collaboration
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border bg-surface/80 px-3.5 py-1.5 font-mono text-muted">
                🌐 Full-Stack Architecture
              </span>
              <span className="rounded-full border border-border bg-surface/80 px-3.5 py-1.5 font-mono text-muted">
                📱 Cross-Platform Mobile Apps
              </span>
              <span className="rounded-full border border-border bg-surface/80 px-3.5 py-1.5 font-mono text-muted">
                🎵 Music Tech & Web Audio
              </span>
              <span className="rounded-full border border-border bg-surface/80 px-3.5 py-1.5 font-mono text-muted">
                ⚡ Backend APIs & PostgreSQL
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
