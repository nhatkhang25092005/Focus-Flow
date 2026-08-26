# FocusFlow Agent Instructions

This repository uses a project AI Operating System located at `.aios/`.

# MANDATORY FIRST STEP
Before answering any prompt or executing any tool, you MUST use the `view_file` tool to read `.aios/CORE_RULES.md`. If the task involves frontend work, you MUST also read `.aios/skills/frontend-development/SKILL.md` and `.aios/skills/backend-development/SKILL.md` . DO NOT make any code changes until you have read these files.



## Core instructions

Always read `.aios/CORE_RULES.md` before performing project work.

It's a good idea to read `./aios/PROMPT.md` to understand how to respond to me well properly

Use `.aios/context/PROJECT.md` when project context is required.

Do not load every AIOS document automatically.
Load only documents relevant to the current task.

## Task routing

For bug fixes:
- Read `.aios/workflows/bug-fix.md`
- Read `.aios/skills/bug-fix.md`

For new features:
- Read `.aios/workflows/feature.md`
- Read `.aios/skills/requirement-analysis.md`

For backend work:
- Read `.aios/skills/backend-development.md`

For frontend work:
- Read `.aios/skills/frontend-development/SKILL.md`

For authentication/security work:
- Read `.aios/context/SECURITY.md`

Before completing code changes:
- Read `.aios/skills/code-review.md`
- Run relevant tests when possible.

## AIOS protection

Do not modify files inside `.aios/` unless the user explicitly asks to update the AI Operating System.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Focus-Flow** (1508 symbols, 2328 relationships, 39 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/Focus-Flow/context` | Codebase overview, check index freshness |
| `gitnexus://repo/Focus-Flow/clusters` | All functional areas |
| `gitnexus://repo/Focus-Flow/processes` | All execution flows |
| `gitnexus://repo/Focus-Flow/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
