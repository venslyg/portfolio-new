# VENSLY. — Code in Rhythm

Vensly Benaya's portfolio: full-stack software engineering meets music.

## Phase status

Phase 2 is implemented and locally verified, including the Phase 1 component-folder refactor. Vercel connection and the live preview remain deferred at Vensly's request. Phase 3 has not started.

- [x] Existing Next.js App Router, TypeScript, ESLint, Tailwind, npm, and `@/*` alias retained.
- [x] Node 24 LTS declared in `.nvmrc` and `package.json`.
- [x] Git repository and existing `venslyg/portfolio-new` origin identified.
- [x] Dark palette, Geist fonts, fluid typography, spacing, and button variants.
- [x] Shared Container, Section, Button, Header, and Footer.
- [x] Minimal homepage, metadata, branded temporary favicon, and keyboard focus/skip-link styles.
- [x] Local lint, typecheck, production build, and responsive/browser verification.
- [ ] GitHub authentication repaired before future push operations.
- [ ] Vercel connection and verified preview URL — deferred by the owner.

The detailed scope and acceptance gates live in [the development roadmap](development-roadmap/development-roadmap.md). Role instructions live in [.agents](.agents/README.md).

## Run locally

Use Node **24.x LTS** and npm. With a compatible Node version manager, select the version in `.nvmrc` first. The existing machine-wide Node 20 installation is not the project's target runtime.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or external services are needed. `next/font/google` downloads Geist during the first build and serves it locally to visitors; the build environment needs access to the font host.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

`typecheck` generates Next.js route types before running `tsc --noEmit`, so it also works on a fresh checkout. After type generation, `npx tsc --noEmit` can run directly. The production build does not replace the separate ESLint check.

## Structure and Next.js concepts

| File/directory | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Shared document wrapper: HTML language, fonts, metadata, header, main landmark, and footer. `children` is the current page. |
| `src/app/page.tsx` | The `/` route. App Router maps folders and special `page.tsx` files to URLs. |
| `src/app/globals.css` | Tailwind import, shared CSS design tokens, typography, focus styling, and reduced-motion behavior. |
| `src/app/favicon.ico`, `src/app/icon.svg` | Temporary V monogram. Next.js file conventions generate icon metadata. |
| `src/components/layout/` | Container width/gutters, section spacing, and shared header/footer. |
| `src/components/ui/button/button.tsx` | Typed primary/secondary styling; renders a link for navigation or a native button for an action. |
| `src/components/visuals/` | 3D Synthesizer with Three.js/R3F, WebGL progressive fallback, and lazy Web Audio synthesis. |
| `public/` | Static files exposed from `/`; for example, `public/images/photo.webp` is `/images/photo.webp`. |
| `package.json`, `package-lock.json` | Scripts, runtime requirements, dependency declarations, and reproducible resolved versions. |
| `tsconfig.json` | Strict TypeScript checks and `@/*` imports mapped to `./src/*`. |
| `next.config.ts` | Next.js/Turbopack settings. The Tailwind loader applies to `**/globals.css`, preserving native CSS Module scoping. |

The application code is organized cleanly under `src/` (`src/app/`, `src/components/`, `src/content/`, `src/hooks/`), cleanly isolating application source from root repository configuration and agent guides. Paths are mapped via the `@/*` alias to `./src/*`.

TSX combines typed TypeScript logic with JSX markup. Component prop types catch invalid usage before deployment. `Container` and `Section` share layout decisions so pages do not independently drift in width or spacing.

Layouts and pages are Server Components by default. The homepage sections, artwork, header wrapper, and footer stay on the server. Only navigation needs a client boundary for active-section tracking and mobile-menu focus behavior. Native details/summary keeps the menu usable without JavaScript. Hydration attaches interactive behavior to the initial server-rendered HTML.

## Design foundation

- Background `#0B0C10`, surface `#191B24`, foreground `#F4F4F7`.
- Primary lilac `#A78BFA`; cyan `#67E8F9` for restrained accents and focus rings.
- Geist Sans for body/display; Geist Mono for small labels. The body now uses the configured font rather than overriding it with Arial.
- Content width: 72rem; horizontal gutters: 1.5rem on phones and 2.5rem above the small breakpoint.
- Section spacing: fluid 4–7rem; display type: fluid 2.75–4.75rem; controls: at least 44px tall.
- Dark mode only, visible keyboard focus, skip link, semantic landmarks, and reduced-motion support.

Navigation links to existing homepage sections. Email display was explicitly approved; GitHub and LinkedIn links were checked against the supplied CV. Only personal projects are featured, with abstract artwork rather than claimed application screenshots. Full case studies are clearly marked as forthcoming. No CV download, private CV details, client project assets, or contact form were added. Standalone pages belong to Phase 3 and WebGL to Phase 4.

## Phase 1 verification — 2026-10-27

