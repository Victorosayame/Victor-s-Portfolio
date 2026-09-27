# 0002. Visual system and page rhythm

**Date**: 2026-09-17
**Status**: In Progress

## Summary

This spec defines the first visual system for Bishop's new portfolio. The direction is warm cinematic dark, using near black, espresso brown, smoked bronze, warm off white, and copper amber accents. The page should feel premium and captivating without returning to the older macOS animated concept.

## Context

Bishop's portfolio needs a fresh look that is simpler and more polished than the older animated macOS style. The project already has a small Next app with starter UI, so there is no existing design system worth preserving. The content spec already says the portfolio is recruiter first, with Bishop as the memorable public name and work as the primary action.

The visual system needs to settle theme, background, typography, motion, spacing, and core component tone before page implementation. If this stays open, `/develop` will invent colors and layout rhythm while coding, which is how personal portfolios drift into generic dark templates.

The main risk is overcorrecting into either a harsh black page or a muddy brown page. The intended direction is cinematic and warm, not flat black, not brown dominated, and not a heavy animation showcase.

## Requirements

**User stories**:
* As a recruiter, I want the portfolio to feel premium and readable so that I can assess Bishop quickly.
* As Bishop, I want the site to feel cinematic and memorable so that it stands apart from a plain developer portfolio.
* As a visitor, I want motion and visual depth to support the content without slowing me down or distracting me.

**Acceptance criteria**:
* **AC-1**: The visual system uses named color tokens for near black, espresso brown, smoked bronze, warm off white, copper amber, borders, focus, and muted text.
* **AC-2**: The background avoids pure flat black and avoids a one note brown theme by using near black as the base, brown as warmth and depth, and copper amber only for emphasis.
* **AC-3**: Typography uses an elegant sans serif direction with a defined type scale, readable body text, and strong name first hero treatment.
* **AC-4**: Motion is subtle and premium, with defined duration, distance, easing, hover, and reduced motion rules, not rich scroll choreography.
* **AC-5**: Page rhythm is spacious but focused, with defined content width, section padding, mobile spacing, hero composition, and project grid behavior.
* **AC-6**: Project cards use cinematic case study panels with defined default, hover, focus, missing asset, and link states.
* **AC-7**: The hero is a name first cinematic intro that makes Bishop the first strong signal and keeps View work as the primary action.
* **AC-8**: The visual system remains accessible, with readable contrast, visible focus states, and reduced motion behavior.

## Options considered

### Option 1: Warm cinematic dark

A near black base softened by espresso brown and smoked bronze, with copper amber accents and warm off white text.

**Pros**:
* Matches Bishop's preference for dark cinematic without becoming harsh.
* Feels premium and memorable for a personal portfolio.
* Gives project panels and calls to action a strong atmosphere.

**Cons**:
* Requires restraint so brown does not dominate the whole page.
* Needs careful contrast checks because warm dark palettes can become low contrast.

### Option 2: Editorial minimal light

A mostly light portfolio with clean spacing, sharp type, and subtle neutral contrast.

**Pros**:
* Very readable and recruiter friendly.
* Easier to make accessible and fast.

**Cons**:
* Does not match the chosen dark cinematic direction.
* Can feel less distinctive for Bishop's desired brand.

### Option 3: High contrast pure dark

A strong black and white theme with bright accent color and crisp panels.

**Pros**:
* Simple to implement and visually sharp.
* High contrast can be easy to scan.

**Cons**:
* Pure black can feel harsh and generic.
* It loses the warm brown character Bishop asked for.

### Option 4: Rich animated showcase

A visually intense portfolio with heavy scroll animation, layered movement, and highly dynamic backgrounds.

**Pros**:
* Can be impressive when executed well.
* Shows animation ability immediately.

**Cons**:
* Too close to the older animated portfolio direction.
* Adds performance and accessibility risk before the core portfolio is strong.

## Decision

**Chosen option**: Option 1: Warm cinematic dark

Use a warm cinematic dark visual system. The base should be near black, softened with espresso brown and smoked bronze depth, with copper amber for interactive emphasis. Typography should be elegant sans serif, motion should be subtle, and layout should be spacious but focused.

## Rationale

The selected direction matches Bishop's explicit preference for a dark cinematic site with a little brown, while keeping the recruiter first goal intact. A dark premium surface can captivate visitors, but the warm undertone keeps it from becoming a hard black template. Copper amber is the best accent because it naturally bridges black and brown while still giving buttons and highlights enough presence.

The older portfolio already explored heavier animation. This new site should prove taste through restraint. Subtle motion, strong rhythm, and refined cards are more useful here than another animation heavy concept.

