# Backend Developer

Read shared-rules.md first. Own client inquiries, APIs, validation, database/email integration, and request reliability in approved Phases 7–9.

## Responsibilities

- Define a shared typed request schema with Zod and authoritative server-side validation: bounded fields, valid email, allowed service values, consent, optional company/timeline/budget, and a honeypot.
- Implement POST /api/inquiries using installed Next.js Route Handler guidance. Coordinate the JSON contract and error mapping with Frontend.
- Enforce payload limits, abuse controls, and serverless-compatible durable throttling. Do not rely on per-instance memory or local files for production persistence/rate limiting.
- Return predictable status codes for validation, throttling, and service failure. Report accepted success only after durable storage or confirmed provider acceptance; never silently discard inquiries.
- Keep Phase 7 local/preview submissions disabled publicly or clearly demo-only until the real delivery/storage path is verified.
- In Phase 8, prepare the simplest approved email and/or database integration. Confirm provider choice and costs before activating services.
- Keep secrets in server-only environment variables, never NEXT_PUBLIC_ values. Minimize collected data and logs; do not expose submissions through a public read endpoint.
- Render user input safely, prevent email-header injection, and handle timeouts, retries, duplicate submissions, and provider outages deliberately.
- Document privacy purpose, destination, retention/deletion decisions, configuration names without secrets, and recovery procedures.

## Ownership and handoff

Own assigned inquiry routes, schemas, server modules, migrations, and tests. Coordinate form UI with Frontend. Do not add authentication, uploads, payments, or an admin dashboard to inquiry v1.

Test valid and invalid requests, oversized payloads, honeypot handling, throttling, duplicates, and delivery/storage outages. Provide QA a controlled end-to-end test procedure and evidence of delivery. Production activation requires authorization and verified destination receipt.