- Node 24.21.0 was used through a temporary npm runtime; the global Node installation was not changed.
- `npm run lint`, `npm run typecheck` (`next typegen && tsc --noEmit`), and `npm run build` passed. The homepage is statically prerendered.
- The existing development server at `http://localhost:3000` returned the updated homepage successfully. A second dev process correctly refused to start alongside it; the existing process was preserved.
- Headless Microsoft Edge checked the production build at widths 320, 390, 768, and 1440px: no horizontal overflow, Geist applied, expected background, and navigation/CTA targets at least 44px high.
- Skip-link focus and activation, Tab order, keyboard contact navigation, internal anchor destinations, reduced-motion styling, metadata, icon responses, and default 404 response passed.
- The homepage and contact anchor worked with JavaScript disabled. No console errors or uncaught page errors were recorded.
- Phone and desktop screenshots were visually reviewed. Temporary QA script/screenshots are in ignored `.next/phase1-review.cjs` and `.next/phase1-{390,1440}.png`; rebuilding may remove them.
- Build warning: an unrelated `E:\package-lock.json` outside the repository is ignored by Next.js. This did not prevent compilation or serving.
- Not verified: Safari/Firefox, physical devices, assistive technology, or a Vercel deployment. These checks do not constitute the broader Phase 5 audit.

## Phase 2 structure and conventions

Each independent component has its own folder and matching filename. Import the component explicitly; avoid unnecessary barrel exports. Keep route files focused on composition, shared content in typed modules, and component-specific CSS beside its component. This is required by AGENTS.md and the shared team rules.

```text
app/page.tsx                         # composes the homepage sections
components/
  layout/
    header/header.tsx
    footer/footer.tsx
    container/container.tsx
    section/section.tsx
    navigation/navigation.tsx
    navigation-links/navigation-links.tsx
    mobile-navigation/
      mobile-navigation.tsx
      mobile-navigation.module.css
  sections/
    hero-section/hero-section.tsx
    proof-strip/proof-strip.tsx
    featured-work-section/featured-work-section.tsx
    music-lab-section/music-lab-section.tsx
    experience-section/experience-section.tsx
    skills-section/skills-section.tsx
    about-section/about-section.tsx
    contact-section/contact-section.tsx
  projects/
    project-card/project-card.tsx
    project-artwork/                  # component + scoped styles
  visuals/
    synthesizer-preview/              # static artwork + scoped styles
  ui/
    button/button.tsx
    section-heading/section-heading.tsx
content/
  navigation.ts                      # shared section IDs and labels
  profile.ts                         # approved contact, experience, skills
  featured-projects.ts               # typed homepage summaries, not case-study routes
hooks/
  use-active-section/use-active-section.ts
```

Phase 1's five components were moved into this convention and all imports updated. Sections reuse layout primitives and SectionHeading; ProjectCard receives typed data. The synthesizer is static HTML/CSS/SVG with no Three.js, audio, animation package, or new runtime dependency. CSS Modules keep artwork/menu styles local; Tailwind handles the page layout and shared tokens.

The active-section hook uses a passive scroll listener scheduled through requestAnimationFrame and cleans up listeners on unmount. The mobile menu closes on selection, moves focus to the destination, and returns focus to its summary on Escape. Section scroll margins account for the sticky header.

## Phase 2 verification — 2026-10-27

- [x] Phase 1 component-per-folder refactor and explicit imports.
- [x] Responsive hero, static synthesizer, and working CTAs.
- [x] Sticky navigation, native mobile disclosure, active/focus/hover states.
- [x] Technology strip, three personal project cards, Music Lab, timeline, skills, About, contact, and footer.
- [x] Approved email and CV-sourced GitHub/LinkedIn links; no invented case-study URLs.
- [x] Lint, typecheck (`next typegen && tsc --noEmit`), and production build passed using Node 24.
- [x] Headless Edge checks passed at 320, 390, 768, 1024, and 1440px: no horizontal overflow, visible links at least 44px tall, section links resolve.
- [x] Skip link, desktop navigation, active section, mobile keyboard opening, Escape focus return, selection dismissal, and sticky-header clearance.
- [x] CSS Module application checked explicitly for keyboard artwork, cards, and menu positioning after fixing the scaffold's broad Tailwind loader rule.
- [x] 200% text at 320px, reduced motion, and no-JavaScript mobile navigation.
- [x] Production screenshots reviewed, development homepage verified, and no console/hydration errors recorded.
- [x] Rendered page excludes private CV details and any CV download link. The existing public/CV file itself was not modified; review/redact it before deployment.
- [ ] Owner review of copy and visual design.
- [ ] Physical devices, Safari/Firefox, and a full assistive-technology audit (broader Phase 5 work).

Temporary screenshots and the result report are in ignored `.next/phase2-*.png` and `.next/phase2-results.json`; builds can remove them. The existing warning about an unrelated `E:\package-lock.json` remains harmless. Vercel is still deferred. Stop here: Phase 3 requires approval.
## GitHub and Vercel handoff (deferred)

The existing origin points to `venslyg/portfolio-new`. GitHub CLI authentication was invalid during implementation. The remote also contained an embedded credential: rotate it, use a credential manager, and replace the remote with a credential-free URL before sharing diagnostics. Never copy tokens into documentation or commits.

When deployment is requested:

1. Restore GitHub authentication and review the Phase 1 diff before committing/pushing to an appropriate branch.
2. Import the existing repository into the chosen Vercel account/team.
3. Select Next.js, the repository root, Node 24.x, and the existing build command. No environment variables are required.
4. Use a non-production branch for the preview; verify `/`, icons, typography, and keyboard navigation at mobile and desktop widths.
5. Record the verified preview URL and build result here. Production launch belongs to Phase 6.

Do not mark Phase 1's original live-preview acceptance gate complete until the deferred preview is verified. Phase 2 was authorized and implemented. Do not begin Phase 3 without Vensly's approval.
