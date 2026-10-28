import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/header/header';
import { Footer } from '@/components/layout/footer/footer';
import { GlowingCursor } from '@/components/ui/glowing-cursor/glowing-cursor';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vensly.dev'),
  title: {
    default: 'VENSLY Portfolio',
    template: '%s | VENSLY.',
  },
  description:
    "Vensly Gunasekara's developer portfolio. Full-stack software engineering, thoughtful interfaces, and creative explorations inspired by music.",
  keywords: [
    'Vensly Gunasekara',
    'Full-Stack Software Engineer',
    'Angular',
    'Spring Boot',
    'Flutter',
    'React',
    'Next.js',
    'TypeScript',
    'Creative Technologist',
    'Web Audio',
  ],
  authors: [{ name: 'Vensly Gunasekara', url: 'https://github.com/venslyg' }],
  creator: 'Vensly Gunasekara',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Vensly Portfolio',
    title: 'Vensly Portfolio',
    description:
      "Full-stack software engineer crafting thoughtful web applications, cross-platform mobile tools, and creative music experiments.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VENSLY. — Engineering ideas in rhythm',
    description:
      "Full-stack software engineer crafting thoughtful web applications, cross-platform mobile tools, and creative music experiments.",
    creator: '@venslyg',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <GlowingCursor />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
