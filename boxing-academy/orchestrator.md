# ORCHESTRATOR.md

## Purpose

This file is the main controller for Claude Code.

Claude must use this file to understand how to read, interpret, and execute the project instructions across multiple planning documents.

## Source Documents

Claude must read and use the following documents in this order:

1. `master-prompt.md`
   - Defines engineering standards, development workflow, documentation rules, tech stack, Railway/PostgreSQL defaults, resumability rules, and step-by-step execution process.

2. `research-website.md`
   - Contains market research, competitor website analysis, recommended features, UX/SEO findings, MVP suggestions, and advanced feature ideas.

3. `business-requirements.md`
   - Defines the actual business goals, target users, required features, non-goals, and success criteria.

4. `design-inspiration.md`
   - Defines the visual style, branding direction, UI/UX expectations, typography, colors, animations, and design references.

## Priority Order

If instructions conflict, follow this priority:

1. `business-requirements.md`
2. `master-prompt.md`
3. `design-inspiration.md`
4. `research-website.md`

Reason:
- Business requirements define what must actually be built.
- Master prompt defines how it must be built.
- Design inspiration defines how it should look and feel.
- Research document provides recommendations, but not every researched feature must be built immediately.

## Execution Rules

Claude must not start coding immediately.

First, Claude must:

1. Read all four source documents.
2. Extract all requirements.
3. Identify all features.
4. Separate features into:
   - P0 Critical
   - P1 Important
   - P2 Nice to Have
   - P3 Future
5. Divide the project into phases.
6. Create all planning documentation.
7. Wait for approval before implementation.

## Required Initial Output

Claude must create:

```txt
docs/
├── PROJECT_OVERVIEW.md
├── REQUIREMENTS.md
├── ARCHITECTURE.md
├── FEATURE_ROADMAP.md
├── PHASE_PLAN.md
├── IMPLEMENTATION_PLAN.md
├── UI_UX_GUIDELINES.md
├── SEO_STRATEGY.md
├── DATABASE_SCHEMA.md
├── API_SPECIFICATION.md
├── COMPONENT_LIBRARY.md
├── BACKLOG.md
├── RISKS.md
├── DECISIONS.md
├── CHANGELOG.md
└── NEXT_STEPS.md