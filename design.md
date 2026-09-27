---
name: warm-cinematic-dark
source: derived from spec 0002
character: "A warm cinematic dark portfolio system for Bishop. It uses near black atmosphere, espresso depth, smoked bronze surfaces, copper amber emphasis, and elegant sans serif type to feel premium without becoming heavy."
tokens: "Real token values live in app/globals.css. Read that file for color, type, spacing, radius, shadow, and motion values."
contrast: "Primary text on canvas is high contrast. Muted text is reserved for secondary copy. Accent text on dark surfaces is preferred over large blocks of accent fill."
---

## Build mandate

Every page should ship as a complete, polished portfolio surface with brand, clear hierarchy, real product specific copy, responsive layout, accessible states, and a footer when the page warrants one. The site should feel cinematic and warm, not like the old macOS desktop portfolio.

## Character and direction

The system is dark, warm, and restrained. Near black is the canvas, espresso brown gives depth, smoked bronze shapes panels, and copper amber marks action and attention. The mood should feel premium and focused, with enough warmth to avoid a harsh black template.

## Composition patterns

Pages use spacious but focused sections. The hero should make Bishop the first strong signal, support it with a concise role line, and keep View work as the main action. Project sections use cinematic case study panels that show role, outcome, stack, and links without layout shift. Content should stay inside a centered max width and leave a hint of the next section in the first viewport.

## Component and usage rules

Use copper amber for primary actions, focus, active states, and small highlights. Do not let copper dominate the page. Use brown as depth, border warmth, and panel tint, not as large flat surfaces. Buttons, nav links, project panels, chips, and pending states need default, hover, active, disabled or pending, and focus visible states.

## Responsive and accessibility direction

Build mobile first, then widen into the desktop rhythm. Text must meet WCAG AA contrast on its surface. Keyboard focus uses a visible outline with offset, not color alone. Motion should be subtle, and reduced motion should remove reveal transforms and nonessential transitions.
