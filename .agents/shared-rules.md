# Shared team rules

## Scope and sources

- Follow the user's current instructions and root AGENTS.md. Use development-roadmap/development-roadmap.md as the phase and product source; README.md documents the implemented architecture, setup, and verification.
- Read the relevant installed Next.js guides in node_modules/next/dist/docs/ before writing application code. Respect deprecations and inspect actual package versions and scripts.
- Inspect repository changes first. Preserve unrelated work and the generated Next.js instruction block.
- Work only within the authorized task or phase. Team setup does not approve any implementation phase. Stop at phase completion; Vensly approves progression.
- Frontend ships first in Phases 0–6. Do not add authentication, a database, CMS, or working inquiry submissions to that release. Backend starts only when requested in Phases 7–9.
- Current application code lives under src/ (e.g. src/app/, src/components/, src/content/, src/hooks/). Paths are aliased with @/* mapping to ./src/*.

## Implementation

- Give every independently named React component its own kebab-case folder and matching file, e.g. `src/components/layout/header/header.tsx`. Apply this to existing components when refactoring and to every new component.
- Next.js convention files such as `src/app/page.tsx` and `src/app/layout.tsx` stay in their required route locations and compose imported components.
- Import components explicitly from their own files at the point of composition. Keep route files and layouts focused on composing components; extract distinct sections and reusable UI instead of accumulating JSX in one file.
- Co-locate component-specific CSS Modules, tests, and private helpers in that component's folder when needed. Keep shared content in typed `content/` modules and reusable hooks in their own `hooks/<hook-name>/` folders. Do not create empty files or unnecessary barrel exports.
- Prioritize readability: descriptive names, short focused components, typed props, readable multiline markup, and explicit data flow. Keep global CSS for tokens and shared base styles; avoid unrelated component selectors there.

- Prefer small typed components and modules, Server Components for content, and narrow Client Component boundaries for browser interaction.
- Use Tailwind and shared CSS design tokens. Keep layouts responsive, semantic, keyboard accessible, and reduced-motion aware.
- Keep the portfolio usable without WebGL. Never autoplay audio.
- Add dependencies only when justified by the approved scope. Verify compatibility and update the npm lockfile with dependency changes.
- Assign one owner per file or feature. Agree on shared interfaces before implementation; do not edit shared files concurrently. Lead owns integration decisions.
- If delegation is requested and available, pass each specialist the shared rules, role guide, phase scope, and file ownership. Otherwise perform roles sequentially.

## Content and operations

- Use accurate, approved project claims and contact details. Mark missing information clearly; never fabricate achievements, metrics, testimonials, or ownership.
- Exclude private CV details, referee contacts, client secrets, and unapproved screenshots, logos, or case studies.
- Keep credentials server-only and out of Git, logs, and client bundles. Separate preview and production environment values.
- Do not activate paid services, publish private content, or deploy production without explicit authorization. Existing authorization need not be requested again; prepare a reviewable result before seeking missing approval.
- Preserve local work; do not rewrite history or perform destructive operations without authorization.

## Verification and completion

- For implementation phases run npm run lint, npx tsc --noEmit, and npm run build, plus focused tests appropriate to the changed behavior. Report failures or unavailable checks honestly.
- Check affected routes on mobile and desktop, keyboard navigation, focus visibility, loading/error states, and relevant reduced-motion/WebGL fallback behavior.
- Add meaningful tests for business logic and risky behavior; avoid tests that merely reproduce implementation details. Documentation-only edits need link/content and diff checks, not an application build.
- Report changed files, actual checks/results, limitations, architectural tradeoffs, and concise learning notes. Update relevant roadmap/README status only when evidence supports completion; do not mark product approval as granted.
