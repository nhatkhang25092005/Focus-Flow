---
name: frontend-development
description: Use this skill when implementing, refactoring, debugging, or reviewing frontend code in the FocusFlow React application. Do not use for backend-only tasks.
---

# Frontend Development

## Context

Before working on frontend code:

- Read `.aios/context/PROJECT.md`.
- Inspect the existing frontend structure and nearby components before making changes.
- Follow existing project conventions unless there is a strong reason to change them.

## Stack

- React
- TypeScript
- Vite
- React Hook Form
- Zod
- Tailwind CSS
- clsx
- React Router DOM
- Redux Toolkit
- Axios
- Vitest
- i18next

## Development Rules

### React

- Use functional components and hooks.
- Keep components focused on one responsibility.
- Avoid deeply nested components; break them into smaller components when appropriate.
- Custom hook is preferred to handle the business logic of a component.
- If a component is only used in one place, it can be defined in the same file as its parent component.
- If code is not too long (< 50 lines), it can be defined in the same file as its parent component.
- Prefer reusable components when behavior is actually shared.
- Do not introduce unnecessary abstractions.
- Avoid unnecessary re-renders and derived state.

### TypeScript

- Prefer explicit, meaningful types.
- Avoid `any`.
- Reuse existing types where appropriate.
- Do not duplicate domain types unnecessarily.
- The shared types must be defined in the `src/shared/types.ts` file and imported from there.

### State

- Use local state for component-specific state.
- Use Redux Toolkit only for state that must be shared across multiple parts of the application.
- Do not move state to Redux without a clear reason.
- If the state needs to passed down too deeply to child components, but it is not the global application state - only the component-specific or logic state-then use the React Context rather than Redux.

### Forms

- Use React Hook Form for form state.
- Use Zod for schema validation.
- Keep validation rules centralized in schemas where possible.
- Keep the schemas close to the one that uses them, but not inside the component file.
- Display validation errors through existing shared input components.

### Adding and using UI components
- There are the custom UI components such as popup, toast, loading,... used to display the result or process of API calls
- To learn how to use these component properly, take a look at src/ui/component.
- Do not modify any of these components. If a change is necessary for a specific reason, ask me first before making any changes
- These component are called through service layer, so other components or hooks can use directly

### API

- Use Axios through the project's existing API/service layer.
- Do not call APIs directly inside UI components if a service abstraction already exists.
- Handle loading and error states consistently with the existing application.

### Styling

- Use Tailwind CSS.
- Use `clsx` or existing class utilities for conditional classes.
- Follow existing responsive design conventions.
- Avoid unnecessary inline styles.
- Keep className items organized and readable, around five class per line, and grouped by type (layout, spacing, typography, color, etc.) when possible.

### i18n

- Use i18next for user-facing text where the project already supports localization.
- Avoid introducing hard-coded user-facing strings when a translation key should be used.
- The language folder is src/i18n/locales

## Testing

When changing frontend behavior:

- Update or add Vitest tests when appropriate.
- Test user-observable behavior rather than implementation details.
- Run the relevant frontend tests after changes.

## Workflow

For each frontend task:

1. Understand the requested behavior.
2. Inspect related existing code.
3. Identify the smallest reasonable change.
4. Implement using existing project patterns.
5. Run relevant tests, linting, and type checking defined by the project.
6. Review the diff for unnecessary changes.
7. Report what changed and any remaining concerns.

## Do Not

- Do not modify backend code.
- Do not install new dependencies.
- Do not rewrite unrelated code.
- Do not change existing architecture only for stylistic preference.
- Do not silently weaken TypeScript types or validation.