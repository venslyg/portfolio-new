# VENSLY. — Code in Rhythm

Vensly Benaya's portfolio: full-stack software engineering meets music.

## Phase status

Phase 1 foundation implemented and locally verified. Vercel connection and the live preview are deferred at Vensly's request. Phase 2 has not started.

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
| `app/layout.tsx` | Shared document wrapper: HTML language, fonts, metadata, header, main landmark, and footer. `children` is the current page. |
| `app/page.tsx` | The `/` route. App Router maps folders and special `page.tsx` files to URLs. |
| `app/globals.css` | Tailwind import, shared CSS design tokens, typography, focus styling, and reduced-motion behavior. |
| `app/favicon.ico`, `app/icon.svg` | Temporary V monogram. Next.js file conventions generate icon metadata. |
| `components/layout/` | Container width/gutters, section spacing, and shared header/footer. |
| `components/ui/button.tsx` | Typed primary/secondary styling; renders a link for navigation or a native button for an action. |
| `public/` | Static files exposed from `/`; for example, `public/images/photo.webp` is `/images/photo.webp`. |
| `package.json`, `package-lock.json` | Scripts, runtime requirements, dependency declarations, and reproducible resolved versions. |
| `tsconfig.json` | Strict TypeScript checks and `@/*` imports mapped to the repository root. |
| `next.config.ts` | Existing Next.js/Turbopack and Tailwind loader settings. |

The existing root `app/` organization is retained, as permitted by the roadmap's incremental structure guidance and team rules. The proposed `src/` migration is unnecessary for this foundation; future components can grow beside `app/` without duplicate application trees.

TSX combines typed TypeScript logic with JSX markup. Component prop types catch invalid usage before deployment. `Container` and `Section` share layout decisions so pages do not independently drift in width or spacing.

Layouts and pages are Server Components by default. This shell needs no state or event handlers, so it adds no custom `use client` boundary. When a future menu or WebGL scene needs browser APIs, only that interactive component should become a Client Component. Hydration attaches client behavior to the HTML delivered by the server; a Client Component can still have an initial server-rendered HTML preview.

## Design foundation

- Background `#0B0C10`, surface `#191B24`, foreground `#F4F4F7`.
- Primary lilac `#A78BFA`; cyan `#67E8F9` for restrained accents and focus rings.
- Geist Sans for body/display; Geist Mono for small labels. The body now uses the configured font rather than overriding it with Arial.
- Content width: 72rem; horizontal gutters: 1.5rem on phones and 2.5rem above the small breakpoint.
- Section spacing: fluid 4–7rem; display type: fluid 2.75–6rem; controls: at least 44px tall.
- Dark mode only, visible keyboard focus, skip link, semantic landmarks, and reduced-motion support.

Navigation exposes only existing destinations. The minimal contact area clearly states that public details are forthcoming; no address, profile URL, resume, or form is invented. Work, Music Lab, About content, the full homepage, and 3D remain in later phases.

## Verification — 2026-10-27

- Node 24.21.0 was used through a temporary npm runtime; the global Node installation was not changed.
- `npm run lint`, `npm run typecheck` (`next typegen && tsc --noEmit`), and `npm run build` passed. The homepage is statically prerendered.
- The existing development server at `http://localhost:3000` returned the updated homepage successfully. A second dev process correctly refused to start alongside it; the existing process was preserved.
- Headless Microsoft Edge checked the production build at widths 320, 390, 768, and 1440px: no horizontal overflow, Geist applied, expected background, and navigation/CTA targets at least 44px high.
- Skip-link focus and activation, Tab order, keyboard contact navigation, internal anchor destinations, reduced-motion styling, metadata, icon responses, and default 404 response passed.
- The homepage and contact anchor worked with JavaScript disabled. No console errors or uncaught page errors were recorded.
- Phone and desktop screenshots were visually reviewed. Temporary QA script/screenshots are in ignored `.next/phase1-review.cjs` and `.next/phase1-{390,1440}.png`; rebuilding may remove them.
- Build warning: an unrelated `E:\package-lock.json` outside the repository is ignored by Next.js. This did not prevent compilation or serving.
- Not verified: Safari/Firefox, physical devices, assistive technology, or a Vercel deployment. These checks do not constitute the broader Phase 5 audit.

## GitHub and Vercel handoff (deferred)

The existing origin points to `venslyg/portfolio-new`. GitHub CLI authentication was invalid during implementation. The remote also contained an embedded credential: rotate it, use a credential manager, and replace the remote with a credential-free URL before sharing diagnostics. Never copy tokens into documentation or commits.

When deployment is requested:

1. Restore GitHub authentication and review the Phase 1 diff before committing/pushing to an appropriate branch.
2. Import the existing repository into the chosen Vercel account/team.
3. Select Next.js, the repository root, Node 24.x, and the existing build command. No environment variables are required.
4. Use a non-production branch for the preview; verify `/`, icons, typography, and keyboard navigation at mobile and desktop widths.
5. Record the verified preview URL and build result here. Production launch belongs to Phase 6.

Do not mark Phase 1's original live-preview acceptance gate complete until the deferred preview is verified. Do not begin Phase 2 without Vensly's approval.
