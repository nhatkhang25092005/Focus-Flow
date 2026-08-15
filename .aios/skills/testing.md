# FocusFlow Testing Rules

## Purpose

Use this document for every task that plans, writes, executes, or reviews tests in FocusFlow.

Testing must begin with a written test case. Do not create or modify automated test code before the corresponding test case has been documented.

## Supported testing methods

FocusFlow supports the following testing methods:

| Method | Primary scope | Required implementation |
| --- | --- | --- |
| Manual testing | End-to-end behavior and UI behavior | Write the test case only. Do not implement automated test code. |
| Vitest | React and TypeScript frontend behavior | Write the test case first, then implement the automated frontend test. |
| JUnit | Spring Boot backend behavior | Write the test case first, then implement the automated backend test. |

Choose the smallest suitable method or combination of methods for the behavior being tested. Do not replace an end-to-end or manual scenario with an isolated unit test when the full integration path is relevant.

## Mandatory test-first workflow

For every testing task:

1. Identify the functional module and expected observable behavior.
2. Determine whether the test is end-to-end, UI-only, backend-only, or a combination of these scopes.
3. Create or update the relevant test-case document under `design/test-cases/`.
4. Write all required test cases before writing automated test code.
5. If the selected method is Manual, stop after completing the test cases unless the user explicitly asks to execute them.
6. If the selected method is Vitest or JUnit, implement the automated tests from the written test cases.
7. Run targeted tests first, followed by relevant module tests or builds.
8. Record the actual result, status, and evidence only after the test has actually been executed.

Never fabricate an actual result, passing status, screenshot, recording, log, or other evidence.

For a confirmed bug, add a regression test case. When practical, verify that its automated test fails before applying the fix and passes afterward.

## Test-case organization

All test-case documents must be stored under:

```text
focusflow/design/test-cases/
```

Organize them by functional module. Use clear, stable names rather than grouping unrelated features into one file.

Example:

```text
design/test-cases/
├── auth/
│   ├── login.md
│   ├── register.md
│   ├── verify-account.md
│   ├── forgot-password.md
│   └── reset-password.md
├── tasks/
│   ├── create-task.md
│   └── update-task.md
└── focus-session/
    └── timer.md
```

Each module document must be divided into these three major sections:

```markdown
# <Module> Test Cases

## End-to-End Test Cases

Tests from the UI through the backend and into the database when persistence is involved. If the behavior does not affect the database, test from the UI through the backend response.

## UI Test Cases

Tests for isolated frontend behavior, rendering, validation, interaction, navigation, loading, and error states.

## Backend Test Cases

Tests for isolated controller, service, security, repository, validation, transaction, and error-handling behavior.
```

If one of the three sections is not applicable to the module, keep the section and state why it is not applicable. Do not silently omit it.

## Test-case identifiers

Use this format:

```text
TC-<MODULE>-<NUMBER>
```

Examples:

```text
TC-REG-001
TC-LOGIN-003
TC-VERIFY-002
```

Identifiers must be unique and stable within the module. Do not reuse the identifier of a deleted or replaced test case for different behavior.

## Required test-case format

Every test case must follow this structure:

```markdown
### TC-<MODULE>-<NUMBER>: <Descriptive behavior>

**Type:** <Manual UI test | Manual end-to-end test | Vitest | JUnit>
**Priority:** <Critical | High | Medium | Low>

#### Preconditions

- <Required application state, data, services, language, authentication, or configuration>

#### Steps

1. <Action or test operation>
2. <Action or test operation>

#### Expected result

- <Observable result>
- <Database or backend state when applicable>

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add screenshot, recording, log, or test output here._
```

Allowed status values:

- `NOT TESTED`
- `PASSED`
- `FAILED`
- `BLOCKED`

## Example

```markdown
# Register Test Cases

## UI Test Cases

### TC-REG-001: Existing verified account

**Type:** Manual UI test
**Priority:** High

#### Preconditions

- Frontend and backend are running.
- A verified account exists with `existing@example.com`.
- Language is English.

#### Steps

1. Open the registration page.
2. Enter valid registration information.
3. Use `existing@example.com`.
4. Click Register.

#### Expected result

- An error toast appears.
- Toast message: `An account with this email already exists.`
- Form is not cleared.
- No success popup appears.

#### Actual result

_To be completed during testing._

#### Status

`NOT TESTED`

#### Evidence

_Add screenshot or recording here._
```

## Quality rules

- Test observable behavior rather than private implementation details.
- Keep each test case focused on one behavior or outcome.
- Include positive, negative, validation, error, and boundary scenarios when relevant.
- State required test data explicitly in the preconditions or steps.
- Include expected database changes for persistence-related end-to-end and backend cases.
- Verify both the response shown to the user and the resulting backend or database state when relevant.
- Do not claim coverage for a scope that was not tested.
- Do not mark a test as passed solely because the implementation compiles.
- Keep automated test names traceable to their corresponding test-case identifiers when practical.

## Completion criteria

A testing task is complete only when:

- The relevant test-case document exists in the correct functional module.
- All required test cases were written before automated test implementation.
- Manual-only requests contain no unnecessary automated test implementation.
- Requested Vitest or JUnit tests are implemented and executed.
- Actual results and statuses reflect real execution outcomes.
- Failures, blocked cases, and missing evidence are reported honestly.
