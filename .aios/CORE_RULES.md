# FocusFlow AI Core Rules

## General

- Inspect existing code before making changes.
- Do not modify unrelated files.
- Prefer the smallest change that satisfies the requirement.
- Do not introduce a new dependency without justification.
- Do not invent business requirements.
- Explicitly state assumptions.

## Architecture

- Follow the existing FocusFlow architecture.
- Do not bypass service layers to access repositories directly.
- Do not move business logic into controllers.
- Do not expose database entities directly through API responses.

## Backend

- Backend uses Spring Boot.
- Request validation belongs in DTO validation where appropriate.
- Business logic belongs in services.
- Persistence logic belongs in repositories.
- Reuse the project's existing exception handling mechanism.

## Frontend

- Frontend uses React + TypeScript.
- Avoid `any`.
- Reuse existing shared components when possible.
- Separate form/business logic from presentation when appropriate.

## Security

Authentication-related code is security critical.

When modifying:
- login
- registration
- JWT
- refresh token
- password reset
- email verification

the agent must perform a security review after implementation.

Never:
- expose passwords or tokens in logs
- weaken validation just to make a test pass
- store secrets in source code

## Before implementation

1. Understand the requirement.
2. Inspect related code.
3. Identify affected files.
4. Propose an implementation plan.
5. Identify risks.

## After implementation

1. Run relevant tests.
2. Review changed code.
3. Check for regressions.
4. Report files changed.
5. Report anything that could not be verified.