## Feature design

**Data model sketch**:

| Entity | Required fields | Optional fields | Notes |
|---|---|---|---|
| `DesignTokens` | `colors`, `typography`, `spacing`, `radii`, `shadows`, `motion` | `noiseTexture`, `gradientStops` | Can live as CSS variables or a typed design token object. |
| `ColorToken` | `name`, `value`, `usage` | `state` | `usage` examples are background, surface, text, border, accent, focus. |
| `MotionToken` | `name`, `duration`, `easing`, `usage` | `reducedMotionFallback` | Motion must define a reduced motion fallback. |
| `ComponentStyleRule` | `component`, `surface`, `border`, `interaction`, `accessibility` | `notes` | Covers hero, project panel, button, chip, nav, section divider. |

Initial color tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0b0908` | Main page background. Near black with warmth, not pure black. |
| `--color-bg-depth` | `#17100d` | Subtle radial or linear background depth. |
| `--color-surface` | `#15110f` | Primary card and panel surface. |
| `--color-surface-muted` | `#211814` | Hover surface, inset surface, and muted panel contrast. |
| `--color-border` | `#3a2a22` | Warm low contrast borders. |
| `--color-border-strong` | `#6f4b35` | Strong panel border, active states, and selected emphasis. |
| `--color-text` | `#f6efe7` | Primary text. |
| `--color-text-muted` | `#bdaea2` | Secondary text. |
| `--color-text-soft` | `#8f7d70` | Metadata and quiet labels. |
| `--color-accent` | `#d89545` | Copper amber primary accent. |
| `--color-accent-hover` | `#efad5d` | Hover accent. |
| `--color-focus` | `#f5c16c` | Focus outline and keyboard navigation. |

Usage rules:
* The page background starts with `--color-bg` and may layer `--color-bg-depth` as a subtle gradient.
* Brown tokens should shape depth, borders, and surfaces. They should not become large flat brown blocks.
* Copper amber should be used for primary actions, active states, important inline highlights, and focus support. It should not dominate the page.
* Text on dark surfaces must use `--color-text` or `--color-text-muted`, never low contrast brown.

Typography rules:
* Use the existing elegant sans serif stack first. In this app that means the configured Geist sans font unless a later spec changes it.
* Hero name: clamp from `3.5rem` to `6.5rem`, line height `0.92` to `1`, weight `700` or `800`.
* Section heading: clamp from `2rem` to `3.25rem`, line height `1.05`, weight `650` or `700`.
* Body text: `1rem` to `1.125rem`, line height `1.7`.
* Metadata and chips: `0.75rem` to `0.875rem`, line height `1.4`, uppercase only when it stays readable.
* Letter spacing stays `0` unless an all caps metadata label needs up to `0.08em`.

Spacing and layout rules:
* Main content width should cap around `1120px`.
* Page side padding should be `20px` on mobile, `32px` on tablet, and `48px` to `64px` on desktop.
* Section vertical padding should be `72px` to `96px` on mobile and `112px` to `144px` on desktop.
* The hero should fill most of the first viewport but leave a clear hint of the next section.
* Project panels use one column on mobile, two columns on medium screens when content allows, and a focused two or three column rhythm on wide screens.
* Repeated cards should have stable min heights or content rules so hover states do not shift layout.

Motion rules:
* Standard transition duration is `160ms` to `220ms`.
* Reveal motion may fade from opacity `0` to `1` and translate up by at most `12px`.
* Hover movement should stay at `2px` to `4px` and may combine with border or shadow changes.
* Use easing close to `cubic-bezier(0.22, 1, 0.36, 1)` for reveals and `ease-out` for simple hover states.
* Do not use parallax heavy scroll choreography or motion that is required to understand content.
* Under `prefers-reduced-motion: reduce`, disable reveal transforms and nonessential transitions. Content should appear immediately.

Component state rules:
* Primary button: copper amber fill or warm amber text treatment, clear hover state, visible `:focus-visible` outline, disabled or pending state that does not look clickable.
* Secondary link: warm text or bordered treatment, underline or border change on hover, visible keyboard focus.
* Project panel: dark warm surface, warm border, subtle glow on hover, stable layout, missing image fallback using a quiet gradient or typographic treatment.
* Project links: omit missing live, repository, or case study links rather than rendering disabled dead actions.
* Resume pending action: use the pending behavior from spec 0001, with clear copy and contact still available.
* Chips: muted surface, warm border, readable text, no tiny low contrast labels.
* Nav links: default, hover, active, and focus states must be visually distinct.

