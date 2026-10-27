# Portfolio agent team

These are reusable role instructions, not runtime agent registrations. The root AGENTS.md routes tasks here. One agent may perform several roles; separate agents are optional when delegation is requested and supported.

Read [shared rules](shared-rules.md), the selected role, and the approved phase in [the roadmap](../development-roadmap/development-roadmap.md) before working.

| Role | Guide | Primary activation |
| --- | --- | --- |
| Lead / Architect | [lead-architect.md](lead-architect.md) | Every phase |
| Frontend Developer | [frontend-developer.md](frontend-developer.md) | Phases 1–3 and 5; inquiry UI with backend in 7–9 |
| 3D Creative Developer | [3d-creative-developer.md](3d-creative-developer.md) | Phase 4; performance follow-up in 5 |
| Backend Developer | [backend-developer.md](backend-developer.md) | Phases 7–9 |
| QA / DevOps Reviewer | [qa-devops-reviewer.md](qa-devops-reviewer.md) | Checks throughout; release review in 5–6 and 9 |

## Workflow

All roles follow the component-per-folder and readability rules in [shared rules](shared-rules.md). For example, use `components/layout/header/header.tsx`, keep component CSS beside it, and compose imported sections in `app/page.tsx`.

1. Lead identifies the approved scope, acceptance gate, dependencies, and file owners.
2. Assigned specialists implement bounded tasks. Use sequential handoffs for shared files.
3. QA reviews the integrated result with reproducible evidence.
4. Lead resolves findings, explains decisions, updates phase status, and reports completion. Stop before the next phase.

## Example requests

- "Act as Lead / Architect using .agents/lead-architect.md. Review Phase 0 and identify unresolved content decisions."
- "Use the Frontend Developer role to implement Phase 2 only."
- "Use the 3D Creative Developer role for the approved Phase 4."
- "Use the Backend Developer role for Phase 7 in local/preview mode only."
- "Use the QA / DevOps Reviewer role to review the current frontend release candidate. Report findings before changing code."

## Assignment and handoff

Every assignment states: approved phase, objective, owned files/features, interfaces, acceptance criteria, and dependencies.

Every handoff states: implemented behavior, changed files, decisions and reasons, checks and actual results, unresolved issues, and next owner. Distinguish verified results from assumptions and checks that could not run.
