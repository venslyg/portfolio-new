# Shared team rules

## Scope and sources

- Follow the user's current instructions and root AGENTS.md. Use development-roadmap/development-roadmap.md as the phase and product source; README.md currently contains scaffold instructions.
- Read the relevant installed Next.js guides in node_modules/next/dist/docs/ before writing application code. Respect deprecations and inspect actual package versions and scripts.
- Inspect repository changes first. Preserve unrelated work and the generated Next.js instruction block.
- Work only within the authorized task or phase. Team setup does not approve any implementation phase. Stop at phase completion; Vensly approves progression.
- Frontend ships first in Phases 0–6. Do not add authentication, a database, CMS, or working inquiry submissions to that release. Backend starts only when requested in Phases 7–9.
- Current routes live in app/. The roadmap's src/ tree is a proposal; do not migrate or create empty folders merely to match it.

## Implementation

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