Accessibility rules:
* Normal text and meaningful UI text must meet WCAG AA contrast against its surface.
* Keyboard focus must use `:focus-visible` with an outline at least `2px`, outline offset at least `3px`, and a visible shape change or outline, not color alone.
* No information should be revealed only by hover or motion.
* Interactive targets should be at least `44px` tall or have equivalent comfortable hit area.

Unique constraints:
* The palette must not rely on pure black as the only background.
* Copper amber is the primary accent. It should not become the dominant page color.
* Brown appears as undertone, gradient depth, border warmth, or panel tint, not as the main text or entire page surface.

**API surface**:

No server endpoint is required. The interface is the CSS and component styling contract used by later builds.

| Interface | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `globals.css` design variables | CSS | token names and values | reusable palette, typography, spacing, motion variables | public | build or visual mismatch when tokens are missing |
| Component class contract | CSS or component props | variant names | consistent hero, button, chip, card, panel, section styles | public | inconsistent UI when variants are bypassed |

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Render page background | warm dark atmosphere | `--color-bg` and `--color-bg-depth` |
| Render text hierarchy | readable headings and body text | `DesignTokens.typography` and text color tokens |
| Render primary actions | copper amber button and focus treatment | `--color-accent`, `--color-accent-hover`, `--color-focus`, and button state rules |
| Render project panels | cinematic case study panels | `ComponentStyleRule` for project panel |
| Render stack chips | warm outlined or muted chip style | `ComponentStyleRule` for chip |
| Render section rhythm | spacious but focused layout | spacing tokens and section style rules |
| Render motion | subtle reveals and hover states | duration, easing, distance, and reduced motion rules |
| Render reduced motion | minimal or no movement | `prefers-reduced-motion` rules |

**Key invariants**:

* The design must not reuse the old macOS desktop metaphor.
* The background should feel warm and cinematic, not pure black and not brown dominated.
* Text contrast must stay readable on every surface.
* Focus states must use outline and offset, not color alone.
* Motion must be decorative and supportive, never required to understand content.
* Project panels must communicate role, outcome, stack, and links clearly.
* Exact token values may be refined during implementation only if the revised values preserve contrast and the warm cinematic direction.

**Security model**:

All visual system decisions are public. No private data, user input, credentials, or authenticated surfaces are involved.

**Critical test scenarios**:
* Happy path: a page using the visual system shows warm cinematic background, Bishop first hero, copper amber primary action, defined spacing rhythm, and cinematic project panels, verifies **AC-1**, **AC-3**, **AC-5**, **AC-6**, and **AC-7**.
* Accessibility case: text, buttons, links, focus states, target sizes, and reduced motion remain usable, verifies **AC-8**.
* Design rule case: the page does not look like the old macOS portfolio and does not become pure black or brown dominated, verifies **AC-2** and **AC-4**.
* Layout case: desktop and mobile sections feel spacious but still scannable, verifies **AC-5**.

## Build plan

- [x] Define the CSS design tokens for the initial palette, type scale, spacing, radii, shadows, and motion limits, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, and **AC-8**.
- [x] Add global page rhythm rules for background depth, max width, section spacing, mobile padding, hero composition, and readable typography, satisfies **AC-2**, **AC-3**, **AC-5**, and **AC-8**.
- [x] Define component style rules and states for hero, primary button, secondary link, nav link, project panel, stack chip, resume pending action, missing asset fallback, and section divider, satisfies **AC-6**, **AC-7**, and **AC-8**.
- [x] Add subtle motion rules with duration, distance, easing, hover limits, and reduced motion fallbacks for reveal and hover behavior, satisfies **AC-4** and **AC-8**.
- [x] Validate the visual system on desktop and mobile using representative content from spec 0001, satisfies **AC-1** through **AC-8**.

## Consequences

**Positive**:
* The portfolio gets a distinct mood before page implementation starts.
* The design stays aligned with Bishop's dark cinematic preference.
* Later features can reuse one consistent palette, rhythm, and component language.

**Negative / tradeoffs**:
* Warm dark palettes need active contrast checking and occasional token tuning.
* The design will look weaker if project content and links stay as placeholders for too long.
* Heavy animation is intentionally excluded, so the site relies on polish rather than spectacle.

**Neutral**:
* The exact visual asset choices can still evolve during the primary visitor journey build as long as they honor these tokens and rules.

## Follow-up

* [ ] During implementation, choose exact CSS variable names and final hex values for the palette.
* [ ] During implementation, verify contrast on the final page surfaces.
* [ ] During implementation, confirm reduced motion behavior in the browser.
