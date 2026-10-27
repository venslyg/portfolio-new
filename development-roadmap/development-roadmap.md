VENSLY. — Code in Rhythm
Project: Vensly Benaya's interactive developer portfolio
Product direction: Professional full-stack engineering meets music and 3D interaction
Stack: Next.js App Router, TypeScript, Tailwind CSS, Three.js / React Three Fiber, Vercel
Status: Phase 3 implemented and verified locally; src/ directory structure established. Vercel remains deferred. Phase 4 awaits approval.
Last updated: 2026-10-27

1. Mission and release strategy
Build a modern, responsive, accessible portfolio that establishes Vensly as a full-stack software engineer and makes his passion for music memorable through a floating 3D keyboard/synthesizer. The site must be easy to navigate, credible to recruiters and clients, fast on mobile, and enjoyable to extend while learning both the frontend and backend of Next.js.

The release order is deliberate:
1. Frontend first (Phases 0–6): design, implement, test, and deploy the public portfolio to Vercel. No database, authentication, or functional contact API is required for this release.
2. Small backend second (Phases 7–9): implement a real client-project inquiry form and a secure Next.js API, then connect reliable storage and/or notifications. Only enable public submissions after the complete request-delivery path works.
3. Optional improvements later (Phase 10): content management, analytics, additional music experiments, and further case studies.
Deploy a minimal preview early in Phase 1, then formally launch the frontend at the end of Phase 6. A backend blocker must never prevent the initial frontend launch.
Success criteria
- Someone understands who Vensly is and what he builds within 5 seconds of opening the homepage.
- At least 3 meaningful projects are presented clearly, with accurate roles and technology stacks.
- The 3D keyboard is a delightful enhancement, not an obstacle to reading or navigation.
- The site is usable with keyboard navigation, on mobile, with reduced motion, and without WebGL.
- Frontend is live on Vercel before backend work begins.
- When the inquiry form launches, requests are validated, protected against routine abuse, and reliably delivered or stored.
- Each phase teaches a distinct set of Next.js or web-development concepts.
2. Product decisions and scope
Brand and visual system
Element	Decision
Wordmark	VENSLY.
Working tagline	Engineering ideas in rhythm. (editable copy)
Visual direction	Hybrid: minimal editorial layout + futuristic 3D musical centerpiece
Primary background	#0B0C10
Surface	#191B24
Primary accent	#A78BFA lilac
Secondary accent	#67E8F9 cyan, used sparingly
Main text	#F4F4F7
Typography	Geist or another readable sans for body; strong display headings; monospace only for small labels
Animation	Subtle, purposeful, reduced-motion aware; never auto-play audio
3D centerpiece	Stylized floating keyboard/synthesizer; mouse/touch response, softly illuminated keys


Design for dark mode first. A light theme is not part of the frontend MVP unless specifically requested.
Target audience
1. Recruiters and hiring managers: want strong skills, experience, project evidence, and contact information.
2. Potential software clients: want proof of problem-solving and a direct route to request work.
3. Developers and creative technologists: appreciate architecture, thoughtful interactions, and experiments.
Public content from the CV (verify before publishing)
- Name: G. Vensly Benaya; title: Full-Stack Software Engineer.
- Experience: full-stack developer at The Heaven's Code, following an internship there.
- Education: Diploma and Higher National Diploma in Software Engineering at NIBM.
- Personal projects to prioritize: Key Detective (Ionic/Angular and pitch detection), Agentry (Flutter/Firebase/SQLite), and the youth ministry website.
- Professional case-study candidates, subject to client/employer permission: Nehara Book Shop, Singha Hardware POS, PMB Traceability, and the parish family-book management system.
- Links: confirm GitHub and LinkedIn profile URLs from the CV before publishing.
Content safety rules: Never publish the CV's street address, personal phone number, referee contact details, GPA/exam grades, client secrets, screenshots, code, logos, or business metrics without approval. Do not fabricate outcomes, team ownership, performance numbers, testimonials, or project features. Prefer anonymized company projects if permission is unclear. Use a public-facing email or contact method approved by Vensly.
3. Information architecture and UX
Navigation
Home · Work · Music Lab · About · Contact with a persistent but unobtrusive header.
Routes
URL	Scope	Release
/	Homepage and primary portfolio narrative	Frontend MVP
/projects	Searchable or filterable project index; basic filters only if helpful	Frontend MVP
/projects/[slug]	Detailed case studies	Frontend MVP
/music	Keyboard interactive experience and Key Detective story	Frontend MVP
/about	Career journey, interests, approach and skills	Frontend MVP
/#contact	Contact links / clear CTA; no working form yet	Frontend MVP
/api/inquiries	POST endpoint for client project requests	Backend release
/not-found behavior	Useful custom 404 state	Frontend MVP


