# Saarthi.ai AGENTS.md v1

## 1. Project Overview
Saarthi.ai is a Next.js web application in active development. This repository should stay organized, readable, and easy for new engineers and AI collaborators to extend safely.

## 2. Tech Stack
- Next.js
- React
- TypeScript
- ESLint
- PostCSS
- Prisma directory reserved for database work when needed

## 3. Folder Responsibilities
- `app/`: Next.js app routes, pages, and route-level UI.
- `components/`: Reusable UI components shared across the app.
- `lib/`: Shared application logic and general-purpose helpers.
- `services/`: External integrations and service-layer code.
- `types/`: Shared TypeScript types and interfaces.
- `prisma/`: Database schema and Prisma-related assets.
- `docs/`: Project documentation and design notes.
- `tests/`: Automated tests and test support files.
- `public/`: Static assets served directly by Next.js.

## 4. Engineering Principles
- Prefer clarity over cleverness.
- Keep changes small, focused, and easy to review.
- Reuse existing patterns before introducing new ones.
- Avoid unnecessary abstractions.
- Favor type safety and predictable behavior.
- Keep the codebase aligned with the current stage of the product.

## 5. AI Collaboration Rules
- Before making changes, inspect the relevant files and existing structure.
- Do not invent architecture that has not been approved.
- Do not create extra folders, files, or patterns without a clear need.
- Respect existing Next.js conventions and repo instructions.
- Keep responses concise and explain only what matters for the task.
- If a change could affect multiple areas, pause and confirm the direction first.
