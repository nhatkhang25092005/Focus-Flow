---
name: backend-development
description: Implement, refactor, debug, test, or review backend code in the FocusFlow Spring Boot application. Use for controllers, DTOs, services, repositories, entities, validation, authentication, authorization, persistence, email, and backend tests. Do not use for frontend-only tasks.
---

# Backend Development

## Context

Before changing backend code:

- Read `.aios/PROMPT.md` and `.aios/context/PROJECT.md`.
- Read the relevant requirements, design documents, and test cases.
- Inspect the existing backend structure and nearby implementations.
- Follow established project conventions unless there is a strong reason to change them.
- Do not modify unrelated code.
- Do not add dependencies unless the task requires them.

When the request starts with **"How to"**, explain the concept and provide isolated examples. Do not modify project files unless explicitly requested.

## Stack

### Core technology stack

- Java 21
- Spring Boot 4.0.6
- Spring Web MVC
- Spring Data JPA
- Hibernate ORM
- PostgreSQL
- Spring Security
- JWT Authentication with JJWT
- Jakarta Bean Validation
- Spring Mail
- Maven

### Development and testing tools

- Lombok
- JUnit
- Spring Boot Test
- JaCoCo
- Spring Boot DevTools

## Investigation Workflow

Follow the request through all affected layers:

1. Identify the endpoint or backend entry point.
2. Inspect the controller and request mapping.
3. Inspect request and response DTOs.
4. Inspect the service and business rules.
5. Inspect repositories and database queries.
6. Inspect entities and relationships.
7. Inspect validation and exception handling.
8. Inspect authentication and authorization when relevant.
9. Inspect existing tests and test cases.
10. Design the smallest complete change.

Skip layers that are genuinely unrelated to the task.

## Architecture Rules

### Controller

- Keep controllers thin.
- Handle HTTP concerns only.
- Delegate business logic to services.
- Accept and return DTOs rather than exposing entities.
- Use appropriate HTTP methods and status codes.
- Apply request validation with `@Valid` when required.

### DTO

- Use separate request and response DTOs.
- Validate data at the application boundary.
- Do not expose passwords, password hashes, tokens, verification codes, or internal identifiers unnecessarily.
- Keep field names and validation messages consistent with the API contract.

### Service

- Keep business rules in the service layer.
- Use constructor injection.
- Use `@Transactional` when an operation contains related database changes that must succeed or fail together.
- Use `@Transactional(readOnly = true)` for read-only operations when appropriate.
- Do not catch exceptions unless they can be handled meaningfully.
- Avoid duplicating business rules across services.

### Repository

- Keep repositories focused on persistence.
- Prefer derived queries for simple operations.
- Use explicit JPQL or native queries only when they improve correctness or clarity.
- Avoid loading unnecessary data.
- Consider locking, transaction boundaries, query count, and concurrency for sensitive operations.

### Entity

- Keep entities focused on persistence state and essential domain behavior.
- Define relationships, ownership, nullability, uniqueness, and fetch strategy deliberately.
- Avoid returning entities directly from controllers.
- Avoid Lombok-generated `toString`, `equals`, or `hashCode` methods that traverse JPA relationships.
- Consider existing data before introducing non-null columns or new constraints.

## Validation

Apply validation at the correct layer:

- DTO validation checks request format and basic constraints.
- Service validation enforces business rules.
- Database constraints protect data integrity.
- Security validation verifies identity and permissions.

Do not rely on frontend validation for backend safety.

Return validation errors using the existing API error structure and project error codes.

## Security

For authentication, authorization, password reset, and email verification:

- Never log passwords, password hashes, JWTs, refresh tokens, or verification codes.
- Hash passwords using the configured `PasswordEncoder`.
- Store refresh tokens securely according to existing project conventions.
- Validate token purpose, signature, expiration, and ownership.
- Return generic authentication errors when detailed errors could expose account information.
- Apply rate limiting or abuse protection where supported by the project.
- Revoke or rotate authentication credentials when required.
- Do not weaken security configuration merely to make a test pass.

## Exception Handling

- Use the existing `AppException` hierarchy and error-code conventions.
- Handle exceptions centrally through `GlobalExceptionHandler`.
- Do not expose stack traces, SQL errors, or internal implementation details to API clients.
- Preserve the distinction between validation, authentication, authorization, conflict, and server errors.
- Use HTTP status codes consistently with the existing API contract.

## Database Changes

Before changing persistence behavior:

- Inspect the current schema and entity mappings.
- Consider existing rows and migration safety.
- Preserve foreign-key and unique constraints.
- Avoid destructive schema changes unless explicitly requested.
- Do not depend on automatic schema generation for production migrations.
- Verify transaction and concurrency behavior for multi-step operations.

## Testing

Write or update test cases before implementing behavior changes.

Store test-case documentation under:

`focusflow/design/test-cases/`

When applicable, cover:

1. UI-to-backend-to-database behavior.
2. Backend API behavior.
3. Service business rules.
4. Repository and persistence behavior.
5. Validation and error responses.
6. Authentication and authorization.
7. Success, failure, boundary, and concurrency cases.

Use the narrowest suitable test:

- Unit test for isolated business logic.
- MVC test for controller and API behavior.
- Repository test for queries and mappings.
- Integration test for behavior spanning multiple layers.

Do not replace meaningful assertions with weak checks that only confirm the code runs.

## Implementation Workflow

```text
Receive task
    ↓
Read project instructions
    ↓
Find endpoint or entry point
    ↓
Inspect affected layers
    ↓
Read or write test cases
    ↓
Design the smallest complete change
    ↓
Implement
    ↓
Run targeted tests
    ↓
Run broader backend tests
    ↓
Review security and data integrity
    ↓
Report changes and verification