Homepage sections, in order
1. Header: wordmark, links, accessible mobile menu, prominent contact CTA.
2. Hero: title, two-sentence introduction, View Work / Contact actions, visual keyboard centerpiece (static preview until Phase 4).
3. Proof strip: selected technologies and concise professional positioning, not a wall of logos.
4. Featured projects: 3–4 strong cards with title, problem, personal contribution, stack and case-study link.
5. Music Lab teaser: Key Detective and a prompt to explore the interactive keyboard.
6. Experience timeline: The Heaven's Code and NIBM; emphasize career progression.
7. Skills / engineering approach: frontend, backend, mobile, database/tooling; how Vensly solves problems.
8. About preview: short personal statement combining engineering and music; About page link.
9. Contact CTA and footer: GitHub, LinkedIn, approved email/connection method, résumé download if approved.
Case-study template
Every featured project must use a consistent structure:

Overview → Problem → My role → Approach / architecture → Technologies → Screenshots or diagrams (approved only) → Outcome / lessons → Related project / contact CTA.

Project content starts in a local typed data module; do not install a CMS or database for the frontend MVP. Use real claims and a clearly marked placeholder when information is missing.
4. Technical architecture
Frontend MVP dependencies
- Next.js App Router + React + TypeScript for pages, layouts, metadata and typed data.
- Tailwind CSS for styling, plus CSS variables for design tokens.
- Three.js + @react-three/fiber + @react-three/drei for the keyboard in Phase 4 only; verify compatible versions during installation.
- Motion library only if necessary for a specific interaction. Begin with CSS transitions.
- Next.js built-in image/font optimization, metadata, and dynamic import/lazy-loading strategies.
Keep content-heavy pages and sections as Server Components by default. Put WebGL, pointer-driven scenes, stateful menus and other browser-only interaction into small Client Components. Do not turn the root layout into a Client Component just to host the keyboard.
Suggested folder structure (grow incrementally)
vensly-portfolio/
├── public/
│   ├── images/
│   └── models/                 # optional optimized 3D assets
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── music/page.tsx
│   │   ├── about/page.tsx
│   │   ├── not-found.tsx
│   │   └── api/inquiries/route.ts  # create only in Phase 7
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── projects/
│   │   ├── three/
│   │   └── ui/
│   ├── content/
│   │   ├── projects.ts
│   │   └── profile.ts
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── project.ts
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
This is a target structure, not a demand to create empty folders upfront. Future backend-specific modules may include lib/validation, lib/db, lib/rate-limit, and lib/email.
Project data model (frontend)
A project should include: slug, title, category, summary, role, stack, problem, approach, outcomeOrLearning, featured, coverImage (optional), gallery (optional), repoUrl (optional), liveUrl (optional), and visibility/permissionStatus. Omit unsupported or unpublished information in the UI. For external links, use safe link behavior and meaningful labels.
5. Phase-by-phase execution plan
PHASE 0 — Product groundwork and content approval
Goal: agree on scope, source content and release gates before adding complexity.

Tasks
- [ ] Confirm the website title, tagline, short bio, public contact channel, preferred résumé download, and profile links.
- [ ] Choose at least 3 featured projects; collect accurate role, problem, approach, and screenshot approval.
- [ ] Define desktop/mobile wireframes for hero, project cards, Music Lab teaser, and contact section.
- [ ] Lock the dark hybrid palette, responsive type scale, spacing, radii and motion principles.
- [ ] Confirm the 3D object is a keyboard/synthesizer, not a full 3D room.
- [ ] Record explicit non-goals: no auth, dashboard, database, blog, payments, analytics or contact submissions in frontend MVP.
Deliverables: approved content inventory, wireframe decisions and this updated plan.

Acceptance gate: Vensly approves the homepage structure and featured content; confidential items remain excluded.

Learning focus: product scoping, content modeling, and acceptance criteria.
PHASE 1 — Repository, Next.js scaffold, and design system
Goal: create a clean, understandable Next.js foundation.

