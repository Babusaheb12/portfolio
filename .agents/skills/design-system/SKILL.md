---
name: design-system-graphic-design-portfolio-2025-behance
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Graphic Design Portfolio 2025 :: Behance

## Mission
Deliver implementation-ready design-system guidance for Graphic Design Portfolio 2025 :: Behance that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: Graphic Design Portfolio 2025 :: Behance
- URL: https://www.behance.net/gallery/224632473/Graphic-Design-Portfolio-2025?tracking_source=search_projects|spa+app+design+ui&l=8
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=acumin-pro`, `font.family.stack=acumin-pro, Acumin Pro, Helvetica Neue, Helvetica, Arial, sans-serif`, `font.size.base=12px`, `font.weight.base=400`, `font.lineHeight.base=15.6px`
- Typography scale: `font.size.xs=9px`, `font.size.sm=11px`, `font.size.md=12px`, `font.size.lg=13px`, `font.size.xl=13.01px`, `font.size.2xl=14px`, `font.size.3xl=15px`, `font.size.4xl=16px`
- Color palette: `color.text.primary=#191919`, `color.text.secondary=#0057ff`, `color.text.tertiary=#ffffff`, `color.text.inverse=#707070`, `color.surface.base=#000000`, `color.surface.muted=#e8e8e8`, `color.surface.strong=#959595`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=2.75px`, `space.4=3px`, `space.5=4px`, `space.6=5px`, `space.7=7px`, `space.8=7.5px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=50px`, `radius.md=100px` | `shadow.1=rgba(25, 25, 25, 0.16) 0px 3px 6px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=300ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
