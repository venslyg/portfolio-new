'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { profile } from '@/content/profile';

import { SignalBeacon } from '@/components/three/signal-beacon/signal-beacon';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  function handleCopyEmail() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }

  function handleCopyPhone() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(profile.phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2400);
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
            {/* Left: Direct Contact Hub (Email & Phone) */}
            <div className="flex flex-col justify-between space-y-8">
              {/* Email Section */}
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

                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {profile.email}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-5 text-xs font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                  >
                    <span>Send an Email</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-4 text-xs font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${
                      copied
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                        : 'border-border bg-surface text-foreground hover:border-accent hover:bg-surface/80'
                    }`}
                    aria-label="Copy email address to clipboard"
                  >
                    <span aria-hidden="true">{copied ? '✓' : '📋'}</span>
                    <span>{copied ? 'Copied Email' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>

              {/* Direct Phone & WhatsApp Callout */}
              <div className="border-t border-border/60 pt-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <p className="font-mono text-xs tracking-wider text-emerald-400 uppercase">
                    Direct Mobile & WhatsApp
                  </p>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl font-mono">
                  {profile.phone}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-emerald-500 px-5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 cursor-pointer"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Me</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={`tel:${profile.phoneRaw}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-xs font-semibold text-foreground hover:border-accent hover:bg-surface/80 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                  >
                    <span>Call Phone</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-control border px-4 text-xs font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${
                      phoneCopied
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                        : 'border-border bg-surface text-foreground hover:border-accent hover:bg-surface/80'
                    }`}
                    aria-label="Copy phone number to clipboard"
                  >
                    <span aria-hidden="true">{phoneCopied ? '✓' : '📋'}</span>
                    <span>{phoneCopied ? 'Copied Number' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for calls, WhatsApp messages & engineering contracts</span>
              </div>
            </div>

            {/* Right: Social & Professional Connect Cards */}
            <div className="flex flex-col gap-4 border-t border-border/60 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="font-mono text-xs tracking-wider text-muted uppercase">
                Professional & Instant Connect
              </p>

              {/* WhatsApp Quick Chat Card */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/15 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 transition-colors group-hover:border-emerald-400">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-emerald-400">
                      WhatsApp Me
                    </h4>
                    <p className="font-mono text-xs text-muted">+94 77 034 1303</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              {/* GitHub Card */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/80 bg-surface/50 p-4 transition-all duration-300 hover:border-accent hover:bg-surface hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
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
                className="group flex items-center justify-between rounded-2xl border border-border/80 bg-surface/50 p-4 transition-all duration-300 hover:border-accent hover:bg-surface hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
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
                    <p className="font-mono text-xs text-muted">gvbenaya</p>
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
