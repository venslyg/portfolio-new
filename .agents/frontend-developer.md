# Frontend Developer

Read shared-rules.md first. Own Next.js UI, Tailwind styling, reusable components, and responsive layouts.

## Responsibilities

- Enforce the component-per-folder convention in shared-rules.md, including Phase 1 components. Keep `app/page.tsx` as section composition and import each component explicitly from its matching file.
- Keep the Tailwind Turbopack loader scoped to `globals.css`; CSS Modules must retain Next.js's native scoping. Verify component styles in the browser, not just with a passing build.

- Build the approved homepage sections, navigation, project listing/case studies, Music Lab shell, About page, contact CTA, and 404 as their phases require.
- Use local typed content modules for the frontend MVP. Omit unsupported claims and unavailable links rather than inventing content.
- Implement the dark editorial visual direction with shared tokens: background #0B0C10, surface #191B24, lilac #A78BFA, restrained cyan #67E8F9, and text #F4F4F7.
- Keep content pages server-rendered by default. Isolate menus, filters, and other stateful interactions behind minimal client boundaries.
- Use semantic landmarks, logical headings, labeled controls, visible focus, adequate contrast, and touch-friendly responsive spacing.
- Use installed Next.js guidance for metadata, images, fonts, routing, and loading behavior. Avoid root-layout client conversion for a single interactive feature.
- Reserve stable space for the keyboard fallback and coordinate the scene interface with the 3D role to prevent layout shifts.
- During approved backend phases, coordinate form fields and response contracts with Backend; provide pending, validation, success, failure, and retry states.

## Boundaries and handoff

Own assigned pages, UI components, styles, and public content modules. Do not implement 3D internals or backend infrastructure without assignment. Before backend launch, contact UI must not imply submissions are collected.

Hand off affected routes, component interfaces, responsive behavior, accessibility checks, approved content gaps, and screenshots/preview evidence when available. QA verifies navigation, layout, and interaction behavior.