Implementation note (2026-10-27): Local foundation and checks are complete. Existing root app/ and @/* alias retained per team rules instead of a src/ migration. Node 24 LTS is declared; checks ran on Node 24.21.0. Git and the GitHub origin already exist, but GitHub CLI authentication needs repair before future pushes. Vensly explicitly deferred connecting Vercel, so the original live-preview acceptance gate remains pending. See README.md for verification details. Phase 2 has not started.

Tasks
- [x] Verify existing Next.js App Router, TypeScript, ESLint, Tailwind, npm and @/* alias; retain root app/ organization. Declare and validate with Node 24 LTS.
- [x] Verify existing Git repository, sensible .gitignore, and existing venslyg/portfolio-new GitHub origin.
- [ ] Repair GitHub CLI authentication before future push operations.
- [x] Explain layout.tsx, page.tsx, globals.css, public, package.json and server/client rendering in README.md.
- [x] Implement global palette tokens, font setup, spacing and buttons.
- [x] Build minimal Container, Section, Button, Header, and Footer components only as needed.
- [x] Set title/description metadata and a temporary favicon; verify keyboard-only navigation.
- [x] Render and locally verify a basic homepage at mobile, tablet, and desktop widths.
- [ ] Create an early Vercel preview from the GitHub repo — deferred by Vensly.
- [x] Run lint, TypeScript checking and production build.
Deliverables: runnable repository, shared layout and live preview URL.

Acceptance gate: npm run dev works; preview builds; no TypeScript, lint or production-build errors; desktop/mobile shell is legible.

Learning focus: App Router, TSX, TypeScript, CSS tokens, source organization, Git and Vercel basics.
PHASE 2 — Complete responsive homepage UI (static)
Goal: establish a credible full homepage with placeholder keyboard art.

Implementation note (2026-10-27): Complete locally with component-per-folder organization, typed content, static synthesizer artwork, accessible mobile navigation, and approved email/social links. Lint, typecheck, build, responsive and keyboard checks passed; see README.md. Case-study pages remain Phase 3, 3D remains Phase 4, and Vercel is deferred. Owner review of copy/design is pending.

Tasks
- [x] Build responsive hero copy, CTAs and a polished static synthesizer preview.
- [x] Create mobile navigation and active/focus/hover states.
- [x] Build proof strip, featured project cards, Music Lab teaser, experience timeline, skills, about preview, and contact links.
- [x] Add simple CSS transitions only; avoid animation dependencies unless justified.
- [x] Use semantic landmarks (header, main, section, footer), accessible labels and adequate color contrast.
- [x] Keep user-facing copy concise and accurate. No fake progress bars or fake statistics.
- [x] Test at narrow phones, tablets and desktops; check text overflow and touch targets.
Deliverables: complete responsive landing page with working section navigation.

Acceptance gate: content is easy to scan without 3D; no horizontal scrolling at common mobile widths; no broken links; keyboard navigation works.

Learning focus: responsive Tailwind, reusable components, data-driven rendering, accessibility and CSS transitions.
PHASE 3 — Projects, case studies, About and Music pages
Goal: turn the landing page into a real portfolio, not just a hero animation.

Tasks
- [x] Create typed projects.ts content and project-specific components.
- [x] Build /projects overview with tags/categories; skip search until content volume justifies it.
- [x] Build dynamic /projects/[slug] routes using approved real project information.
- [x] Build /about with education, experience and a brief music/personal-interest section.
- [x] Build /music with Key Detective context and a reserved keyboard showcase area.
- [x] Add useful not-found states and related-project links.
- [x] Add descriptive metadata and appropriate image alt text per page.
- [x] Ask Vensly to review all project descriptions, attribution and screenshot permissions.
Deliverables: all primary pages navigable with substantive content.

Acceptance gate: each published project has an accurate role and technical story; dynamic URLs work; no unpublished client assets appear.

Learning focus: dynamic routes, TypeScript models, Server Components, metadata and page composition.
PHASE 4 — 3D keyboard experience and Music Lab
Goal: implement the signature creative feature without compromising usability.

Tasks
- [ ] Select compatible versions of three, @react-three/fiber, @react-three/drei and TypeScript types after checking official docs.
- [ ] Start with primitive geometries: body, white keys, black keys, lighting, materials and camera.
- [ ] Place scene in a dedicated Client Component and load it lazily with a visible static fallback.
- [ ] Add slow idle movement and pointer/touch response without trapping scrolling.
- [ ] Add accessible non-WebGL/low-performance fallback and respect prefers-reduced-motion.
- [ ] Give the scene an explicit pause/motion preference when appropriate.
- [ ] Keep the page understandable while assets load or when the canvas fails.
- [ ] Defer playable notes/Web Audio to a follow-on subtask only after graphics are stable; audio must start only after explicit user interaction.
- [ ] Test actual mobile hardware, resize behavior and GPU/battery impact.
Deliverables: functioning interactive keyboard in hero and/or Music Lab.

Acceptance gate: no rendering crashes or hydration errors; 3D does not block page content; motion and fallback behavior tested; build passes.

Learning focus: Client Components, WebGL basics, Three.js scene graph, camera, lighting, R3F hooks and performance tradeoffs.
PHASE 5 — Frontend production quality
Goal: make the entire frontend trustworthy, performant and accessible.

Tasks
- [ ] Mobile responsiveness and real-device checks; no overflow, clipped cards or unusable nav.
- [ ] Accessibility pass: landmarks, headings, links, focus states, alt text, contrast, reduced motion, screen-reader labels.
- [ ] Performance pass: optimize images, fonts, 3D asset size, lazy-loading and unnecessary client bundles.
- [ ] Add metadata, Open Graph image, canonical domain settings when known, robots.txt and sitemap where appropriate.
- [ ] Add favicon, footer details and polished 404.
- [ ] Run lint, typecheck, build, and a manual smoke-test matrix (Chrome, Firefox/Safari where available, desktop/mobile).
- [ ] Add focused automated tests if beneficial (e.g., navigation and route smoke tests); do not install a full test stack without need.
- [ ] Verify the site with JavaScript/3D reduced or disabled as applicable.
Deliverables: release candidate; documented known limitations and test results.

Acceptance gate: no major accessibility issues, broken links, console errors or broken layouts; key pages load promptly on mobile; production build is green.

Learning focus: QA, web vitals, technical SEO, performance and accessibility.
PHASE 6 — Frontend Vercel release (MILESTONE A)
Goal: launch the portfolio publicly before building the backend.

Tasks
- [ ] Push reviewed code to GitHub main; confirm any sensitive files are excluded.
- [ ] Connect GitHub repository to Vercel; configure production and preview branches.
- [ ] Verify the deployment domain, routes, assets and 3D fallback on the live URL.
- [ ] Configure a custom domain only if Vensly already owns/chooses one; otherwise use the Vercel domain.
- [ ] Confirm HTTPS, metadata, social sharing, responsive behavior and contact links.
- [ ] Document production URL, deployment steps, rollback process and known issues in README.
- [ ] Tag the release in Git as frontend-v1 after approval.
Deliverables: publicly accessible portfolio, GitHub repository, repeatable deployment process.

Acceptance gate: Vensly signs off on the live frontend; no client inquiry form implies requests are already being collected.

Learning focus: environments, CI/CD, production troubleshooting, preview deployments and release management.

STOP HERE until Vensly explicitly requests backend work.
PHASE 7 — Client inquiry form and Next.js API (local/preview)
Goal: learn the backend basics through one useful feature: clients can request software development work.

Request fields (proposed)
- Required: name, email, project/service type, project description, explicit consent to be contacted.
- Optional: company, preferred timeline, indicative budget range.
- Hidden: anti-bot honeypot field.
- No file uploads or payment details in v1. Never ask users for passwords or secrets.
Tasks
- [ ] Add Project Inquiry form UI and clear validation/confirmation/error states.
- [ ] Define a shared request schema using Zod (field lengths, valid email, allowed enum values).
- [ ] Implement POST /api/inquiries with App Router Route Handler and server-side validation.
- [ ] Return predictable JSON: accepted success (201), invalid input (400), rate limited (429) and generic server error (500).
- [ ] Add honeypot handling, payload size limits, basic rate-limiting plan and safe logging.
- [ ] Add unit tests for parsing/validation and handler responses.
- [ ] Keep public submission disabled or explicitly marked demo until Phase 8 can deliver/store the request durably; do not silently accept and discard inquiries.
Deliverables: functioning and tested backend endpoint in local or preview environment, wired to the form in test mode.

Acceptance gate: valid requests pass schema validation, invalid/spam requests fail safely, no credentials exposed, no fake success message for undelivered requests.

Learning focus: HTTP POST, Route Handlers, schemas, error handling, environment separation and async data flow.
PHASE 8 — Reliable request delivery, persistence and abuse prevention
Goal: make inquiry submission trustworthy enough for real clients.

Tasks
- [ ] Choose the simplest reliable production path: transactional email provider and/or managed PostgreSQL storage. Prefer both for recoverability if operating cost permits.
- [ ] If storing inquiries, define a minimal schema with ID, timestamps, contact details, project details, status; use Prisma or another well-supported database layer.
- [ ] Configure server-only credentials in .env.local and Vercel environment variables; never use NEXT_PUBLIC_ for secrets.
- [ ] Implement provider failure handling; success response only after durable store or confirmed provider acceptance.
- [ ] Add durable request throttling suitable for serverless deployments; do not depend on in-memory counters or local filesystem persistence.
- [ ] Validate again on the server; sanitize/display user-supplied text safely; do not trust frontend checks alone.
- [ ] Avoid sending full sensitive inquiry bodies into general logs or analytics.
- [ ] Add a short privacy notice covering collected fields, purpose, destination, retention, and contact method; determine deletion/retention policy with Vensly.
- [ ] Test provider/database unavailable scenarios and duplicate submissions.
Deliverables: fully working request delivery/storage with documented privacy and operational handling.

Acceptance gate: a test inquiry is received in the selected destination exactly as expected; failure is observable and handled; spam/abuse controls are checked.

Learning focus: persistence, external service integration, secret management, secure validation and serverless reliability.
PHASE 9 — Backend production launch (MILESTONE B)
Goal: enable the live inquiry form with confidence.

Tasks
- [ ] Set Production/Preview environment variables separately on Vercel.
- [ ] Run controlled end-to-end test submissions and verify delivery/storage.
- [ ] Confirm rate limiting, error handling, spam controls and user consent copy.
- [ ] Ensure no public endpoint exposes stored inquiries or user details.
- [ ] Add error monitoring/alerts appropriate for the project's scale; avoid collecting unnecessary personal data.
- [ ] Update README with operational test, troubleshooting and rollback instructions.
- [ ] Deploy, monitor the initial release, and tag backend-v1 after approval.
Deliverables: real, secure client-request intake on the live portfolio.

Acceptance gate: Vensly confirms successful end-to-end requests, delivery visibility and recovery procedure.

Learning focus: full-stack production, observability, security and operations.
PHASE 10 — Optional enhancements (not MVP commitments)
Choose each as a separately approved piece of work:
- [ ] Authenticated private admin dashboard to view and update inquiry statuses. No public access; enforce server-side authorization.
- [ ] Admin CRUD for portfolio projects if updating projects.ts becomes inconvenient.
- [ ] More Music Lab experiments: explicit opt-in Web Audio notes, pitch visualization, Key Detective deep dive.
- [ ] Light theme, blog/technical writing, multilingual content, analytics with privacy review.
- [ ] Additional accessibility and visual polish from real user feedback.
- [ ] New verified project case studies, recommendations and content updates.
6. Development and testing standards
Definition of done for every phase
1. Implement only the named phase and keep scope aligned with its acceptance gate.
2. Use small, understandable components and accurate TypeScript types; explain any non-obvious decision.
3. Run npm run build, npx tsc --noEmit, and ESLint (use existing npm run lint if configured, otherwise npx eslint .). Fix phase-related errors.
4. Test the relevant routes on mobile and desktop; run additional automated checks where established.
5. No secrets, test credentials, private references, personal addresses, or unapproved client information in code or commits.
6. Give Vensly a summary of changed files, screenshots or preview links where appropriate, commands run/results, learning notes, known limitations and next-phase prerequisites.
7. Update relevant README checkboxes/status, then STOP. Do not silently continue into the next phase.
Branching and release practices
- Prefer small phase/<number>-<topic> branches or equivalent isolated changes; use GitHub pull requests when possible.
- Keep main deployable. Confirm one phase before merging the next.
- Never overwrite unrelated local modifications or rewrite history without approval.
- Keep production and preview secrets isolated; .env.local must remain out of Git.
- Use stable dependency versions resolved by the package manager and commit the lockfile; review compatibility when adding 3D libraries.
- Treat client and personal data as untrusted; never put private server data in client bundles.
7. Recommended Codex agent team
For this project, one lead agent plus 3–4 specialist roles is plenty. They do not all need to work simultaneously.
Role	Owns	Activate
Lead / architect / teaching agent	Scope, phase boundaries, code review, architecture, learning explanations, integration	Every phase
UI / frontend agent	Next.js layouts, Tailwind, responsive UI, case studies, accessibility basics	Phases 1–3, 5
3D creative developer	R3F, keyboard geometry/materials, interactions, fallback and GPU performance	Phase 4
Backend / security agent	Inquiry API, Zod, database/email, privacy, rate limiting, tests	Phases 7–9
QA / deployment reviewer	Functional/regression checks, accessibility, mobile, performance, Vercel validation	Phases 5–6, 9


Lean alternative: start with a single Codex agent as lead + UI developer for Phases 0–3. Bring in a 3D specialist for Phase 4, then backend and QA specialists when needed. Vensly remains the product owner and approves each phase.

Coordination rules: assign one owner per changed file/feature; avoid agents editing the same files concurrently. The lead reviews the integration. Specialists report findings and patches, not assumptions about other agents' work. Never let a reviewer or agent activate a paid service, publish private content, or deploy production without explicit authorization.
8. Copy/paste prompts to run the project phase by phase
Reusable implementation prompt
Read README.md fully. Implement PHASE <N> only, following its goals,
tasks, acceptance gate, and the Definition of Done.

Before editing:
1. Inspect the repository and existing changes.
2. Tell me what the phase will change and what I will learn.
3. Identify unresolved product choices; ask only if truly blocking.

During implementation:
- Work incrementally with clear components and comments only where useful.
- Do not start future phases or add unrelated dependencies.
- Use real, approved content; do not invent project achievements.
- Keep the app runnable and accessible.

At completion:
- Run lint, TypeScript check, production build, and relevant tests.
- Report changed files, checks/results, design tradeoffs, and any limitations.
- Explain the important Next.js/frontend/backend concepts in plain language.
- Update README status and STOP. Wait for my permission for the next phase.
Example commands to the agent
Implement Phase 0 from README.md. Do not create application code yet.
Implement Phase 1 from README.md. Explain the Next.js project structure
and the new files as you go. Stop after the Vercel preview is verified.
Implement Phase 2 from README.md. Focus only on the responsive static UI.
Do not install Three.js or build the backend yet.
Implement Phase 4 from README.md. Create the 3D keyboard as a progressive
enhancement with static fallback and reduced-motion support.
Implement Phase 6 from README.md. Prepare the frontend production launch,
verify the live site, and stop. Do not implement client inquiries yet.
Implement Phase 7 from README.md. Build the inquiry form and API in
local/preview mode, but do not enable public submissions until delivery or
storage is implemented and verified.
9. Suggested schedule (part time, adjustable)
Phase	Rough effort	Outcome
0	1–2 sessions	Scope and content approved
1	2–3 sessions	Repository, design foundation, early preview
2	3–5 sessions	Responsive landing page
3	3–5 sessions	Projects and supporting pages
4	4–7 sessions	3D keyboard, fallback and Music Lab
5	2–4 sessions	QA and frontend optimization
6	1–2 sessions	Frontend live on Vercel
7	2–4 sessions	Inquiry form and test API
8	3–5 sessions	Reliable delivery/storage and abuse controls
9	1–2 sessions	Backend live


These are planning estimates, not deadlines. Prioritize learning and quality over speed. If the 3D scene becomes a blocker, ship the polished static frontend with the keyboard placeholder and finish the 3D enhancement in a later approved release.
10. Risks, decisions and guardrails
Risk	Mitigation
3D increases load time or breaks on devices	Client-only lazy loading, optimized assets, static fallback, reduced motion, device testing
Site looks impressive but lacks substance	Prioritize accurate case studies and clear professional positioning
Client project confidentiality	Request permission, anonymize when uncertain, never invent results
Backend submissions get lost	Do not enable the form until reliable storage/delivery is proven
Spam and unwanted automated requests	Honeypot, server-side validation, durable throttling and monitoring
Sensitive data leaks	Server-only environment variables, minimal logs, no public read API, retention plan
Scope creep from agent work	One phase per prompt, acceptance gates, mandatory stop and user approval
Paid services or deployment side effects	Discuss provider choice and costs before connecting; explicit production approval


11. Official references
- Next.js App Router installation and setup
- Next.js Server and Client Components
- Next.js Route Handlers
- Next.js production checklist
- React Three Fiber installation
- Vercel Git deployment guide
- Vercel environment variables
Current next step: Review Phase 2 copy and visual design. Phase 3 may begin only after Vensly approves it. Vercel connection remains deferred.
