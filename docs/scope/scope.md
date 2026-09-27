# Scope: Bishop Portfolio

A completely new, simpler, sleek, polished personal portfolio for Mr Victor Osayame, who prefers to be called Bishop. The site should make visitors quickly understand who Bishop is, feel the quality of his work, view or download his resume, and reach out with confidence.

**Build approach:** Journey (finish one complete visitor path before opening the next).
**Workflow:** Alpha (`/check verify` after `/develop`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| A | Next starter scaffold | Foundation | existing |
| 1 | Portfolio direction and content model | Foundation | in-progress |
| 2 | Visual system and page rhythm | Foundation | in-progress |
| 3 | Primary visitor journey | Journey 1 | planned |
| 4 | Work showcase journey | Journey 2 | planned |
| 5 | Resume and contact journey | Journey 3 | planned |
| 6 | Polish, metadata, and launch checks | Launch | planned |

## Existing

### A. Next starter scaffold, existing
The project already has a small Next app scaffold with a starter home page, root layout, global CSS, lint script, TypeScript config, and Tailwind setup. code in `app/`, `package.json`, `tsconfig.json`

## Foundations

### 1. Portfolio direction and content model, in-progress
Decide the story the portfolio tells, the key sections, the featured projects, the resume asset, the main visitor actions, and where to reference the older macOS portfolio as a past work link.
**Done when:** the content plan names Bishop clearly, captures the preferred public identity, selects the work to feature, includes the old macOS portfolio only as a linked prior project, and defines the main calls to action.
- [x] Design it (spec): `/architect portfolio direction and content model`
- [x] Build it: `/develop portfolio direction and content model`
   - [x] Profile, actions, and recruiter first content shape (AC-1, AC-2, AC-3)
   - [x] Three featured projects plus old macOS prior work entry (AC-4, AC-5)
   - [x] Resume metadata and polished fallback behavior (AC-6, AC-7)
   - [x] Local content export for later visitor journey builds (AC-1 through AC-7)
- [ ] Verify it: `/check verify portfolio direction and content model`
Spec [0001](../specs/0001-portfolio-direction-content/index.md), code in `lib/portfolio-content.ts`

### 2. Visual system and page rhythm, in-progress
Create the restrained visual language for the new portfolio so it feels polished and memorable as its own fresh experience.
**Done when:** typography, color, spacing, layout rhythm, motion restraint, image treatment, and responsive behavior are decided before page build starts.
- [x] Design it (spec): `/architect visual system and page rhythm`
- [x] Build it: `/develop visual system and page rhythm`
   - [x] Warm cinematic design tokens and accessible type scale (AC-1, AC-2, AC-3, AC-8)
   - [x] Global page rhythm, background depth, spacing, and responsive layout rules (AC-2, AC-3, AC-5, AC-8)
   - [x] Hero, action, nav, project panel, chip, resume pending, and fallback component states (AC-6, AC-7, AC-8)
   - [x] Subtle motion and reduced motion behavior (AC-4, AC-8)
   - [x] Desktop and mobile validation with representative content (AC-1 through AC-8)
- [ ] Verify it: `/check verify visual system and page rhythm`
Spec [0002](../specs/0002-visual-system-page-rhythm.md), code in `app/globals.css`, `app/page.tsx`, `app/layout.tsx`, `design.md`

## Journey 1: First impression

### 3. Primary visitor journey, needs a decision
Build the first full visitor path, from landing on the site to understanding who Bishop is, what he does, and why he is credible.
**Done when:** a visitor can land on the page, read a clear hero, scan the profile, see strengths, and reach the next action on desktop and mobile.
- [ ] Design it (spec): `/architect primary visitor journey`

## Journey 2: Proof of work

### 4. Work showcase journey, needs a decision
Show selected projects or case studies in a focused way that proves taste, execution, and technical range.
**Done when:** a visitor can review featured work, understand Bishop's role and impact, and move naturally back to contact or resume.
- [ ] Design it (spec): `/architect work showcase journey`

## Journey 3: Contact and resume

### 5. Resume and contact journey, needs a decision
Make it easy for recruiters, clients, or collaborators to download or view the resume and contact Bishop.
**Done when:** the resume can be viewed or downloaded, contact options are clear, and the path works gracefully when assets or links change.
- [ ] Design it (spec): `/architect resume and contact journey`

## Launch

### 6. Polish, metadata, and launch checks, needs a decision
Finish the details that make the portfolio feel real in the wild, including page metadata, social previews, accessibility, performance, and final responsive checks.
**Done when:** title and description match Bishop, share previews are ready, the page is keyboard friendly, fast, readable, and clean across common screen sizes.
- [ ] Design it (spec): `/architect polish metadata and launch checks`

## Deferred

Out of scope for the first build pass, kept so the plan stays honest.

- **Blog or notes:** writing space for longer ideas once the portfolio core is live.
- **Admin editing:** content editing UI for Bishop, useful later if updates become frequent.
- **Advanced animation suite:** richer page transitions or complex scroll choreography after the simpler site is strong.

## Legend

**The decision box.** Every planned feature starts with one command. If the feature says `needs a decision`, `/architect` should capture the spec first. If the build is already obvious, you may skip straight to `/develop`.

**Feature lifecycle:** `planned` means scoped but not designed. `in-progress` means design or build has started. `done` means you decide the feature has reached the needed quality. `existing` means it was already present before this workflow.

**Next step:** the first unticked box in the first planned feature.
